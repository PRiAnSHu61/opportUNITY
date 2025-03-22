import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useUser } from "../../context/UserContext.jsx";
import { motion } from "framer-motion";

const Footer = () => {
  const { currentUser } = useAuth();
  const { userData } = useUser();

  // Hide footer if user hasn't completed "get started" steps
  if (!currentUser || !userData?.getStarted) return null;

  // Animation variants
  const socialVariants = {
    hover: { 
      scale: 1.1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-8 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo & Slogan */}
          <motion.div 
            className="mb-6 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-1">opportUNITY</h3>
            <p className="text-sm opacity-80">Empowering careers, embracing diversity</p>
          </motion.div>

          {/* Contact & Socials */}
          <div className="flex flex-col md:flex-row md:space-x-12 text-center md:text-left">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="font-semibold mb-2">Contact</h4>
              <p className="text-sm opacity-90">support@opportunity.com</p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="font-semibold mb-3 mt-6 md:mt-0">Follow Us</h4>
              <div className="flex justify-center md:justify-start space-x-5">
                <motion.a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  variants={socialVariants}
                  whileHover="hover"
                >
                  <div className="bg-white/20 p-2 rounded-full">
                    <img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" alt="LinkedIn" className="w-5 h-5" />
                  </div>
                </motion.a>
                <motion.a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  variants={socialVariants}
                  whileHover="hover"
                >
                  <div className="bg-white/20 p-2 rounded-full">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" className="w-5 h-5" />
                  </div>
                </motion.a>
                <motion.a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  variants={socialVariants}
                  whileHover="hover"
                >
                  <div className="bg-white/20 p-2 rounded-full">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="w-5 h-5" />
                  </div>
                </motion.a>
                <motion.a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  variants={socialVariants}
                  whileHover="hover"
                >
                  <div className="bg-white/20 p-2 rounded-full">
                    <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" className="w-5 h-5" />
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Copyright Section */}
        <motion.div 
          className="mt-8 text-center text-sm border-t border-white/20 pt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p>&copy; 2024 opportUNITY. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;