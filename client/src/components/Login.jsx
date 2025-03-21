import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    if (email === "test@example.com" && password === "password123") {
      alert("Login successful!");
      navigate("/step1_disability"); 
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-[#205781] to-[#F6F8D5] text-white px-6">
      <div className="bg-white text-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md animate-fadeIn">
        <h2 className="text-3xl font-semibold text-center text-[#205781]">Login</h2>

        <form className="mt-6" onSubmit={handleLogin}>
          {/* Email */}
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F959D]"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <label className="block text-sm font-medium mt-4">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F959D]"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-600"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <Link to="/forgot-password" className="text-sm text-[#205781] hover:underline mt-2 block">
            Forgot password?
          </Link>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#4F959D] text-white font-semibold py-3 rounded-lg mt-6 transition hover:bg-[#76b5a9] hover:scale-105"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#205781] hover:underline font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
