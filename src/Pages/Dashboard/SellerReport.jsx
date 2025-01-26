import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AuthContext } from "../../Provider/AuthProvider";
import { saveAs } from 'file-saver'; // For Excel file download
import jsPDF from 'jspdf'; // For PDF download
import 'jspdf-autotable'; // Required for auto-table plugin in jsPDF
import * as XLSX from 'xlsx'; // For Excel download

const SellerReport = () => {
  const [cartData, setCartData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeStatus, setActiveStatus] = useState("Pending");
  const [startDate, setStartDate] = useState(""); // Date range start
  const [endDate, setEndDate] = useState(""); // Date range end
  const { user, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (isLoading || !user) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [cartsRes, paymentsRes] = await Promise.all([
          fetch("http://localhost:5000/carts").then((res) => res.json()),
          fetch("http://localhost:5000/payments").then((res) => res.json()),
        ]);
        const userCarts = cartsRes.filter((cart) => cart.sellerEmail === user.email);
        const userPayments = paymentsRes.filter((payment) => payment.SellerEmail.includes(user.email));

        setCartData(userCarts);
        setPaymentData(userPayments);
        setFilteredData(userCarts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, isLoading]);

  const handleFilter = (status) => {
    setActiveStatus(status);
    if (status === "Pending") {
      setFilteredData(cartData);
    } else if (status === "Paid") {
      setFilteredData(paymentData);
    }
  };

  const handleDateFilter = () => {
    let filtered = filteredData;
    if (startDate) {
      filtered = filtered.filter((data) => new Date(data.date) >= new Date(startDate));
    }
    if (endDate) {
      filtered = filtered.filter((data) => new Date(data.date) <= new Date(endDate));
    }
    setFilteredData(filtered);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sales Report");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelFile = new Blob([excelBuffer], { bookType: "xlsx", type: "application/octet-stream" });
    saveAs(excelFile, "sales_report.xlsx");
  };

  const exportToPdf = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: "#data-table" });
    doc.save("sales_report.pdf");
  };

  const columns = [
    { name: "Item Name", selector: (row) => row.itemName || row.ItemName || "N/A" },
    { name: "Seller Email", selector: (row) => row.sellerEmail || row.SellerEmail || "N/A" },
    { name: "Buyer Email", selector: (row) => row.email || "N/A" },
    { name: "Total Price", selector: (row) => row.perUnitPrice || "N/A" },
    { name: "Transaction ID", selector: (row) => row.transactionId || "N/A" },
    { name: "Date", selector: (row) => row.date || "N/A" },
    { name: "Status", selector: (row) => row.status || "N/A" },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Sales Report</h1>

      {/* Date Range Filter */}
      <div className="flex justify-center gap-4 mb-4">
        <input
          type="date"
          className="px-4 py-2 rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="px-4 py-2 rounded"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleDateFilter}
        >
          Filter by Date
        </button>
      </div>

      {/* Status Toggle Tile */}
      <div className="flex space-x-4 gap-4 mb-4">
      <div className="flex justify-center gap-4 pr-16">
        <button
          className={`px-4 py-2 rounded ${activeStatus === "Pending" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => handleFilter("Pending")}
        >
          Pending
        </button>
        <button
          className={`px-4 py-2 rounded ${activeStatus === "Paid" ? "bg-green-500 text-white" : "bg-gray-300"}`}
          onClick={() => handleFilter("Paid")}
        >
          Paid
        </button>
      </div>
        <h2 className="text-xl font-bold text-blue-600">Toggle button to see pending and paid information</h2>
         {/* Filter Buttons */}
      
      </div>

     

      {/* Export Buttons */}
      <div className="flex justify-center gap-4 mb-4">
        <button onClick={exportToExcel} className="px-4 py-2 bg-yellow-500 text-white rounded">
          Export to Excel
        </button>
        <button onClick={exportToPdf} className="px-4 py-2 bg-red-500 text-white rounded">
          Export to PDF
        </button>
      </div>

      {/* Data Table */}
      <DataTable
        title="Sales Report"
        columns={columns}
        data={filteredData}
        progressPending={loading}
        pagination
      />
    </div>
  );
};

export default SellerReport;
