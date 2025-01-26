import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';

const JoinUs = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = (data) => {
    console.log(data); // Handle form submission

    // Show success message
    setSuccessMessage('Thank you for applying! We will contact you soon.');
    
    // Reset the form
    reset();
  };

  return (
   <>
   <Helmet>
                <meta charSet="utf-8" />
                <title>PharmaCare | JoinUs</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
   
   <div className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-8">Join Us at PharmaCare</h2>

        {/* Form Section */}
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          {/* Success Message */}
          {successMessage && (
            <div className="p-4 mb-6 bg-green-100 text-green-700 border-l-4 border-green-500">
              <p>{successMessage}</p>
            </div>
          )}

          {/* Application Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                className="input input-bordered w-full mt-2"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                className="input input-bordered w-full mt-2"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: 'Enter a valid email address' }
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Phone Number Field */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
                className="input input-bordered w-full mt-2"
                {...register('phone', { 
                  required: 'Phone number is required',
                  pattern: { value: /^[0-9]{10}$/, message: 'Enter a valid 10-digit phone number' }
                })}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            {/* Upload Resume */}
            <div className="mb-4">
              <label htmlFor="resume" className="block text-sm font-semibold text-gray-700">Upload Resume</label>
              <input
                type="file"
                id="resume"
                className="file-input file-input-bordered w-full mt-2"
                {...register('resume', { required: 'Please upload your resume' })}
              />
              {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume.message}</p>}
            </div>

            {/* Cover Letter */}
            <div className="mb-4">
              <label htmlFor="coverLetter" className="block text-sm font-semibold text-gray-700">Cover Letter (Optional)</label>
              <textarea
                id="coverLetter"
                placeholder="Tell us why you're a great fit for this position."
                className="textarea textarea-bordered w-full mt-2"
                {...register('coverLetter')}
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full mt-4">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div></>
  );
};

export default JoinUs;
