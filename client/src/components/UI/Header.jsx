import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useUser } from "../../context/UserContext.jsx";
import { motion } from "framer-motion";

const Header = () => {
  const { currentUser } = useAuth();
  const { userData } = useUser();

  // Hide header if user hasn't completed "get started" steps
  if (!currentUser || !userData?.getStarted) return null;

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 shadow-md bg-gradient-to-r from-indigo-600 to-cyan-500"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo with animation */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">opportUNITY</span>
          </Link>
        </motion.div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-8">
          <NavLink to="/jobs" label="Jobs" />
          <NavLink to="/profile" label="Profile" />
          <NavLink to="/resume" label="Resume" />
        </nav>
      </div>
    </motion.header>
  );
};

// Animated NavLink component
const NavLink = ({ to, label }) => (
  <motion.div
    whileHover={{ y: -2 }}
    whileTap={{ y: 0 }}
  >
    <Link 
      to={to} 
      className="text-white hover:text-opacity-80 transition font-medium"
    >
      {label}
    </Link>
  </motion.div>
);

export default Header;