import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[var(--primary)] text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Company Info */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold">JobPortal</h3>
          <p className="text-sm opacity-80">Connecting talent with opportunities.</p>
        </div>

        {/* Quick Links */}
        <div className="flex space-x-6">
          <a href="/jobs" className="text-sm hover:underline transition duration-300">Jobs</a>
          <a href="/profile" className="text-sm hover:underline transition duration-300">Profile</a>
          <a href="/resume" className="text-sm hover:underline transition duration-300">Resume</a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition duration-300"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition duration-300"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition duration-300"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition duration-300"
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="text-center mt-6 pt-4 border-t border-opacity-20">
        <p className="text-sm opacity-80">
          &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;