import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import { useJob } from "../../context/JobContext";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

// Constants moved outside component to reduce clutter
const jobImages = {
  "Software Engineer": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "Data Scientist": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "Marketing Manager": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "Graphic Designer": "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "Project Manager": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "Financial Analyst": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "HR Specialist": "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  default: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
};

const categoryInfo = {
  "highly_matched": {
    title: "Perfect Matches For You",
    icon: "🎯",
    color: "from-indigo-600 to-cyan-500"
  },
  "jobs_after_courses": {
    title: "Jobs After Recommended Courses",
    icon: "🎓",
    color: "from-purple-600 to-blue-500"
  },
  "suggested_jobs": {
    title: "Other Suggested Opportunities",
    icon: "💡",
    color: "from-amber-500 to-orange-600"
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const JobRecommendation = () => {
  const { state } = useLocation();
  const navigate = useNavigate(); // Added navigate hook
  const { userData: locationUserData, recommendations: locationRecommendations } = state || {};
  const { currentUser } = useAuth();
  const { 
    jobRecommendations, setJobRecommendations, 
    jobsLoaded, setJobsLoaded,
    jobLoadingError, setJobLoadingError
  } = useJob();
  
  const [loading, setLoading] = useState(false);
  const [fetchingUserData, setFetchingUserData] = useState(false);
  const [userDataToUse, setUserDataToUse] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const loadMoreRef = useRef(null);
  const initialDataFetchedRef = useRef(false);

  // Fetch user data either from location state or Firestore
  useEffect(() => {
    const fetchUserDataFromFirestore = async () => {
      if (userDataToUse !== null) return;
      
      // Use location data if available
      if (locationUserData && Object.keys(locationUserData).length > 0) {
        setUserDataToUse(locationUserData);
        if (locationRecommendations) {
          const structuredRecommendations = {
            highly_matched: locationRecommendations.highly_matched || [],
            jobs_after_courses: locationRecommendations.jobs_after_courses || [],
            suggested_jobs: locationRecommendations.suggested_jobs || []
          };
          setJobRecommendations(structuredRecommendations);
          setJobsLoaded(true);
          initialDataFetchedRef.current = true;
        }
        return;
      }

      // Otherwise fetch from Firestore
      if (!currentUser) {
        setJobLoadingError("You must be logged in to view job recommendations");
        return;
      }

      setFetchingUserData(true);
      try {
        const userDocSnap = await getDoc(doc(db, "users", currentUser.uid));
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData && Object.keys(userData).length > 0) {
            setUserDataToUse(userData);
          } else {
            setJobLoadingError("Please complete your profile to get job recommendations");
          }
        } else {
          setJobLoadingError("User profile not found. Please complete your profile");
        }
      } catch (error) {
        setJobLoadingError("Failed to load your profile data. Please try again");
      } finally {
        setFetchingUserData(false);
      }
    };

    fetchUserDataFromFirestore();
  }, [currentUser, locationUserData, locationRecommendations, setJobRecommendations, setJobsLoaded, setJobLoadingError, userDataToUse]);

  // Fetch job recommendations
  const fetchJobRecommendations = useCallback(async () => {
    if (!userDataToUse || Object.keys(userDataToUse).length === 0) return;
    if (page === 1 && jobsLoaded && jobRecommendations.highly_matched.length > 0) return;
    if (page === 1 && initialDataFetchedRef.current) return;

    page === 1 ? setLoading(true) : setLoadingMore(true);
    setJobLoadingError(null);

    try {
      const response = await axios.post("http://127.0.0.1:5001/api/recommend_jobs", {
        ...userDataToUse,
        page,
        per_page: 6
      });

      if (response.data) {
        const newRecommendations = {
          highly_matched: page === 1
            ? response.data.highly_matched || []
            : [...jobRecommendations.highly_matched, ...(response.data.highly_matched || [])],
          jobs_after_courses: page === 1
            ? response.data.jobs_after_courses || []
            : [...jobRecommendations.jobs_after_courses, ...(response.data.jobs_after_courses || [])],
          suggested_jobs: page === 1
            ? response.data.suggested_jobs || []
            : [...jobRecommendations.suggested_jobs, ...(response.data.suggested_jobs || [])]
        };

        setJobRecommendations(newRecommendations);
        setHasMore(response.data.has_more === true);
        if (page === 1) {
          setJobsLoaded(true);
          initialDataFetchedRef.current = true;
        }
      }
    } catch (error) {
      setJobLoadingError(`Failed to fetch job recommendations: ${error.message}`);
    } finally {
      page === 1 ? setLoading(false) : setLoadingMore(false);
    }
  }, [userDataToUse, page, jobsLoaded, jobRecommendations, setJobRecommendations, setJobsLoaded, setJobLoadingError]);

  // Trigger job fetch when conditions are met
  useEffect(() => {
    if (userDataToUse && Object.keys(userDataToUse).length > 0) {
      if ((page === 1 && !jobsLoaded) || page > 1) {
        fetchJobRecommendations();
      }
    }
  }, [fetchJobRecommendations, userDataToUse, page, jobsLoaded]);

  // Infinite scrolling observer
  useEffect(() => {
    const currentObserverRef = loadMoreRef.current;
    
    if (!currentObserverRef || !hasMore || loading || loadingMore || !jobsLoaded) {
      return;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 } 
    );

    observer.observe(currentObserverRef);
    return () => currentObserverRef && observer.unobserve(currentObserverRef);
  }, [hasMore, loading, loadingMore, jobsLoaded]);

  // Handle job details button click
  const handleViewDetails = (job) => {
    // Navigate to job details page with job data
    navigate('/job-details', {
      state: {
        job,
        userData: userDataToUse
      }
    });
  };

  // Component for loading indicator
  const LoadingIndicator = () => (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );

  // Component for decorative elements
  const DecorativeElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
          animate={{ y: [0, Math.random() * 10 - 5], x: [0, Math.random() * 10 - 5] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, repeatType: "reverse" }}
        />
      ))}
      
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
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4 + Math.random() * 3, repeat: Infinity }}
        />
      ))}
    </div>
  );

  // Render job card
  const renderJobCard = (job, category, index) => {
    const jobRole = job["Job Role"] || "default";
    const jobImage = jobImages[jobRole] || jobImages.default;
    const matchedSkills = job["Matched Skills"] ? job["Matched Skills"].split(",") : [];
    const missingSkills = job["Missing Skills"] ? job["Missing Skills"].split(",") : [];
    const courses = job["Recommended Courses"] ? job["Recommended Courses"].split(",") : [];

    return (
      <motion.div
        key={`${category}-${index}`}
        variants={itemVariants}
        className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col border border-gray-200"
      >
        <div className="relative">
          <img
            src={jobImage}
            alt={jobRole}
            className="w-full h-48 object-cover"
            onError={(e) => (e.target.src = jobImages.default)}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-60"></div>
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="text-xl font-bold drop-shadow-lg">{jobRole}</h3>
            <p className="text-sm opacity-90">{job["Workplace Location"]}</p>
          </div>
        </div>

        <div className="p-5 flex-grow">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-800">
              ₹{parseInt(job["Salary (INR)"]).toLocaleString('en-IN')}
            </span>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {job["Employment Type"] || "Full-time"}
            </span>
          </div>

          {matchedSkills.length > 0 && (
            <div className="mb-3">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Skills You Have:</h4>
              <div className="flex flex-wrap gap-1">
                {matchedSkills.slice(0, 3).map((skill, i) => (
                  <span key={i} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    {skill.trim()}
                  </span>
                ))}
                {matchedSkills.length > 3 && (
                  <span className="bg-green-50 text-green-800 text-xs px-2 py-1 rounded">
                    +{matchedSkills.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {missingSkills.length > 0 && (
            <div className="mb-3">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Skills to Develop:</h4>
              <div className="flex flex-wrap gap-1">
                {missingSkills.slice(0, 3).map((skill, i) => (
                  <span key={i} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                    {skill.trim()}
                  </span>
                ))}
                {missingSkills.length > 3 && (
                  <span className="bg-red-50 text-red-800 text-xs px-2 py-1 rounded">
                    +{missingSkills.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {courses.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Recommended Courses:</h4>
              <ul className="text-xs text-gray-600">
                {courses.slice(0, 2).map((course, i) => (
                  <li key={i} className="flex items-center mb-1">
                    <span className="mr-1">🎓</span> {course.trim()}
                  </li>
                ))}
                {courses.length > 2 && (
                  <li className="text-blue-600 cursor-pointer hover:underline">
                    +{courses.length - 2} more courses
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        
        <div className="p-4 pt-0">
          <motion.button 
            className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium rounded-lg shadow-md"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleViewDetails(job)} // Added click handler
          >
            View Details
          </motion.button>
        </div>
      </motion.div>
    );
  };

  // Render job grid
  const renderJobGrid = (jobs, category) => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {jobs.map((job, index) => renderJobCard(job, category, index))}
    </motion.div>
  );

  // Calculate display data
  const hasJobs = Object.values(jobRecommendations).some(arr => arr.length > 0);
  const jobsByCategory = Object.fromEntries(
    Object.entries(categoryInfo)
      .filter(([category]) => jobRecommendations[category]?.length > 0)
      .map(([category]) => [category, jobRecommendations[category]])
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-white to-blue-50 px-6 py-12">
      <DecorativeElements />
      
      <motion.div 
        className="w-full max-w-6xl relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500 mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Your Career Opportunities
          </motion.h1>
          <motion.p 
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Personalized job recommendations based on your skills, experience, and career goals
          </motion.p>
        </motion.div>

        {/* Error Display */}
        {jobLoadingError && (
          <motion.div 
            className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{jobLoadingError}</span>
            </div>
          </motion.div>
        )}

        {/* Main Loading State */}
        {(loading || fetchingUserData) && (
          <div className="bg-white rounded-xl shadow-xl p-12 flex justify-center items-center">
            <LoadingIndicator />
          </div>
        )}

        {/* Rendered Job Categories */}
        {!loading && !fetchingUserData && (
          Object.keys(jobsByCategory).map((category) => (
            <motion.div 
              key={category} 
              className="mb-12 bg-white rounded-xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`bg-gradient-to-r ${categoryInfo[category].color} p-6`}>
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <span className="mr-2">{categoryInfo[category].icon}</span>
                  {categoryInfo[category].title}
                </h2>
              </div>
              
              <div className="p-6">
                {renderJobGrid(jobsByCategory[category], category)}
              </div>
            </motion.div>
          ))
        )}
        
        {/* Load More indicator */}
        {hasJobs && !loading && !fetchingUserData && (
          <div 
            ref={loadMoreRef} 
            className="py-8 my-4 w-full text-center"
            style={{ minHeight: '100px' }}
          >
            {loadingMore ? (
              <LoadingIndicator />
            ) : hasMore ? (
              <div className="text-gray-600">
                <p>Scroll for more opportunities...</p>
              </div>
            ) : (
              <motion.div 
                className="text-center text-gray-600 py-4 bg-white rounded-xl shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p>You've seen all available job recommendations</p>
              </motion.div>
            )}
          </div>
        )}
        
        {/* Empty state */}
        {!loading && !fetchingUserData && !hasJobs && !jobLoadingError && (
          <motion.div 
            className="text-center py-16 bg-white rounded-xl shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg className="w-16 h-16 mx-auto mb-4 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">No job recommendations yet</h3>
            <p className="text-gray-600">Complete your profile to get personalized job recommendations</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default JobRecommendation;