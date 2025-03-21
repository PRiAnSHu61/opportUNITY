// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import wheelchair from "../assets/wheelchair.png";
// import leg from "../assets/leg.png";
// import blind from "../assets/blind.png";

// const Landing = () => {
//   const images = [wheelchair, leg, blind];
//   const headings = [
//     "Unlock Your Next Career Move",
//     "Empowering You for Success",
//     "Opportunities Without Limits",
//   ];
//   const subtexts = [
//     "Find. Grow. Succeed.",
//     "Inclusive growth starts here. Explore career opportunities that match your skills and aspirations. We believe in a world where abilities define opportunities, not limitations.",
//     "Your abilities, your future. Step into a world of endless career possibilities designed to support your growth and success.",
//   ];

//   return (
//     <div className="min-h-screen text-black flex flex-col items-center px-6 md:px-12 relative overflow-y-auto snap-y snap-mandatory bg-white">
//       {/* Background Decorative Elements */}
//       <div className="absolute inset-0 flex justify-center items-center">
//         <div className="absolute w-40 h-40 bg-gradient-to-r from-[#8E44AD] to-[#3498DB] opacity-30 rounded-full top-20 left-10 animate-pulse"></div>
//         <div className="absolute w-32 h-32 bg-gradient-to-r from-[#82E0AA] to-[#28B463] opacity-20 rounded-full bottom-20 right-16 animate-bounce"></div>
//         <div className="absolute w-48 h-48 bg-gradient-to-r from-[#F7DC6F] to-[#F39C12] opacity-25 rounded-full top-1/2 left-1/3 animate-spin-slow"></div>
//         {/* Wave Shape on Right Side */}
//         <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-b from-[#8E44AD] to-[#3498DB] opacity-20 clip-wave"></div>
//       </div>
      
//       <div className="w-full flex justify-between items-center py-4 fixed top-0 left-0 right-0 bg-opacity-80 bg-white z-50 px-6 md:px-12">
//         <h1 className="text-5xl font-bold bg-gradient-to-r from-[#8E44AD] to-[#3498DB] text-transparent bg-clip-text">opportUNITY</h1>
//         <div className="flex space-x-4">
//           <Link to="/login">
//             <motion.button
//               className="px-6 py-3 text-xl rounded-full text-white font-semibold bg-gradient-to-r from-[#8E44AD] to-[#3498DB] transition-all duration-300 hover:shadow-[0px_0px_20px_#2E86C1]"
//               whileHover={{ scale: 1.1, y: -5, rotate: 2 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Login
//             </motion.button>
//           </Link>
//           <Link to="/signup">
//             <motion.button
//               className="px-6 py-3 text-xl rounded-full text-white font-semibold bg-gradient-to-r from-[#8E44AD] to-[#3498DB] transition-all duration-300 hover:shadow-[0px_0px_20px_#F5B041]"
//               whileHover={{ scale: 1.1, y: -5, rotate: -2 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Sign Up
//             </motion.button>
//           </Link>
//         </div>
//       </div>

//       <div className="w-full flex flex-col space-y-0 snap-start mt-16">
//         {images.map((image, index) => (
//           <div
//             key={index}
//             className={`flex flex-col ${index === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center justify-between w-full mt-0 relative z-10 snap-start min-h-[70vh]`}
//           >
//             <motion.div
//               className="md:w-1/2 text-left"
//               initial={{ opacity: 0, x: index === 1 ? 50 : -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1, ease: "easeOut" }}
//               viewport={{ once: false, amount: 0.5 }}
//             >
//               <motion.h1 className="text-5xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-[#8E44AD] to-[#3498DB] text-transparent bg-clip-text">
//                 {headings[index]}
//               </motion.h1>
//               <motion.p
//                 className="text-xl md:text-2xl mt-6 opacity-90 text-[#2C3E50]"
//                 initial={{ opacity: 0, x: index === 1 ? 30 : -30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
//                 viewport={{ once: false, amount: 0.5 }}
//               >
//                 {subtexts[index]}
//               </motion.p>
//             </motion.div>
//             <motion.div
//               className="md:w-1/2 flex justify-end overflow-hidden"
//               initial={{ opacity: 0, scale: 0.8 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 1, ease: "easeOut" }}
//               viewport={{ once: false, amount: 0.5 }}
//             >
//               <img
//                 src={image}
//                 alt={`Image ${index + 1}`}
//                 className="w-full h-full max-w-[75vw] md:max-w-[75vw] lg:max-w-[75vw] object-cover"
//               />
//             </motion.div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Landing;
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import wheelchair from "../assets/wheelchair.png";
import leg from "../assets/leg.png";
import blind from "../assets/blind.png";

