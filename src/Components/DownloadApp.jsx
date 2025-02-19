import React, { useState } from "react";
import Swal from "sweetalert2";

const DownloadAppSection = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSendClick = () => {
    if (!phoneNumber) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please enter your mobile number!",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Link Sent!",
      text: `A download link has been sent to +88 ${phoneNumber}`,
    });

    // Clear the input field after sending
    setPhoneNumber("");
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-10 rounded-lg shadow-lg mx-auto">
      {/* Left Side - Mobile App Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="https://cdn.osudpotro.com/assets/mobile-app.webp"
          alt="PharmaCare App"
          className="w-[280px] rounded-lg"
        />
      </div>

      {/* Right Side - Text & Download Buttons */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Order Medicines From <br className="hidden md:block" /> Your Phone
        </h2>
        <p className="text-gray-600">
          Enter your mobile number to receive the app download link
        </p>

        {/* Phone Input */}
        <div className="flex items-center justify-center md:justify-start border-b-2 border-gray-400 py-2">
          <span className="text-lg text-gray-700 pr-2">+88</span>
          <input
            type="text"
            className="w-full md:w-[200px] bg-transparent outline-none text-gray-700"
            placeholder="Enter your number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {/* Send Button */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 rounded-lg transition"
          onClick={handleSendClick}
        >
          Send
        </button>

        {/* Download Buttons */}
        <div className="flex justify-center md:justify-start space-x-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
            className="h-12 cursor-pointer"
          />
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="App Store"
            className="h-12 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default DownloadAppSection;
