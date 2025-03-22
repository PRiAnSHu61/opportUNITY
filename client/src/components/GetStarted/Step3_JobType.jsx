import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const jobCategories = {
  "Employment Type": ["Full-Time", "Part-Time", "Freelance", "Internship"],
  "Work Location": ["Remote", "On-Site"]
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

const Step3 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousState = location.state || {};

  const [selectedJobTypes, setSelectedJobTypes] = useState(previousState.jobType || []);
  const isEditing = previousState.fromReview || false;

  useEffect(() => {
    if (previousState.jobType && previousState.jobType.length) {
      setSelectedJobTypes(previousState.jobType);
    }
  }, [previousState.jobType]);

  const handleSelection = (jobType) => {
    setSelectedJobTypes((prev) =>
      prev.includes(jobType) ? prev.filter((item) => item !== jobType) : [...prev, jobType]
    );
  };

  const handleClear = () => setSelectedJobTypes([]);

  const handleNext = () => {
    navigate(isEditing ? "/get-started/step6" : "/get-started/step4", {
      state: {
        ...previousState,
        jobType: selectedJobTypes,
        fromReview: isEditing,
      },
    });
  };

  // Decorative elements component - matches Landing page
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
        {/* Header with gradient similar to Landing */}
        <motion.div 
          className="bg-gradient-to-r from-purple-600 to-blue-500 py-6 px-8"
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
            {isEditing ? "Edit Job Type Selection" : "Step 3: Select Your Preferred Job Type"}
          </motion.h2>
          <motion.p
            className="text-blue-100 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Tell us what type of employment you're looking for
          </motion.p>
        </motion.div>

        <div className="p-8">
          {/* Previous disabilities display */}
          {previousState.disabilities && previousState.disabilities.length > 0 && (
            <motion.div 
              className="mb-6 bg-blue-50 border border-blue-200 p-4 rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Selected Disabilities:</h3>
              <div className="flex flex-wrap gap-2">
                {previousState.disabilities.map(disability => (
                  <motion.span 
                    key={disability}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
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

          {/* Previous skills display */}
          {previousState.skills && previousState.skills.length > 0 && (
            <motion.div 
              className="mb-6 bg-purple-50 border border-purple-200 p-4 rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-purple-700 mb-2">Selected Skills:</h3>
              <div className="flex flex-wrap gap-2">
                {previousState.skills.map(skill => (
                  <motion.span 
                    key={skill}
                    className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm rounded-full"
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

          {/* Selected job types display */}
          {selectedJobTypes.length > 0 && (
            <motion.div 
              className="mb-6 bg-green-50 border border-green-200 p-4 rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-green-700 mb-2">Selected Job Types:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedJobTypes.map(jobType => (
                  <motion.span 
                    key={jobType}
                    className="px-3 py-1 bg-gradient-to-r from-green-600 to-teal-500 text-white text-sm rounded-full flex items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {jobType}
                    <button 
                      onClick={() => handleSelection(jobType)} 
                      className="ml-2 w-4 h-4 rounded-full bg-white/30 flex items-center justify-center hover:bg-white/50"
                    >
                      <span className="text-xs">×</span>
                    </button>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Job type categories */}
          <motion.div 
            className="max-h-96 overflow-auto pr-2 mb-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {Object.entries(jobCategories).map(([category, jobTypes], index) => (
              <motion.div 
                key={category} 
                className="mb-6"
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center mb-3">
                  <div className="w-12 h-1 bg-gradient-to-r from-green-600 to-teal-500 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">{category}</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {jobTypes.map((jobType) => (
                    <motion.label 
                      key={jobType} 
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedJobTypes.includes(jobType)
                          ? "bg-gradient-to-r from-green-100 to-teal-100 border-2 border-green-300"
                          : "bg-gray-100 hover:bg-gray-200 border-2 border-transparent"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        type="checkbox"
                        value={jobType}
                        checked={selectedJobTypes.includes(jobType)}
                        onChange={() => handleSelection(jobType)}
                        className="w-5 h-5 text-green-600 rounded focus:ring-green-500 mr-3"
                      />
                      <span className="text-gray-800">{jobType}</span>
                    </motion.label>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div 
            className="flex justify-between mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <motion.button
              onClick={handleClear}
              disabled={!selectedJobTypes.length}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedJobTypes.length 
                  ? "bg-gray-200 text-gray-800 hover:bg-gray-300" 
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              whileHover={selectedJobTypes.length ? { scale: 1.05 } : {}}
              whileTap={selectedJobTypes.length ? { scale: 0.95 } : {}}
            >
              Clear Selection
            </motion.button>

            <motion.button
              onClick={handleNext}
              disabled={!selectedJobTypes.length}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                selectedJobTypes.length 
                  ? "bg-gradient-to-r from-green-600 to-teal-500 text-white shadow-md hover:shadow-lg" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              whileHover={selectedJobTypes.length ? { scale: 1.05, y: -2 } : {}}
              whileTap={selectedJobTypes.length ? { scale: 0.97 } : {}}
            >
              {isEditing ? "Save Changes" : "Continue →"}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Step3;