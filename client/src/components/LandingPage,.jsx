import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import wheelchair from "../assets/wheelchair.png";
import leg from "../assets/leg.png";
import blind from "../assets/blind.png";

// Predefine animations for reuse
const fadeInAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
  viewport: { once: true, amount: 0.3 }
};

const Landing = () => {
  const sections = [
    {
      image: wheelchair,
      heading: "Career Pathways Without Barriers",
      subtext: "Discover opportunities that recognize your unique talents. Our platform connects you with employers who value diversity and celebrate your abilities.",
      highlight: "Talent Recognition",
      align: "right",
    },
    {
      image: leg,
      heading: "Your Skills, Your Journey",
      subtext: "Every career path should be accessible. We're here to ensure your professional growth knows no bounds, with personalized matches for your specific talents and aspirations.",
      highlight: "Personalized Matching",
      align: "left",
    },
    {
      image: blind,
      heading: "Building Inclusive Futures",
      subtext: "Join a community where potential is seen beyond limitations. Our partners are committed to creating workplaces where everyone can thrive and contribute meaningfully.",
      highlight: "Community Support",
      align: "right",
    },
  ];

  // Memoized decorative elements
  const decorativeElements = (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Reduced number of elements for better performance */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="absolute bg-gradient-to-r from-purple-600 to-blue-500 opacity-20 rounded-full"
          style={{ 
            width: `${Math.floor(Math.random() * 8) + 3}rem`,
            height: `${Math.floor(Math.random() * 8) + 3}rem`,
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%` 
          }}
          animate={{
            y: [0, Math.random() * 10 - 5],
            x: [0, Math.random() * 10 - 5],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
      
      {/* Lines with animation */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 opacity-30"
          style={{ 
            width: `${Math.random() * 10 + 5}rem`,
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)` 
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen text-black flex flex-col items-center relative overflow-hidden bg-gradient-to-b from-white to-blue-50">
      {/* Background Elements */}
      {decorativeElements}
      
      {/* Navbar */}
      <motion.nav 
        className="w-full flex justify-between items-center py-4 fixed top-0 left-0 right-0 backdrop-blur-sm bg-white/70 z-50 px-6 md:px-12 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          opport<span className="font-extrabold">UNITY</span>
        </motion.h1>
        
        <div className="flex space-x-3 md:space-x-4">
          <Link to="/login">
            <motion.button
              className="px-4 md:px-6 py-2 md:py-3 text-lg md:text-xl rounded-full text-white font-semibold bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 hover:shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Login
            </motion.button>
          </Link>
          <Link to="/signup">
            <motion.button
              className="px-4 md:px-6 py-2 md:py-3 text-lg md:text-xl rounded-full text-white font-semibold bg-gradient-to-r from-purple-700 to-indigo-500 transition-all duration-300 hover:shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Sign Up
            </motion.button>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div 
        className="w-full pt-24 md:pt-28 pb-10 px-6 md:px-12 text-center"
        {...fadeInAnimation}
      >
        <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-700 to-blue-600 text-transparent bg-clip-text leading-tight">
          Where Talent Meets Opportunity
        </h2>
        <p className="text-lg md:text-xl mt-4 max-w-2xl mx-auto text-gray-700 leading-relaxed">
          Connecting capable individuals with forward-thinking employers committed to workplace 
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500"> diversity, accessibility, and inclusion</span>.
        </p>
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200">Job Seekers</span>
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">Employers</span>
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">Mentorship</span>
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-violet-100 text-violet-800 border border-violet-200">Resources</span>
        </motion.div>
      </motion.div>

      {/* Content Sections */}
      <div className="w-full flex flex-col space-y-16 md:space-y-24 px-6 md:px-12 pb-20">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className={`flex flex-col ${section.align === "left" ? "md:flex-row-reverse" : "md:flex-row"} items-center justify-between w-full gap-8 md:gap-12`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="md:w-1/2 text-left"
              initial={{ opacity: 0, x: section.align === "left" ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div 
                className="flex items-center mb-4 gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-1 bg-gradient-to-r from-purple-600 to-blue-500" />
                <span className="text-sm font-semibold uppercase tracking-wider text-purple-700">{section.highlight}</span>
              </motion.div>
              
              <motion.h3 
                className="text-3xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-purple-700 to-blue-600 text-transparent bg-clip-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {section.heading}
              </motion.h3>
              
              <motion.div
                className="mt-4 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 opacity-40 rounded-full" />
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed pl-4">
                  {section.subtext}
                </p>
                
                <div className="mt-4 pl-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Personalized for your needs</span>
                </div>
                
                <div className="mt-2 pl-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Access to inclusive employers</span>
                </div>
              </motion.div>
          
            </motion.div>
            
            <motion.div
              className="md:w-1/2 flex justify-center overflow-hidden rounded-xl shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <img
                src={section.image}
                alt={section.heading}
                className="w-full h-auto max-w-md object-cover"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      {/* Call to Action */}
      <motion.div
        className="w-full py-16 bg-gradient-to-r from-purple-600/10 to-blue-500/10 text-center px-6 md:px-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Ready to start your journey?</h3>
        <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Join our community of professionals finding their path to success, regardless of ability.
        </p>
        <motion.button
          className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-lg rounded-full font-medium shadow-lg"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)" }}
          whileTap={{ scale: 0.97 }}
        >
          Get Started Today
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Landing;