const Landing = () => {
  const images = [wheelchair, leg, blind];
  const headings = [
    "Unlock Your Next Career Move",
    "Empowering You for Success",
    "Opportunities Without Limits",
  ];
  const subtexts = [
    "Find. Grow. Succeed.",
    "Inclusive growth starts here. Explore career opportunities that match your skills and aspirations. We believe in a world where abilities define opportunities, not limitations.",
    "Your abilities, your future. Step into a world of endless career possibilities designed to support your growth and success.",
  ];

  return (
    <div className="min-h-screen text-black flex flex-col items-center px-6 md:px-12 relative overflow-y-auto snap-y snap-mandatory bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 flex justify-center items-center">
        {/* Bubbles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-${Math.floor(Math.random() * 10) + 5} h-${Math.floor(Math.random() * 10) + 5} bg-gradient-to-r from-[#8E44AD] to-[#3498DB] opacity-30 rounded-full`}
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
          ></div>
        ))}
        {/* Lines Design */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-1 bg-gradient-to-r from-[#8E44AD] to-[#3498DB] opacity-50"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, transform: `rotate(${Math.random() * 360}deg)` }}
          ></div>
        ))}
        {/* Round Design Patterns */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-16 h-16 border-4 border-[#8E44AD] rounded-full opacity-40"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
          ></div>
        ))}
      </div>
      
      <div className="w-full flex justify-between items-center py-4 fixed top-0 left-0 right-0 bg-opacity-80 bg-white z-50 px-6 md:px-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-[#8E44AD] to-[#3498DB] text-transparent bg-clip-text">opportUNITY</h1>
        <div className="flex space-x-4">
          <Link to="/login">
            <motion.button
              className="px-6 py-3 text-xl rounded-full text-white font-semibold bg-gradient-to-r from-[#8E44AD] to-[#3498DB] transition-all duration-300 hover:shadow-[0px_0px_20px_#2E86C1]"
              whileHover={{ scale: 1.1, y: -5, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          </Link>
          <Link to="/signup">
            <motion.button
              className="px-6 py-3 text-xl rounded-full text-white font-semibold bg-gradient-to-r from-[#8E44AD] to-[#3498DB] transition-all duration-300 hover:shadow-[0px_0px_20px_#F5B041]"
              whileHover={{ scale: 1.1, y: -5, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </Link>
        </div>
      </div>

      <div className="w-full flex flex-col space-y-0 snap-start mt-16">
        {images.map((image, index) => (
          <div
            key={index}
            className={`flex flex-col ${index === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center justify-between w-full mt-0 relative z-10 snap-start min-h-[70vh]`}
          >
            <motion.div
              className="md:w-1/2 text-left"
              initial={{ opacity: 0, x: index === 1 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.5 }}
            >
              <motion.h1 className="text-5xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-[#8E44AD] to-[#3498DB] text-transparent bg-clip-text">
                {headings[index]}
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl mt-6 opacity-90 text-[#2C3E50]"
                initial={{ opacity: 0, x: index === 1 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.5 }}
              >
                {subtexts[index]}
              </motion.p>
            </motion.div>
            <motion.div
              className="md:w-1/2 flex justify-end overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.5 }}
            >
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-full max-w-[75vw] md:max-w-[75vw] lg:max-w-[75vw] object-cover"
              />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landing;
