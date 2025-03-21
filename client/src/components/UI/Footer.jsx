import React from "react";

const Footer = () => {
  return (
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
        </div>

        {/* Copyright Section */}
        <div className="mt-6 text-center text-sm border-t border-gray-400 pt-4">
          <p>&copy; 2024 opportUNITY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
