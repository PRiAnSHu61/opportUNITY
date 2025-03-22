import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { db } from "../../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

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

const completeSetup = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { getStarted: true });
    navigate("/jobs");
  } catch (error) {
    console.error("Error updating user setup:", error);
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

const Step6 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, checkUserSetup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    disabilities = [],
    skills = [],
    jobType = [],
    location: userLocation = [],
    salary = [],
    fromReview = false
  } = location.state || {};

  const handleConfirm = async () => {
    if (!currentUser) {
      setError("User not authenticated. Please log in.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Create user profile data object
      const userProfileData = {
        disabilities,
        skills,
        jobType,
        location: userLocation,
        salary,
        getStarted: true,
        updatedAt: new Date().toISOString()
      };

      console.log("User Profile Data:", userProfileData);

      // Check if user document exists and create/update accordingly
      const userRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        // Update existing document
        await updateDoc(userRef, userProfileData);
      } else {
        // Create new document
        await setDoc(userRef, {
          ...userProfileData,
          createdAt: new Date().toISOString(),
          email: currentUser.email || "",
          displayName: currentUser.displayName || ""
        });
      }

      // Update hasCompletedSetup in AuthContext
      await checkUserSetup(currentUser);

      // Save preferences to a separate collection for better querying
      const preferencesRef = doc(db, "userPreferences", currentUser.uid);
      await setDoc(preferencesRef, {
        ...userProfileData,
        userId: currentUser.uid
      }, { merge: true });

      // Prepare data for job recommendations
      const userInputs = {
        disability: disabilities,
        skills,
        work_mode: jobType,
        location: userLocation,
        userId: currentUser.uid
      };

      console.log("Sending data to backend:", userInputs);

      try {
        // Call job recommendation API
        const response = await axios.post(
          "http://127.0.0.1:5001/api/recommend_jobs",
          userInputs,
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("API Response:", response.data);

        // Structure the recommendations data
        const recommendationsData = {
          highly_matched: response.data.highly_matched || [],
          jobs_after_courses: response.data.jobs_after_courses || [],
          suggested_jobs: response.data.suggested_jobs || []
        };

        // Store job recommendations in Firestore
        if (response.data) {
          const recommendationsRef = doc(db, "jobRecommendations", currentUser.uid);
          await setDoc(recommendationsRef, {
            recommendations: recommendationsData,
            createdAt: new Date().toISOString(),
            queryParams: userInputs
          }, { merge: true });

          console.log("Navigating to jobs with data:", {
            userData: userInputs,
            recommendations: recommendationsData
          });

          // Navigate to job recommendations with user data and API response
          navigate("/jobs", { 
            state: { 
              userData: userInputs,
              recommendations: recommendationsData
            }
          });
        } else {
          // Handle case where API worked but no recommendations were returned
          setError("No job recommendations found. Please try with different preferences.");
          setLoading(false);
        }
      } catch (apiError) {
        console.error("API Error:", apiError);
        
        // Save data to Firebase even if API fails
        const recommendationsRef = doc(db, "jobRecommendations", currentUser.uid);
        await setDoc(recommendationsRef, {
          recommendations: {
            highly_matched: [],
            jobs_after_courses: [],
            suggested_jobs: []
          },
          createdAt: new Date().toISOString(),
          queryParams: userInputs,
          apiError: true
        }, { merge: true });
        
        // Navigate to job recommendations page anyway
        navigate("/jobs", { 
          state: { 
            userData: userInputs,
            recommendations: {
              highly_matched: [],
              jobs_after_courses: [],
              suggested_jobs: []
            },
            apiError: true
          }
        });
      }

    } catch (error) {
      console.error("Firestore Error:", error);
      setError(`Failed to complete setup: ${error.message}`);
      setLoading(false);
    }
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
            Step 6: Review Your Selections
          </motion.h2>
          <motion.p
            className="text-blue-100 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Review and confirm your preferences before proceeding
          </motion.p>
        </motion.div>

        <div className="p-8">
          {/* Review sections with animations */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4 mb-6"
          >
            {/* Disabilities Section */}
            <motion.div
              variants={itemVariants}
              className="bg-blue-50 border border-blue-200 rounded-lg overflow-hidden"
            >
              <div className="flex justify-between items-center p-4 bg-blue-100">
                <h3 className="text-lg font-semibold text-blue-700">Disabilities</h3>
                <motion.button
                  onClick={() => navigate("/get-started/step1", { 
                    state: { ...location.state, fromReview: true } 
                  })}
                  className="px-3 py-1 text-sm bg-white text-blue-600 rounded-full hover:bg-blue-50 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit
                </motion.button>
              </div>
              <div className="p-4">
                {disabilities && disabilities.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {disabilities.map(disability => (
                      <motion.span 
                        key={disability}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {disability}
                      </motion.span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Not specified</p>
                )}
              </div>
            </motion.div>
            
            {/* Skills Section */}
            <motion.div
              variants={itemVariants}
              className="bg-purple-50 border border-purple-200 rounded-lg overflow-hidden"
            >
              <div className="flex justify-between items-center p-4 bg-purple-100">
                <h3 className="text-lg font-semibold text-purple-700">Skills</h3>
                <motion.button
                  onClick={() => navigate("/get-started/step2", { 
                    state: { ...location.state, fromReview: true } 
                  })}
                  className="px-3 py-1 text-sm bg-white text-purple-600 rounded-full hover:bg-purple-50 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit
                </motion.button>
              </div>
              <div className="p-4">
                {skills && skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <motion.span 
                        key={skill}
                        className="px-2 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Not specified</p>
                )}
              </div>
            </motion.div>
            
            {/* Job Type Section */}
            <motion.div
              variants={itemVariants}
              className="bg-green-50 border border-green-200 rounded-lg overflow-hidden"
            >
              <div className="flex justify-between items-center p-4 bg-green-100">
                <h3 className="text-lg font-semibold text-green-700">Job Types</h3>
                <motion.button
                  onClick={() => navigate("/get-started/step3", { 
                    state: { ...location.state, fromReview: true } 
                  })}
                  className="px-3 py-1 text-sm bg-white text-green-600 rounded-full hover:bg-green-50 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit
                </motion.button>
              </div>
              <div className="p-4">
                {jobType && jobType.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {jobType.map(type => (
                      <motion.span 
                        key={type}
                        className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {type}
                      </motion.span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Not specified</p>
                )}
              </div>
            </motion.div>
            
            {/* Location Section */}
            <motion.div
              variants={itemVariants}
              className="bg-indigo-50 border border-indigo-200 rounded-lg overflow-hidden"
            >
              <div className="flex justify-between items-center p-4 bg-indigo-100">
                <h3 className="text-lg font-semibold text-indigo-700">Locations</h3>
                <motion.button
                  onClick={() => navigate("/get-started/step4", { 
                    state: { ...location.state, fromReview: true } 
                  })}
                  className="px-3 py-1 text-sm bg-white text-indigo-600 rounded-full hover:bg-indigo-50 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit
                </motion.button>
              </div>
              <div className="p-4">
                {userLocation && userLocation.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {userLocation.map(loc => (
                      <motion.span 
                        key={loc}
                        className="px-2 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {loc}
                      </motion.span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Not specified</p>
                )}
              </div>
            </motion.div>
            
            {/* Salary Section */}
            <motion.div
              variants={itemVariants}
              className="bg-amber-50 border border-amber-200 rounded-lg overflow-hidden"
            >
              <div className="flex justify-between items-center p-4 bg-amber-100">
                <h3 className="text-lg font-semibold text-amber-700">Expected CTC (LPA)</h3>
                <motion.button
                  onClick={() => navigate("/get-started/step5", { 
                    state: { ...location.state, fromReview: true } 
                  })}
                  className="px-3 py-1 text-sm bg-white text-amber-600 rounded-full hover:bg-amber-50 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit
                </motion.button>
              </div>
              <div className="p-4">
                {salary && salary.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {salary.map(range => (
                      <motion.span 
                        key={range}
                        className="px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-sm rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {range}
                      </motion.span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Not specified</p>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Error message */}
          {error && (
            <motion.div 
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <p>{error}</p>
            </motion.div>
          )}

          {/* Buttons */}
          <motion.div 
            className="flex justify-between mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <motion.button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-full font-semibold bg-gray-200 text-gray-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Back
            </motion.button>

            <motion.button
              onClick={handleConfirm}
              disabled={loading}
              className="px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md hover:shadow-lg flex items-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Confirm & Find Jobs →"
              )}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Step6;