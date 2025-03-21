import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-[#205781] to-[#F6F8D5] text-white px-6">
      <div className="bg-white text-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md animate-fadeIn">
        <h2 className="text-3xl font-semibold text-center text-[#205781]">Sign Up</h2>

        <form className="mt-6">
          {/* Full Name */}
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F959D]"
            placeholder="Enter your full name"
            required
          />

          {/* Email */}
          <label className="block text-sm font-medium mt-4">Email</label>
          <input
            type="email"
            className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F959D]"
            placeholder="Enter your email"
            required
          />

          {/* Password */}
          <label className="block text-sm font-medium mt-4">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F959D]"
              placeholder="Create a password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-600"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-[#4F959D] text-white font-semibold py-3 rounded-lg mt-6 transition hover:bg-[#76b5a9] hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#205781] hover:underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
