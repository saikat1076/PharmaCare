// src/Modal.js
import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ medicine, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-lg flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white p-6 rounded-3xl w-4/5 md:w-2/3 lg:w-1/3 shadow-xl relative">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-red-500 transition duration-300"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Image and Discount Badge */}
        <div className="relative mb-6 flex justify-center">
          <img
            src={medicine.image}
            alt={medicine.itemName}
            className="w-40 h-40 object-cover rounded-full border-4 border-gray-200 shadow-md"
          />
          <span className="absolute top-2 right-2 bg-red-500 text-white py-1 px-4 rounded-full text-xs font-semibold">
            {medicine.discountPercentage}% OFF
          </span>
        </div>

        {/* Medicine Details */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">{medicine.itemName}</h2>

        <div className="space-y-4 text-gray-700">
          <p><strong className="text-gray-800">Generic Name:</strong> {medicine.genericName}</p>
          <p><strong className="text-gray-800">Description:</strong> {medicine.shortDescription}</p>
          <p><strong className="text-gray-800">Category:</strong> {medicine.category}</p>
          <p><strong className="text-gray-800">Company:</strong> {medicine.company}</p>
          <p><strong className="text-gray-800">Price:</strong> <span className="text-red-500 font-semibold">${medicine.perUnitPrice}</span></p>
          <p><strong className="text-gray-800">Seller Email:</strong> {medicine.sellerEmail}</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200">
            Add to Cart
          </button>
          <button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-200">
            View More
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export { Modal };
