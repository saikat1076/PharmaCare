import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { MdLocationOn, MdPhone } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";

const ContactUsSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(data);
    setSuccessMessage("Thank you! We'll respond soon.");
    reset();
    setIsSubmitting(false);
  };

  return (
    <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Get in touch with our team</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div 
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Send a Message</h3>
            
            {successMessage && (
              <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-md">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  {...register("message", { required: "Message is required" })}
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Contact Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <MdLocationOn className="text-indigo-600 mt-1 mr-3" size={18} />
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">Address</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">123 Pharma Street, Health City</p>
                </div>
              </div>

              <div className="flex items-start">
                <MdPhone className="text-indigo-600 mt-1 mr-3" size={18} />
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">Phone</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">+123-456-7890</p>
                </div>
              </div>

              <div className="flex items-start">
                <HiOutlineMail className="text-indigo-600 mt-1 mr-3" size={18} />
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">Email</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">contact@example.com</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium text-gray-800 dark:text-white mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                <a href="#" className="p-2 bg-white dark:bg-gray-700 rounded-full">
                  <FaFacebookF className="text-gray-700 dark:text-gray-300" size={14} />
                </a>
                <a href="#" className="p-2 bg-white dark:bg-gray-700 rounded-full">
                  <FaInstagram className="text-gray-700 dark:text-gray-300" size={14} />
                </a>
                <a href="#" className="p-2 bg-white dark:bg-gray-700 rounded-full">
                  <FaTwitter className="text-gray-700 dark:text-gray-300" size={14} />
                </a>
                <a href="#" className="p-2 bg-white dark:bg-gray-700 rounded-full">
                  <FaLinkedinIn className="text-gray-700 dark:text-gray-300" size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;