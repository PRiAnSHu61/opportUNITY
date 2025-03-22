import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";

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

const JobDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { job, userData } = state || {};
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [applyStatus, setApplyStatus] = useState(null);

  useEffect(() => {
    if (!job) {
      setError("No job details available");
      return;
    }

    const fetchUserData = async () => {
      if (!currentUser) return;
      
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserSkills(userData.skills || []);
          
          // Check application status
          const applications = userData.applications || [];
          const application = applications.find(app => app.jobId === job.id);
          if (application) {
            setApplyStatus(application.status);
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, [job, currentUser]);

  const handleApply = async () => {
    if (!currentUser) {
      navigate("/login", { state: { from: "/job-details", message: "Please log in to apply for jobs" } });
      return;
    }
    
    setApplyStatus("processing");
    
    try {
      // Here you would implement the actual job application logic
      // For now, we'll just simulate a successful application
      setApplyStatus("applied");
    } catch (err) {
      console.error("Error applying for job:", err);
      setApplyStatus("error");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h2 className="mt-2 text-xl font-semibold text-gray-900">Error</h2>
            <p className="mt-1 text-gray-600">{error}</p>
            <button
              onClick={() => navigate("/jobs")}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Back to Jobs
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const jobRole = job["Job Role"] || "Unspecified Role";
  const workplaceLocation = job["Workplace Location"] || "Location not specified";
  const salary = job["Salary (INR)"] ? parseInt(job["Salary (INR)"]).toLocaleString('en-IN') : "Not specified";
  const employmentType = job["Employment Type"] || "Full-time";
  const matchedSkills = job["Matched Skills"] ? job["Matched Skills"].split(",") : [];
  const missingSkills = job["Missing Skills"] ? job["Missing Skills"].split(",") : [];
  const courses = job["Recommended Courses"] ? job["Recommended Courses"].split(",") : [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 p-8">
            <h1 className="text-3xl font-bold text-white mb-2">{jobRole}</h1>
            <div className="flex items-center text-white/90">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>{workplaceLocation}</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8">
            {/* Salary and Employment Type */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">₹{salary}</h2>
                <p className="text-gray-600">Annual Salary</p>
              </div>
              <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full">
                {employmentType}
              </div>
            </div>

            {/* Skills Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Matched Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Matching Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {matchedSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills to Develop</h3>
                <div className="flex flex-wrap gap-2">
                  {missingSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended Courses */}
            {courses.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Courses</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <ul className="space-y-3">
                    {courses.map((course, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-indigo-500 mr-2">🎓</span>
                        <span className="text-gray-700">{course.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Job Description */}
            {job["Job Description"] && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h3>
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">{job["Job Description"]}</p>
                </div>
              </div>
            )}

            {/* Requirements */}
            {job["Requirements"] && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">{job["Requirements"]}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => navigate("/jobs")}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back to Jobs
              </button>
              {applyStatus === "applied" ? (
                <button
                  disabled
                  className="px-6 py-2 bg-green-600 text-white rounded-lg cursor-not-allowed"
                >
                  Applied
                </button>
              ) : (
                <button
                  onClick={handleApply}
                  disabled={applyStatus === "processing"}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {applyStatus === "processing" ? "Processing..." : "Apply Now"}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JobDetails;