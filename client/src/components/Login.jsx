// src/components/Login.jsx
import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#F6F8D5" }}>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#205781" }}>Welcome Back</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "#205781" }}>Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2"
              style={{ borderColor: "#4F959D", focus: { ringColor: "#98D2C0" } }}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: "#205781" }}>Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2"
              style={{ borderColor: "#4F959D", focus: { ringColor: "#98D2C0" } }}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white font-semibold rounded hover:bg-opacity-90 transition"
            style={{ backgroundColor: "#205781" }}
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-sm hover:underline" style={{ color: "#4F959D" }}>Forgot Password?</a>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm" style={{ color: "#205781" }}>
            Don't have an account?{" "}
            <a href="/signup" className="font-semibold hover:underline" style={{ color: "#98D2C0" }}>
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;