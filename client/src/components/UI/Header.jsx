import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-md" style={{ backgroundColor: "var(--primary)" }}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo.png" // Replace with your logo path
            alt="Logo"
            className="h-10 w-10 mr-2"
          />
          <span className="text-xl font-bold text-white">JobPortal</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 mx-8">
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full p-2 rounded-lg focus:outline-none focus:ring-2"
            style={{ backgroundColor: "var(--background)", borderColor: "var(--secondary)", focus: { ringColor: "var(--accent)" } }}
          />
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link
            to="/jobs"
            className="text-white hover:text-opacity-80 transition"
          >
            Jobs
          </Link>
          <Link
            to="/resume"
            className="text-white hover:text-opacity-80 transition"
          >
            Resume
          </Link>
          <Link
            to="/profile"
            className="text-white hover:text-opacity-80 transition"
          >
            Profile
          </Link>
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          {/* Notifications Button */}
          <button className="relative p-2 rounded-full hover:bg-opacity-20 transition" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">3</span>
          </button>

          {/* Saved Jobs Button */}
          <Link
            to="/saved-jobs"
            className="p-2 rounded-full hover:bg-opacity-20 transition"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </Link>

          {/* Profile Picture */}
          <Link to="/profile" className="flex items-center">
            <img
              src="https://via.placeholder.com/40" // Replace with user's profile picture
              alt="Profile"
              className="h-10 w-10 rounded-full border-2"
              style={{ borderColor: "var(--accent)" }}
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;