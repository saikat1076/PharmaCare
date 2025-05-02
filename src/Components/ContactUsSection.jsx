import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdOutlineBusiness } from "react-icons/md";
import { HiOutlineMail, HiOutlineClock } from "react-icons/hi";
import Title from "./Shared/Title";

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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(data);
    setSuccessMessage("Thank you for your message! We'll respond within 24 hours.");
    reset();
    setIsSubmitting(false);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <Title 
          subHeading='Get In Touch' 
          heading='Contact Our Team'
          description='Have questions or need assistance? Our team is ready to help you.'
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Contact Form */}
          <motion.div
            className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Send us a message
            </h3>

            {successMessage && (
              <motion.div
                className="p-4 mb-6 text-green-700 bg-green-50 dark:bg-green-900 dark:text-green-100 rounded-lg border border-green-200 dark:border-green-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {successMessage}
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                    {...register("firstName", { required: "First name is required" })}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                    {...register("lastName")}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                  {...register("subject")}
                >
                  <option value="">Select a subject</option>
                  <option value="support">Support</option>
                  <option value="sales">Sales</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Your message here..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                  {...register("message", { required: "Message is required" })}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                className="w-full py-3.5 px-6 font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition duration-200 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-gray-700 dark:to-gray-800 shadow-lg rounded-xl p-8 border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Contact Information
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-8">
              We're here to help and answer any questions you might have. We look forward to hearing from you.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-lg">
                  <MdLocationOn className="text-indigo-600 dark:text-indigo-400" size={20} />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Headquarters
                  </h4>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    123 Pharma Street<br />
                    Health City, PH 45678<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-lg">
                  <MdOutlineBusiness className="text-indigo-600 dark:text-indigo-400" size={20} />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Office Locations
                  </h4>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    • New York, NY<br />
                    • San Francisco, CA<br />
                    • London, UK<br />
                    • Singapore
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-lg">
                  <MdPhone className="text-indigo-600 dark:text-indigo-400" size={20} />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Phone
                  </h4>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    Main: +1 (555) 123-4567<br />
                    Support: +1 (555) 765-4321
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-lg">
                  <HiOutlineMail className="text-indigo-600 dark:text-indigo-400" size={20} />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Email
                  </h4>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    General: info@pharmacare.com<br />
                    Support: support@pharmacare.com<br />
                    Sales: sales@pharmacare.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-lg">
                  <HiOutlineClock className="text-indigo-600 dark:text-indigo-400" size={20} />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Business Hours
                  </h4>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-10">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Connect With Us
              </h4>
              <div className="flex space-x-4">
                <motion.a
                  href="https://facebook.com"
                  className="bg-white dark:bg-gray-700 p-3 rounded-full shadow-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaFacebookF size={16} />
                </motion.a>
                <motion.a
                  href="https://instagram.com"
                  className="bg-white dark:bg-gray-700 p-3 rounded-full shadow-sm text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaInstagram size={16} />
                </motion.a>
                <motion.a
                  href="https://twitter.com"
                  className="bg-white dark:bg-gray-700 p-3 rounded-full shadow-sm text-gray-700 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300 transition"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTwitter size={16} />
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  className="bg-white dark:bg-gray-700 p-3 rounded-full shadow-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedinIn size={16} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;