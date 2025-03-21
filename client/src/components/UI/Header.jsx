import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";

const Header = () => {
  const { currentUser } = useAuth();
  const { userData } = useUser();

  // Hide header if user hasn't completed "get started" steps
  if (!currentUser || !userData?.getStarted) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-md bg-[#205781]">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-white">opportUNITY</span>
        </Link>

        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/jobs" className="text-white hover:text-opacity-80 transition">
            Jobs
          </Link>
          <Link to="/profile" className="text-white hover:text-opacity-80 transition">
            Profile
          </Link>
          <Link to="/resume" className="text-white hover:text-opacity-80 transition">
            Resume
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
