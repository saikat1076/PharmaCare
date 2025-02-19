import React from "react";
import { FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";
import { BsWhatsapp, BsMessenger } from "react-icons/bs";

const OnlineDoctors = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-gray-100 py-10 px-5 text-center">
      {/* Illustration */}
      <div className="w-full flex flex-col items-center">
        <img
          src="https://cdn.osudpotro.com/project_assets/contact_us.png?w=640"
          alt="Customer Support"
          className="w-full max-w-md mb-6"
        />
      </div>

      {/* Contact Info */}
      <div className="flex flex-col items-center text-gray-800">
        <h2 className="text-3xl font-bold mb-4">Contact Our Support Team</h2>
        <p className="text-lg text-gray-600 mb-4">
          Need assistance? Reach out to us through any of the following options.
        </p>

        {/* Support Timing */}
        <div className="flex items-center gap-2 text-lg font-medium mb-4">
          <FaClock className="text-blue-500" /> Support Hours: 9 AM - 10 PM (Daily)
        </div>

        {/* Contact Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {/* Call Support */}
          <a
            href="tel:+8809610001122"
            className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all"
          >
            <FaPhoneAlt className="text-xl" /> Call Support
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/+8809610001122"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all"
          >
            <BsWhatsapp className="text-xl" /> WhatsApp
          </a>

          {/* Messenger */}
          <a
            href="https://m.me/osudpotro"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-800 transition-all"
          >
            <BsMessenger className="text-xl" /> Messenger
          </a>
        </div>

        {/* Email Support */}
        <div className="mt-6 text-lg font-medium text-gray-700 flex items-center gap-2">
          <FaEnvelope className="text-red-500" /> Email: 
          <a href="mailto:support@PharmaCare.com" className="text-blue-600 hover:underline">support@pharmacare.com</a>
        </div>
      </div>
    </div>
  );
};

export default OnlineDoctors;
