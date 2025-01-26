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
        // Fetch cart and payment data
        const [cartsRes, paymentsRes] = await Promise.all([
          fetch("https://pharma-care-server-delta.vercel.app/carts").then((res) => res.json()),
          fetch("https://pharma-care-server-delta.vercel.app/payments").then((res) => res.json()),
        ]);

        // Add status to carts and payments
        const updatedCarts = cartsRes.map((item) => ({ ...item, status: "Pending" }));
        const updatedPayments = paymentsRes.map((item) => ({ ...item, status: "Paid" }));

        // Set cart and payment data
        setCartData(updatedCarts);
        setPaymentData(updatedPayments);

        // Combine the cart and payment data
        const combinedData = updatedPayments.map((payment) => {
          // Match cart data with payment cartIds
          const cartItems = payment.cartIds.map((cartId) => {
            return updatedCarts.find((cart) => cart._id === cartId);
          });

          // Combine cart items with payment data
          return cartItems.map((item, index) => {
            const totalPrice = item ? item.perUnitPrice : 0; // Calculate TotalPrice

            return {
              ItemName: payment.ItemName[index],
              SellerEmail: payment.SellerEmail[index],
              BuyerEmail: payment.email,
              TotalPrice: totalPrice, // Add TotalPrice to the row
              TransactionId: payment.transactionId,
              Date: payment.date,
              Status: payment.status, // Payment status should be "Paid"
              // Additional cart info
              Category: item ? item.category : "N/A",
              Company: item ? item.company : "N/A",
              ItemMassUnit: item ? item.itemMassUnit : "N/A",
              Image: item ? item.image : "N/A",
            };
          });
        }).flat(); // Flatten the array if multiple items exist per payment

        setFilteredData(combinedData); // Update filtered data
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

    // Filter combined data by date
    const filtered = filteredData.filter((item) => {
      const date = new Date(item.Date);
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
      item.BuyerEmail || "N/A",
      item.TotalPrice || "N/A", // TotalPrice should be in the table
      item.TransactionId || "N/A",
      item.Date || "N/A",
      item.Status || "N/A", // Status should show "Paid" for payments
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
    { name: "Buyer Email", selector: (row) => row.BuyerEmail || "N/A", sortable: true },
    // { name: "Total Price", selector: (row) => row.TotalPrice || "N/A", sortable: true },
    { name: "Transaction ID", selector: (row) => row.TransactionId || "N/A", sortable: true },
    { name: "Date", selector: (row) => row.Date || "N/A", sortable: true },
    { name: "Status", selector: (row) => row.Status || "N/A", sortable: true },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Sales Report</h1>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
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
            className="px-3 py-2 bg-blue-500 text-white rounded w-full md:w-auto"
            onClick={handleDateFilter}
          >
            Filter by Date
          </button>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          <button
            className="px-3 py-2 bg-purple-500 text-white rounded w-full md:w-auto"
            onClick={exportToPDF}
          >
            Export to PDF
          </button>
          <CSVLink
            data={filteredData}
            filename="Sales_Report.csv"
            className="px-3 py-2 bg-green-500 text-white rounded w-full md:w-auto text-center"
          >
            Export to CSV
          </CSVLink>
          <button
            className="px-3 py-2 bg-yellow-500 text-white rounded w-full md:w-auto"
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

export default SalesReport;
