import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { MdLocationOn, MdPhone} from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          {/* PharmaCare Info */}
          <div>
            <h3 className="text-3xl font-semibold mb-4">PharmaCare</h3>
            <p className="text-lg">Your trusted partner for health and wellness, providing a wide range of medicinal products.</p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-2xl font-semibold mb-4">Contact Us</h4>
            <div className="mb-4 flex items-center justify-center sm:justify-start">
              <MdLocationOn className="text-teal-400 mr-2" size={24} />
              <p className="text-lg">123 Pharma Street, Health City, PH 45678</p>
            </div>
            <div className="mb-4 flex items-center justify-center sm:justify-start">
              <MdPhone className="text-teal-400 mr-2" size={24} />
              <p className="text-lg">+123-456-7890</p>
            </div>
            <div className="flex items-center justify-center sm:justify-start">
              <HiOutlineMailOpen className="text-teal-400 mr-2" size={24} />
              <p className="text-lg">support@pharmacare.com</p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-2xl font-semibold mb-4">Follow Us</h4>
            <div className="flex justify-center space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-blue-600 transition-all duration-300">
                <FaFacebook size={30} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-pink-600 transition-all duration-300">
                <FaInstagram size={30} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-blue-400 transition-all duration-300">
                <FaTwitter size={30} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-blue-700 transition-all duration-300">
                <FaLinkedin size={30} />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-2xl font-semibold mb-4">Newsletter</h4>
            <p className="text-lg mb-4">Subscribe to our newsletter for the latest updates on health and wellness!</p>
            <form className="flex items-center justify-center sm:justify-start">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-l-lg border-2 border-teal-400 text-black"
              />
              <button type="submit" className="bg-teal-400 text-white p-2 rounded-r-lg">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-teal-400 pt-4 mt-8 text-center">
          <p className="text-lg">© 2025 PharmaCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
