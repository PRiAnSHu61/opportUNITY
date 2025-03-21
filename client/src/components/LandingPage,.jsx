import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"; // Adjust the path if needed

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#205781] to-[#F6F8D5] text-white">
      <img
        src={Logo}
        alt="OpportUNITY Logo"
        className="w-40 md:w-52 lg:w-64 object-contain mix-blend-multiply drop-shadow-lg animate-fadeIn"
      />

      <h1 className="text-5xl font-bold mt-4 animate-slideUp">
        Welcome to <span className="text-[#4F959D]">opportUNITY</span>
      </h1>

      <p className="text-lg text-center max-w-2xl mt-2 opacity-90 animate-fadeIn">
        Empowering individuals with disabilities by providing personalized job recommendations.
      </p>

      {/* Buttons */}
      <div className="mt-6 flex space-x-4 ">
        <Link to="/login">
          <button className="bg-[#4F959D] px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:bg-[#76b5a9] hover:scale-110 shadow-md">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-[#4F959D] px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:bg-[#76b5a9] hover:scale-110 shadow-md">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
