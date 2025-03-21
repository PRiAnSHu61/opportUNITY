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

  // Function to generate random colors for the bubbles
  const getRandomColor = () => {
    const colors = [
      '#8E44AD', '#3498DB', '#F39C12', '#E91E63', '#2ECC71', '#1ABC9C', '#9B59B6'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="min-h-screen text-black flex items-center justify-center px-6 md:px-12 relative overflow-y-auto bg-white">
    {/* Background Decorative Elements */}
    <div className="absolute inset-0 flex justify-center items-center">
      {/* Bubbles */}
      {[...Array(20)].map((_, i) => {
        const bubbleSize = Math.floor(Math.random() * 15) + 10; // Random size between 10 and 25
        const topPosition = Math.random() * 70 + 10; // Random top position, keeping it within the 10% to 80% range
        const leftPosition = Math.random() * 70 + 10; // Random left position, keeping it within the 10% to 80% range
  
        return (
          <div
            key={i}
            className={`absolute opacity-80 rounded-full`}
            style={{
              top: `${topPosition}%`,
              left: `${leftPosition}%`,
              width: `${bubbleSize}px`,
              height: `${bubbleSize}px`,
              background: `hsl(${Math.random() * 360}, 70%, 60%)`, // Random color fill
              pointerEvents: "none", // Ensure bubbles don't interfere with form
            }}
          ></div>
        );
      })}
    </div>
  
    <div className="bg-gradient-to-r from-[#9B59B6] to-[#5DADE2] opacity-90 text-white rounded-3xl shadow-xl p-10 w-full max-w-md animate-fadeIn relative z-10">
      <h2 className="text-3xl font-semibold text-center text-black">Login</h2>
  
      <form className="mt-6" onSubmit={handleLogin}>
        {/* Email */}
        <label className="block text-sm font-medium text-black">Email</label>
        <input
          type="email"
          className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
  
        {/* Password */}
        <label className="block text-sm font-medium text-black mt-4">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-black"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
  
        <Link to="/forgot-password" className="text-sm text-black hover:underline mt-2 block">
          Forgot password?
        </Link>
  
        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-black text-white font-semibold py-3 rounded-lg mt-6 transition hover:bg-gray-700"
        >
          Login
        </button>
      </form>
  
      <p className="text-center mt-4 text-black">
        Don't have an account?{" "}
        <Link to="/signup" className="text-black hover:underline font-semibold">
          Sign Up
        </Link>
      </p>
    </div>
  </div>
  
  );
};

export default Login;
