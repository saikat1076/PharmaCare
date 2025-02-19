import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdLocationOn, MdPhone } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import Title from "./Shared/Title";

const ContactUsSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = (data) => {
    console.log(data);
    setSuccessMessage("Thank you for reaching out! We will get back soon.");
    reset();
  };

  return (
    <section className="px-6">
      <div className="container mx-auto">
      <Title subHeading='Get In Touch' heading=' Your trusted partner for health & wellness'></Title>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.div
            className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 transition-transform hover:scale-105"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {successMessage && (
              <motion.div
                className="p-4 mb-6 text-green-700 bg-green-100 rounded-lg border-l-4 border-green-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {successMessage}
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block font-semibold text-gray-700 dark:text-white">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-3 border rounded-lg shadow-sm dark:bg-gray-800 dark:text-white"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border rounded-lg shadow-sm dark:bg-gray-800 dark:text-white"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-white">
                  Message
                </label>
                <textarea
                  placeholder="Enter your message"
                  className="w-full p-3 border rounded-lg shadow-sm dark:bg-gray-800 dark:text-white"
                  {...register("message", { required: "Message is required" })}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                className="w-full py-3 font-bold text-white rounded-lg shadow-md bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 transition-transform"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            className="bg-gray-100 dark:bg-gray-800 shadow-xl rounded-2xl p-8 flex flex-col items-center transition-transform hover:scale-105"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              PharmaCare
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
              Your trusted partner for health & wellness.
            </p>

            <div className="space-y-5 w-full">
              <div className="flex items-center space-x-4">
                <MdLocationOn className="text-indigo-500" size={28} />
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-white">
                    Address
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    123 Pharma Street, Health City, PH 45678
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <MdPhone className="text-indigo-500" size={28} />
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-white">
                    Phone
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    +123-456-7890
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <HiOutlineMail className="text-indigo-500" size={28} />
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-white">
                    Email
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    support@pharmacare.com
                  </p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-6 mt-6">
              <motion.a
                href="https://facebook.com"
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition-transform hover:scale-110"
              >
                <FaFacebookF size={28} />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                className="text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-transform hover:scale-110"
              >
                <FaInstagram size={28} />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-400 transition-transform hover:scale-110"
              >
                <FaTwitter size={28} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
