import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"; // Adjust the path if needed

const Landing = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gradient-to-b from-[#205781] to-[#F6F8D5] text-white px-12">
      {/* Left Section - Logo */}
      <div className="flex-1 flex justify-center">
        <img
          src={Logo}
          alt="OpportUNITY Logo"
          className="w-56 md:w-72 lg:w-80 object-contain mix-blend-darken opacity-85 drop-shadow-lg animate-fadeIn"
        />
      </div>

      {/* Right Section - Text Content */}
      <div className="flex-1 text-left animate-slideInRight">
        <h1 className="text-5xl font-bold animate-slideUp">
          Welcome to <span className="text-[#205781]">opportUNITY</span>
        </h1>
        <p className="text-lg max-w-xl mt-2 opacity-90 animate-fadeIn delay-200">
          Empowering individuals with disabilities by providing personalized job recommendations.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex space-x-4 animate-fadeIn delay-300">
          <Link to="/login">
            <button className="bg-[#4F959D] px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:bg-[#76b5a9] hover:scale-105 shadow-md">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-[#4F959D] px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:bg-[#76b5a9] hover:scale-105 shadow-md">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
