import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AuthContext } from "../../Provider/AuthProvider";

const SellerReport = () => {
  const [cartData, setCartData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeStatus, setActiveStatus] = useState("Pending"); // Add activeStatus state
  const { user, isLoading } = useContext(AuthContext); // Get the logged-in user's email and loading state

  // Ensure the user is loaded before fetching data
  useEffect(() => {
    if (isLoading || !user) {
      return; // Don't fetch data if the user is not available
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const [cartsRes, paymentsRes] = await Promise.all([
          fetch("http://localhost:5000/carts").then((res) => res.json()),
          fetch("http://localhost:5000/payments").then((res) => res.json()),
        ]);

        // Filter cart data where sellerEmail matches user.email
        const userCarts = cartsRes.filter((cart) => cart.sellerEmail === user.email);

        // Filter payment data where SellerEmail matches user.email
        const userPayments = paymentsRes.filter((payment) =>
          payment.SellerEmail.includes(user.email)
        );

        setCartData(userCarts); // Save cart data
        setPaymentData(userPayments); // Save payment data

        setFilteredData(userCarts); // Default to show pending (cart) data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, isLoading]); // Re-run effect when user changes or isLoading state changes

  // Handle button clicks to filter data
  const handleFilter = (status) => {
    setActiveStatus(status); // Set active button status
    if (status === "Pending") {
      setFilteredData(cartData); // Show cart data
    } else if (status === "Paid") {
      setFilteredData(paymentData); // Show payment data
    }
  };

  const columns = [
    { name: "Item Name", selector: (row) => row.itemName || row.ItemName || "N/A" },
    { name: "Seller Email", selector: (row) => row.sellerEmail || row.SellerEmail || "N/A" },
    { name: "Buyer Email", selector: (row) => row.email || "N/A" },
    { name: "Total Price", selector: (row) => row.perUnitPrice || "N/A" },
    { name: "Transaction ID", selector: (row) => row.transactionId || "N/A" }, // Available only for payments
    { name: "Date", selector: (row) => row.date || "N/A" }, // Available only for payments
    { name: "Status", selector: (row) => row.status || "N/A" },
  ];

  // If user is not yet loaded, show a loading message
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Sales Report</h1>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-4">
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

export default SellerReport;
