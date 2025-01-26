import React, { useContext, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { AuthContext } from "../../Provider/AuthProvider";

const SellerHome = () => {
  const { user } = useContext(AuthContext); // Get user details
  const [cartCount, setCartCount] = useState(0);
  const [paymentCount, setPaymentCount] = useState(0);

  useEffect(() => {
    // Initialize AOS
    AOS.init();

    if (user?.email) { // Check if user is available and has an email
      // Fetch carts
      fetch("https://pharma-care-server-delta.vercel.app/carts")
        .then((res) => res.json())
        .then((data) => {
          const filteredCarts = data.filter(
            (item) => item.sellerEmail === user.email
          );
          setCartCount(filteredCarts.length);
        })
        .catch((error) => console.error("Error fetching carts:", error));

      // Fetch payments
      fetch("https://pharma-care-server-delta.vercel.app/payments")
        .then((res) => res.json())
        .then((data) => {
          const filteredPayments = data.filter(
            (item) =>
              Array.isArray(item.SellerEmail) && item.SellerEmail.includes(user.email)
          );
          console.log("Filtered Payments:", filteredPayments);
          setPaymentCount(filteredPayments.length);
        })
        .catch((error) => console.error("Error fetching payments:", error));
    }
  }, [user?.email]); // Dependency array ensures useEffect runs again if user.email changes

  if (!user) {
    return <div>Loading...</div>; // Show loading state if user is not yet available
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Welcome to Your Dashboard
      </h1>
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
    </div>
  );
};

export default SellerHome;
