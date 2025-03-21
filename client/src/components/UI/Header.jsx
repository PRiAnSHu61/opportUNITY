import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isJobRecommendationPage = location.pathname === "/job_recommendations";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-md bg-[#205781]">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-white">opportUNITY</span>
        </Link>

        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-6">
          {isJobRecommendationPage ? (
            <>
              <Link to="/jobs" className="text-white hover:text-opacity-80 transition">
                Jobs
              </Link>
              <Link to="/profile" className="text-white hover:text-opacity-80 transition">
                Profile
              </Link>
              <Link to="/resume" className="text-white hover:text-opacity-80 transition">
                Resume
              </Link>
            </>
          ) : (
            <>
              <Link to="/get-started" className="text-white hover:text-opacity-80 transition">
                Get Started
              </Link>
              <Link to="/job_recommendations" className="text-white hover:text-opacity-80 transition">
                Jobs
              </Link>
              <Link to="/login" className="text-white hover:text-opacity-80 transition">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:text-opacity-80 transition">
                Sign Up
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
