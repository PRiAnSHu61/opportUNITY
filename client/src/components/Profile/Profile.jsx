import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    location: "",
    skills: [],
    education: "",
    experience: ""
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!currentUser) {
        navigate("/login", { state: { from: "/profile", message: "Please log in to view your profile" } });
        return;
      }
      
      try {
        setLoading(true);
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          const userProfileData = userDocSnap.data();
          // Ensure we always use the latest auth data for email and photo
          setUserData({
            ...userProfileData,
            email: currentUser.email,
            photoURL: currentUser.photoURL
          });
          setFormData({
            displayName: userProfileData.displayName || currentUser.displayName || "",
            bio: userProfileData.bio || "",
            location: userProfileData.location || "",
            skills: userProfileData.skills || [],
            education: userProfileData.education || "",
            experience: userProfileData.experience || ""
          });
        } else {
          // Initialize with data from Auth if profile doesn't exist yet
          setUserData({
            displayName: currentUser.displayName || "",
            email: currentUser.email || "",
            photoURL: currentUser.photoURL || "",
          });
          setFormData({
            displayName: currentUser.displayName || "",
            bio: "",
            location: "",
            skills: [],
            education: "",
            experience: ""
          });
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load your profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [currentUser, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setFormData({
      ...formData,
      skills
    });
  };

  const handleSaveProfile = async () => {
    if (!currentUser) return;
    
    setIsSaving(true);
    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      
      // Prepare data for update, but don't override the photoURL from auth
      const updateData = {
        ...formData,
        updatedAt: new Date()
      };
      
      await updateDoc(userDocRef, updateData);
      
      // Update local state
      setUserData({
        ...userData,
        ...formData,
        // Always keep Gmail profile pic
        photoURL: currentUser.photoURL,
        email: currentUser.email
      });
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update your profile. Please try again.");
    } finally {
      setIsSaving(false);
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
              onClick={() => navigate("/")}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

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
            <div className="flex items-center">
              <div className="relative">
                <img 
                  src={currentUser.photoURL || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"}
                  alt="Profile" 
                  className="w-24 h-24 rounded-full border-4 border-white object-cover"
                />
              </div>
              <div className="ml-6">
                <h1 className="text-3xl font-bold text-white mb-1">{userData.displayName || "User Profile"}</h1>
                <div className="flex items-center text-white/90">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>{currentUser.email}</span>
                </div>
                {userData.location && (
                  <div className="flex items-center text-white/90 mt-1">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span>{userData.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8">
            {!editMode ? (
              // View Mode
              <>
                {/* Bio Section */}
                {userData.bio && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 whitespace-pre-line">{userData.bio}</p>
                    </div>
                  </div>
                )}

                {/* Skills Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {userData.skills && userData.skills.length > 0 ? (
                      userData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No skills added yet</p>
                    )}
                  </div>
                </div>

                {/* Education */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
                  {userData.education ? (
                    <div className="prose max-w-none">
                      <p className="text-gray-700 whitespace-pre-line">{userData.education}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No education details added yet</p>
                  )}
                </div>

                {/* Experience */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Experience</h3>
                  {userData.experience ? (
                    <div className="prose max-w-none">
                      <p className="text-gray-700 whitespace-pre-line">{userData.experience}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No work experience added yet</p>
                  )}
                </div>

                {/* Applications Section - Optional */}
                {userData.applications && userData.applications.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Applications</h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <ul className="space-y-3">
                        {userData.applications.map((app, index) => (
                          <li key={index} className="flex items-center justify-between">
                            <span className="text-gray-700">{app.jobTitle || "Job Application"}</span>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              app.status === "applied" ? "bg-green-100 text-green-800" : 
                              app.status === "rejected" ? "bg-red-100 text-red-800" : 
                              "bg-yellow-100 text-yellow-800"
                            }`}>
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Logout
                  </button>
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Edit Profile
                  </button>
                </div>
              </>
            ) : (
              // Edit Mode
              <>
                <div className="space-y-6">
                  {/* Profile Photo Display (non-editable) */}
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <img 
                        src={currentUser.photoURL || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"}
                        alt="Profile" 
                        className="w-24 h-24 rounded-full border-2 border-gray-200 object-cover"
                      />
                      <div className="mt-2 text-center text-sm text-gray-500">
                        Using profile picture from Google
                      </div>
                    </div>
                  </div>

                  {/* Display Name */}
                  <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                      Display Name
                    </label>
                    <input
                      type="text"
                      id="displayName"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  {/* Bio */}
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows="4"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Tell us about yourself..."
                    ></textarea>
                  </div>

                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="City, Country"
                    />
                  </div>

                  {/* Skills */}
                  <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                      Skills (comma separated)
                    </label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      value={formData.skills.join(", ")}
                      onChange={handleSkillsChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="React, JavaScript, UI/UX, etc."
                    />
                  </div>

                  {/* Education */}
                  <div>
                    <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                      Education
                    </label>
                    <textarea
                      id="education"
                      name="education"
                      rows="3"
                      value={formData.education}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Your educational background..."
                    ></textarea>
                  </div>

                  {/* Experience */}
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                      Work Experience
                    </label>
                    <textarea
                      id="experience"
                      name="experience"
                      rows="3"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Your work experience..."
                    ></textarea>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setEditMode(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? "Saving..." : "Save Profile"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;