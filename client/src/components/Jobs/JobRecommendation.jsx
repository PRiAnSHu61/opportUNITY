import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import * as THREE from "three";
import WAVES from "vanta/dist/vanta.waves.min";
import { useLocation } from "react-router-dom";

// Modern job images using free online image links
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

// Category titles and styles
const categoryInfo = {
  "highly_matched": {
    title: "Perfect Matches For You",
    icon: "🎯",
    color: "from-emerald-500 to-green-600"
  },
  "jobs_after_courses": {
    title: "Jobs After Recommended Courses",
    icon: "🎓",
    color: "from-blue-500 to-indigo-600"
  },
  "suggested_jobs": {
    title: "Other Suggested Opportunities",
    icon: "💡",
    color: "from-amber-500 to-orange-600"
  }
};

const JobRecommendation = () => {
  const { state } = useLocation();
  const { userData } = state || {};
  const [jobRecommendations, setJobRecommendations] = useState({
    highly_matched: [],
    jobs_after_courses: [],
    suggested_jobs: []
  });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const vantaEffectRef = useRef(null);
  const bgRef = useRef(null);
  const loadMoreRef = useRef(null);

  // Fetch job recommendations
  const fetchJobRecommendations = useCallback(async () => {
    if (!userData || Object.keys(userData).length === 0) return;

    // Use loadingMore for subsequent page loads, and loading for initial load
    if (page === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);

    try {
      const response = await axios.post("http://localhost:5001/api/recommend_jobs", {
        ...userData,
        page,
        per_page: 6 // Increased to ensure we get an even number for 2-column layout
      });

      if (response.data) {
        setJobRecommendations((prev) => ({
          highly_matched: page === 1
            ? response.data.highly_matched
            : [...prev.highly_matched, ...response.data.highly_matched],
          jobs_after_courses: page === 1
            ? response.data.jobs_after_courses
            : [...prev.jobs_after_courses, ...response.data.jobs_after_courses],
          suggested_jobs: page === 1
            ? response.data.suggested_jobs
            : [...prev.suggested_jobs, ...response.data.suggested_jobs]
        }));

        setHasMore(response.data.has_more);
      }
    } catch (error) {
      console.error("Error fetching job recommendations:", error);
      setError("Failed to fetch job recommendations. Please try again.");
    } finally {
      if (page === 1) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  }, [userData, page]);

  // Reset state when userData changes
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setError(null);
    setJobRecommendations({
      highly_matched: [],
      jobs_after_courses: [],
      suggested_jobs: []
    });
  }, [userData]);

  // Fetch data when userData changes & page updates
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      fetchJobRecommendations();
    }
  }, [fetchJobRecommendations]);

  // Setup intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.5 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasMore, loading, loadingMore]);

  // Load more function
  const loadMore = () => {
    if (!loading && !loadingMore && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  // Initialize background animation only once with memoized settings
  useEffect(() => {
    if (!vantaEffectRef.current && bgRef.current) {
      vantaEffectRef.current = WAVES({
        el: bgRef.current,
        THREE,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: window.innerHeight,
        minWidth: window.innerWidth,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x0a62aa,
        shininess: 60,
        waveHeight: 15,
        waveSpeed: 0.65,
        zoom: 0.9
      });
    }
    
    // Proper cleanup
    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, []);

  // Handle window resize for the background
  useEffect(() => {
    const handleResize = () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        className="bg-white rounded-xl shadow-xl overflow-hidden h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index % 4 * 0.1 }}
        whileHover={{ scale: 1.03, y: -5 }}
      >
        <div>
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

          <div className="p-5">
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
              <div className="mt-4 pt-3 border-t border-gray-200">
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

            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
              View Details
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Render a grid of job cards
  const renderJobGrid = (jobs, category) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job, index) => renderJobCard(job, category, index))}
      </div>
    );
  };

  // Loading indicator component
  const LoadingIndicator = () => (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>
  );

  // Determine if we should show more content
  const hasJobs = 
    jobRecommendations.highly_matched.length + 
    jobRecommendations.jobs_after_courses.length + 
    jobRecommendations.suggested_jobs.length > 0;
  
  // Group jobs by category for section headers
  const jobsByCategory = {};
  Object.keys(categoryInfo).forEach(category => {
    if (jobRecommendations[category].length > 0) {
      jobsByCategory[category] = jobRecommendations[category];
    }
  });

  return (
    <>
      {/* Background container that fills the content area */}
      <div ref={bgRef} className="fixed inset-0 -z-10"></div>
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/40 -z-10"></div>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold text-white mb-4">Your Career Opportunities</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Personalized job recommendations based on your skills, experience, and career goals
          </p>
        </motion.div>

        {error && (
          <motion.div 
            className="bg-red-500 text-white p-4 rounded-lg mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{error}</span>
            </div>
          </motion.div>
        )}

        {loading ? (
          <LoadingIndicator />
        ) : (
          // Render all categories in a vertical flow
          Object.keys(jobsByCategory).map((category) => (
            <motion.div 
              key={category} 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`bg-gradient-to-r ${categoryInfo[category].color} rounded-lg p-4 mb-6`}>
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <span className="mr-2">{categoryInfo[category].icon}</span>
                  {categoryInfo[category].title}
                </h2>
              </div>
              
              {renderJobGrid(jobsByCategory[category], category)}
            </motion.div>
          ))
        )}
        
        {/* Load More indicator (invisible but tracked by intersection observer) */}
        {hasJobs && hasMore && !loading && (
          <div ref={loadMoreRef} className="flex justify-center my-8">
            {loadingMore ? (
              <LoadingIndicator />
            ) : (
              <div className="py-4 text-center text-white">
                <p>Loading more opportunities...</p>
              </div>
            )}
          </div>
        )}

        {/* No more jobs message */}
        {!loading && !hasMore && hasJobs && (
          <div className="text-center text-white py-8">
            <p>You've seen all available job recommendations</p>
          </div>
        )}
        
        {/* Empty state */}
        {!loading && !hasJobs && !error && (
          <div className="text-center text-white py-16">
            <svg className="w-16 h-16 mx-auto mb-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-xl font-semibold mb-2">No job recommendations yet</h3>
            <p>Complete your profile to get personalized job recommendations</p>
          </div>
        )}
      </div>
    </>
  );
};

export default JobRecommendation;