import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component"; // For table display
import { CSVLink } from "react-csv"; // For CSV download
import * as XLSX from "xlsx"; // For Excel download
import { jsPDF } from "jspdf"; // For PDF download
import "jspdf-autotable"; // For structured PDF tables

const SalesReport = () => {
  const [cartData, setCartData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [cartsRes, paymentsRes] = await Promise.all([
          fetch("http://localhost:5000/carts").then((res) => res.json()),
          fetch("http://localhost:5000/payments").then((res) => res.json()),
        ]);

        // Add status to carts and payments
        const filteredCarts = cartsRes.map((item) => ({ ...item, status: "Pending" }));
        const filteredPayments = paymentsRes.map((item) => ({ ...item, status: "Paid" }));

        setCartData(filteredCarts);
        setPaymentData(filteredPayments);

        // Combine cart and payment data for display
        setFilteredData([...filteredCarts, ...filteredPayments]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDateFilter = () => {
    if (!dateRange.start || !dateRange.end) return;

    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);

    const filtered = [...cartData, ...paymentData].filter((item) => {
      const date = new Date(item.date);
      return date >= startDate && date <= endDate;
    });
    setFilteredData(filtered);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Sales Report", 14, 10);

    const tableData = filteredData.map((item) => [
      item.ItemName || "N/A",
      item.SellerEmail || "N/A",
      item.email || "N/A",
      item.totalPrice || item.price || "N/A",
      item.transactionId || "N/A",
      item.date || "N/A",
      item.status || "N/A",
    ]);

    doc.autoTable({
      head: [["Item Name", "Seller Email", "Buyer Email", "Total Price", "Transaction ID", "Date", "Status"]],
      body: tableData,
    });

    doc.save("Sales_Report.pdf");
  };

  const exportToXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SalesReport");
    XLSX.writeFile(workbook, "Sales_Report.xlsx");
  };

  const columns = [
    { name: "Item Name", selector: (row) => row.ItemName || "N/A", sortable: true },
    { name: "Seller Email", selector: (row) => row.SellerEmail || "N/A", sortable: true },
    { name: "Buyer Email", selector: (row) => row.email || "N/A", sortable: true },
    { name: "Total Price", selector: (row) => row.totalPrice || row.price || "N/A", sortable: true },
    { name: "Transaction ID", selector: (row) => row.transactionId || "N/A", sortable: true },
    { name: "Date", selector: (row) => row.date || "N/A", sortable: true },
    { name: "Status", selector: (row) => row.status || "N/A", sortable: true },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Sales Report</h1>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <input
            type="date"
            className="border p-2 rounded w-full md:w-auto"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          />
          <input
            type="date"
            className="border p-2 rounded w-full md:w-auto"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded w-full md:w-auto"
            onClick={handleDateFilter}
          >
            Filter by Date
          </button>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-col md:flex-row items-center gap-2">
          <button
            className="px-4 py-2 bg-purple-500 text-white rounded w-full md:w-auto"
            onClick={exportToPDF}
          >
            Export to PDF
          </button>
          <CSVLink
            data={filteredData}
            filename="Sales_Report.csv"
            className="px-4 py-2 bg-green-500 text-white rounded w-full md:w-auto text-center"
          >
            Export to CSV
          </CSVLink>
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded w-full md:w-auto"
            onClick={exportToXLSX}
          >
            Export to Excel
          </button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        title="Sales Report"
        columns={columns}
        data={filteredData}
        progressPending={loading}
        pagination
        responsive
      />
    </div>
  );
};

export default SalesReport;
