import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[var(--primary)] text-white py-8">
<<<<<<< HEAD
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">JobPortal</h3>
          <p className="text-sm opacity-80">
            Connecting talented individuals with the best job opportunities worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/jobs" className="text-sm opacity-80 hover:opacity-100 hover:underline transition duration-300">
                Jobs
              </a>
            </li>
            <li>
              <a href="/profile" className="text-sm opacity-80 hover:opacity-100 hover:underline transition duration-300">
                Profile
              </a>
            </li>
            <li>
              <a href="/resume" className="text-sm opacity-80 hover:opacity-100 hover:underline transition duration-300">
                Resume
              </a>
            </li>
            <li>
              <a href="/notifications" className="text-sm opacity-80 hover:opacity-100 hover:underline transition duration-300">
                Notifications
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Legal</h3>
          <ul className="space-y-2">
            <li>
              <a href="/privacy-policy" className="text-sm opacity-80 hover:opacity-100 hover:underline transition duration-300">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms-of-service" className="text-sm opacity-80 hover:opacity-100 hover:underline transition duration-300">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/cookies" className="text-sm opacity-80 hover:opacity-100 hover:underline transition duration-300">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition duration-300"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition duration-300"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition duration-300"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition duration-300"
            >
              <FaInstagram size={20} />
            </a>
          </div>
=======
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold">opportUNITY</h3>
          <p className="text-sm opacity-80">Connecting talent with Pathways.</p>
        </div>

        <div className="flex space-x-6">
          <a href="/jobs" className="text-sm hover:underline transition duration-300">Jobs</a>
          <a href="/profile" className="text-sm hover:underline transition duration-300">Profile</a>
          <a href="/resume" className="text-sm hover:underline transition duration-300">Resume</a>
        </div>

        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition duration-300">
            <FaFacebook size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition duration-300">
            <FaTwitter size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition duration-300">
            <FaLinkedin size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition duration-300">
            <FaInstagram size={20} />
          </a>
>>>>>>> 2711ee5d4c5046204f718db016f5daa28a3e26ae
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="text-center mt-8 pt-6 border-t border-opacity-20">
        <p className="text-sm opacity-80">
<<<<<<< HEAD
          &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
=======
          &copy; {new Date().getFullYear()}2025 opportUNITY. All rights reserved.
>>>>>>> 2711ee5d4c5046204f718db016f5daa28a3e26ae
        </p>
      </div>
    </footer>
  );
};

export default Footer;