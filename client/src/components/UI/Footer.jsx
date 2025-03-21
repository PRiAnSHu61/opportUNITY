import React from "react";

const Footer = () => {
  return (
<<<<<<< HEAD
    <footer className="fixed bottom-0 left-0 right-0 bg-[#205781] text-white py-4">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo & Slogan */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">opportUNITY</h3>
            <p className="text-sm">Empowering careers, embracing diversity</p>
          </div>

          {/* Contact & Socials */}
          <div className="flex flex-col md:flex-row md:space-x-8 text-center md:text-left">
            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-1">Contact</h4>
              <p className="text-sm">support@opportunity.com</p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-2">Follow Us</h4>
              <div className="flex justify-center md:justify-start space-x-4">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" alt="LinkedIn" className="w-6 h-6 hover:opacity-75" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" className="w-6 h-6 hover:opacity-75" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="w-6 h-6 hover:opacity-75" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" className="w-6 h-6 hover:opacity-75" />
                </a>
              </div>
            </div>
          </div>
=======
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
>>>>>>> ae4e137bec4753975412ea0848a2db7a04b8855a
        </div>

        {/* Copyright Section */}
        <div className="mt-6 text-center text-sm border-t border-gray-400 pt-4">
          <p>&copy; 2024 opportUNITY. All rights reserved.</p>
        </div>
<<<<<<< HEAD
=======

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
>>>>>>> ae4e137bec4753975412ea0848a2db7a04b8855a
      </div>
    </footer>
  );
};

export default Footer;