import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { MdLocationOn, MdPhone } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';

const ContactUsSection = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmit = (data) => {
        console.log(data); // Handle form submission
        setSuccessMessage('Thank you for contacting us! We will get back to you soon.');
        reset(); // Reset the form
    };

    return (
        <section className="py-12 bg-gradient-to-r from-blue-500 to-teal-500" id="contact-us">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-semibold text-center text-white mb-8">Get in Touch</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Contact Form */}
                    <div className="w-full mx-auto bg-white p-4 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-500">
                        {/* Success Message */}
                        {successMessage && (
                            <div className="p-4 mb-6 bg-green-100 text-green-700 border-l-4 border-green-500 rounded-md">
                                <p>{successMessage}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Name Field */}
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-lg font-semibold text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter your name"
                                    className="input input-bordered w-full mt-2 rounded-lg shadow-md"
                                    {...register('name', { required: "Name is required" })}
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                            </div>

                            {/* Email Field */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-lg font-semibold text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    className="input input-bordered w-full mt-2 rounded-lg shadow-md"
                                    {...register('email', {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                            message: "Enter a valid email address"
                                        }
                                    })}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>

                            {/* Phone Number Field */}
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-lg font-semibold text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    placeholder="Enter your phone number"
                                    className="input input-bordered w-full mt-2 rounded-lg shadow-md"
                                    {...register('phone', {
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "Enter a valid 10-digit phone number"
                                        }
                                    })}
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                            </div>

                            {/* Message Field */}
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-lg font-semibold text-gray-700">Message</label>
                                <textarea
                                    id="message"
                                    placeholder="Enter your message"
                                    className="textarea textarea-bordered w-full mt-2 rounded-lg shadow-md"
                                    {...register('message', { required: "Message is required" })}
                                />
                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="btn btn-primary w-full mt-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg shadow-lg hover:bg-teal-600 transition-all duration-300">
                                Submit
                            </button>
                        </form>
                    </div>

                    {/* Contact Details Section */}
          <div className="max-w-lg mx-auto bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500 p-8 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                    <h3 className="text-4xl font-bold text-white mb-4 text-center">PharmaCare</h3>
                    <p className="text-xl text-gray-100 mb-6 text-center">Your trusted partner for health and wellness, providing a wide range of medicinal products.</p>

                    <div className="mb-6">
                        <div className="flex items-center space-x-4 mb-4">
                            <MdLocationOn className="text-teal-200" size={30} />
                            <div>
                                <h4 className="font-semibold text-white">Address</h4>
                                <p className="text-lg text-gray-200">123 Pharma Street, Health City, PH 45678</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 mb-4">
                            <MdPhone className="text-teal-200" size={30} />
                            <div>
                                <h4 className="font-semibold text-white">Phone</h4>
                                <p className="text-lg text-gray-200">+123-456-7890</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 mb-4">
                            <HiOutlineMail className="text-teal-200" size={30} />
                            <div>
                                <h4 className="font-semibold text-white">Email</h4>
                                <p className="text-lg text-gray-200">support@pharmacare.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-8 mt-6">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600 transition-all duration-300 transform hover:scale-125">
                            <FaFacebook size={32} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-600 transition-all duration-300 transform hover:scale-125">
                            <FaInstagram size={32} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-all duration-300 transform hover:scale-125">
                            <FaTwitter size={32} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section >
  );
};

export default ContactUsSection;
