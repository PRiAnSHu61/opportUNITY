import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const locations = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune",
  "Jaipur", "Ahmedabad", "Surat", "Lucknow", "Kanpur", "Nagpur", "Indore",
  "Thane", "Bhopal", "Visakhapatnam", "Patna", "Vadodara", "Ghaziabad",
  "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Varanasi",
  "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Jodhpur",
  "Raipur", "Kota", "Guwahati", "Chandigarh", "Noida", "Dehradun",
  "Andaman and Nicobar Islands", "Puducherry", "Ladakh", "Jammu and Kashmir"
];

// Region groupings for locations
const regionGroups = {
  "Metro Cities": ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata"],
  "North India": ["Delhi", "Chandigarh", "Jammu and Kashmir", "Ladakh", "Ludhiana", "Amritsar", "Dehradun", "Lucknow", "Kanpur", "Noida", "Ghaziabad", "Meerut", "Agra", "Varanasi"],
  "South India": ["Bangalore", "Chennai", "Hyderabad", "Visakhapatnam", "Puducherry"],
  "West India": ["Mumbai", "Pune", "Ahmedabad", "Surat", "Thane", "Nashik", "Rajkot", "Vadodara", "Navi Mumbai", "Jodhpur"],
  "East India": ["Kolkata", "Patna", "Dhanbad", "Guwahati"],
  "Central India": ["Indore", "Bhopal", "Raipur", "Kota", "Nagpur", "Aurangabad"],
  "Islands & Territories": ["Andaman and Nicobar Islands", "Puducherry", "Ladakh", "Jammu and Kashmir"]
};

// Variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Step4 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const previousState = location.state || {};
  const isEditing = previousState.fromReview || false;
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocations, setSelectedLocations] = useState(
    Array.isArray(previousState.location) ? previousState.location : 
    previousState.location ? [previousState.location] : []
  );
  const [activeTab, setActiveTab] = useState("All Locations");

  useEffect(() => {
    if (previousState.location) {
      if (Array.isArray(previousState.location)) {
        setSelectedLocations(previousState.location);
      } else {
        setSelectedLocations([previousState.location]);
      }
    }
  }, [previousState.location]);

  const handleLocationToggle = (loc) => {
    setSelectedLocations(prev => 
      prev.includes(loc) 
        ? prev.filter(item => item !== loc) 
        : [...prev, loc]
    );
  };

  const handleClearSelection = () => {
    setSelectedLocations([]);
  };

  const handleNext = () => {
    navigate(isEditing ? "/get-started/step6" : "/get-started/step5", {
      state: { 
        ...previousState, 
        location: selectedLocations,
        fromReview: isEditing, 
      },
    });
  };

  // Filter locations based on search term and active tab
  const getFilteredLocations = () => {
    let filteredLocs = [];
    
    if (activeTab === "All Locations") {
      filteredLocs = locations;
    } else {
      filteredLocs = regionGroups[activeTab] || [];
    }
    
    return filteredLocs.filter(loc =>
      loc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Decorative elements component - matches other pages
  const DecorativeElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Bubbles matching Landing page style */}
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
          initial={{ opacity: 0.2 }}
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
          initial={{ opacity: 0.3 }}
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
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-white to-blue-50 px-6 py-12">
      {/* Background decorative elements */}
      <DecorativeElements />
      
      {/* Main Content */}
      <motion.div 
        className="w-full max-w-2xl bg-white rounded-xl shadow-xl relative z-10 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header with gradient similar to other steps */}
        <motion.div 
          className="bg-gradient-to-r from-indigo-600 to-cyan-500 py-6 px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {isEditing ? "Edit Locations" : "Step 4: Select Your Locations"}
          </motion.h2>
          <motion.p
            className="text-blue-100 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Choose multiple cities where you'd like to work
          </motion.p>
        </motion.div>

        <div className="p-8">
          {/* Previous selections display */}
          {previousState.disabilities && previousState.disabilities.length > 0 && (
            <motion.div 
              className="mb-4 bg-blue-50 border border-blue-200 p-3 rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-md font-semibold text-blue-700">Selected Disabilities:</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {previousState.disabilities.map(disability => (
                  <motion.span 
                    key={disability}
                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {disability}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {previousState.skills && previousState.skills.length > 0 && (
            <motion.div 
              className="mb-4 bg-purple-50 border border-purple-200 p-3 rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-md font-semibold text-purple-700">Selected Skills:</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {previousState.skills.map(skill => (
                  <motion.span 
                    key={skill}
                    className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {previousState.jobType && previousState.jobType.length > 0 && (
            <motion.div 
              className="mb-4 bg-green-50 border border-green-200 p-3 rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-md font-semibold text-green-700">Selected Job Types:</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {previousState.jobType.map(jobType => (
                  <motion.span 
                    key={jobType}
                    className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {jobType}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Selected locations display */}
          {selectedLocations.length > 0 && (
            <motion.div 
              className="mb-6 bg-indigo-50 border border-indigo-200 p-4 rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-indigo-700 mb-2">Selected Locations:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedLocations.map(loc => (
                  <motion.span 
                    key={loc}
                    className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-sm rounded-full flex items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {loc}
                    <button 
                      onClick={() => handleLocationToggle(loc)} 
                      className="ml-2 w-4 h-4 rounded-full bg-white/30 flex items-center justify-center hover:bg-white/50"
                    >
                      <span className="text-xs">×</span>
                    </button>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Search bar */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm"
              />
              <svg 
                className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
          </motion.div>

          {/* Region tabs */}
          <motion.div 
            className="mb-4 overflow-x-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex space-x-2 pb-2">
              <motion.button
                onClick={() => setActiveTab("All Locations")}
                className={`px-3 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                  activeTab === "All Locations" 
                    ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                All Locations
              </motion.button>
              
              {Object.keys(regionGroups).map(region => (
                <motion.button
                  key={region}
                  onClick={() => setActiveTab(region)}
                  className={`px-3 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                    activeTab === region 
                      ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {region}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Location selection area */}
          <motion.div 
            className="max-h-64 overflow-auto pr-2 mb-6 border border-gray-200 rounded-lg p-3 bg-gray-50"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {getFilteredLocations().length > 0 ? (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
                {getFilteredLocations().map((loc, index) => (
                  <motion.label 
                    key={loc} 
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedLocations.includes(loc)
                        ? "bg-gradient-to-r from-indigo-100 to-cyan-100 border border-indigo-300"
                        : "bg-white hover:bg-gray-100 border border-gray-200"
                    }`}
                    variants={itemVariants}
                    transition={{ delay: index * 0.02 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      type="checkbox"
                      value={loc}
                      checked={selectedLocations.includes(loc)}
                      onChange={() => handleLocationToggle(loc)}
                      className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 mr-3"
                    />
                    <span className="text-gray-800 text-sm">{loc}</span>
                  </motion.label>
                ))}
              </div>
            ) : (
              <motion.p 
                className="text-center text-gray-500 py-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No locations found matching your search
              </motion.p>
            )}
          </motion.div>

          {/* Buttons */}
          <motion.div 
            className="flex justify-between mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <motion.button
              onClick={handleClearSelection}
              disabled={!selectedLocations.length}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedLocations.length 
                  ? "bg-gray-200 text-gray-800 hover:bg-gray-300" 
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              whileHover={selectedLocations.length ? { scale: 1.05 } : {}}
              whileTap={selectedLocations.length ? { scale: 0.95 } : {}}
            >
              Clear Selection
            </motion.button>

            <motion.button
              onClick={handleNext}
              disabled={!selectedLocations.length}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                selectedLocations.length 
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md hover:shadow-lg" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              whileHover={selectedLocations.length ? { scale: 1.05, y: -2 } : {}}
              whileTap={selectedLocations.length ? { scale: 0.97 } : {}}
            >
              {isEditing ? "Save Changes" : "Continue →"}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Step4;