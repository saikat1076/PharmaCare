import React, { useContext, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { AuthContext } from "../../Provider/AuthProvider";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const SellerHome = () => {
  const { user } = useContext(AuthContext);
  const [cartCount, setCartCount] = useState(0);
  const [paymentCount, setPaymentCount] = useState(0);

  useEffect(() => {
    AOS.init();

    if (user?.email) {
      // Fetch carts
      fetch("https://pharma-care-server-delta.vercel.app/carts")
        .then((res) => res.json())
        .then((data) => {
          const filteredCarts = data.filter((item) => item.sellerEmail === user.email);
          setCartCount(filteredCarts.length);
        })
        .catch((error) => console.error("Error fetching carts:", error));

      // Fetch payments
      fetch("https://pharma-care-server-delta.vercel.app/payments")
        .then((res) => res.json())
        .then((data) => {
          const filteredPayments = data.filter(
            (item) => Array.isArray(item.SellerEmail) && item.SellerEmail.includes(user.email)
          );
          setPaymentCount(filteredPayments.length);
        })
        .catch((error) => console.error("Error fetching payments:", error));
    }
  }, [user?.email]);

  if (!user) {
    return <div>Loading...</div>;
  }

  // Chart Data
  const chartData = [
    { name: "Carts", value: cartCount },
    { name: "Payments", value: paymentCount },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Welcome to Your Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-4">
        {/* Total Carts Card */}
        <div
          className="card bg-blue-500 text-white shadow-lg hover:shadow-2xl transform transition-all duration-300"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl">Total Carts Pending</h2>
            <p className="text-5xl font-bold">{cartCount}</p>
            <p>Number of carts linked to your account.</p>
          </div>
        </div>

        {/* Total Payments Card */}
        <div
          className="card bg-green-500 text-white shadow-lg hover:shadow-2xl transform transition-all duration-300"
          data-aos="fade-left"
          data-aos-duration="1000"
        >
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl">Total Payments</h2>
            <p className="text-5xl font-bold">{paymentCount}</p>
            <p>Number of payments linked to your account.</p>
          </div>
        </div>
      </div>

      {/* Graph Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 w-full max-w-4xl px-4">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-center mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#333" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-center mb-4">Data Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SellerHome;
