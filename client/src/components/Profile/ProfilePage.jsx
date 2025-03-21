
import React, { useState } from "react";
import EditProfile from "./EditProfile";
import ViewResume from "./ViewResume";
import Notifications from "./Notifications";
import ChangePassword from "./ChangePassword";
import SavedJobs from "./SavedJobs";
import AppliedJobs from "./AppliedJobs";
import ProfilePicture from "./ProfilePicture";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen flex flex-col items-center p-4" style={{ backgroundColor: "var(--background)" }}>
      <div className="w-full max-w-4xl">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <ProfilePicture />
          <h1 className="text-3xl font-bold mt-4" style={{ color: "var(--primary)" }}>John Doe</h1>
          <p className="text-lg" style={{ color: "var(--secondary)" }}>Software Engineer</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 rounded transition-all duration-300 ${
              activeTab === "profile" ? "bg-opacity-90" : "bg-opacity-50 hover:bg-opacity-70"
            }`}
            style={{ backgroundColor: "var(--primary)", color: "white" }}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("resume")}
            className={`px-4 py-2 rounded transition-all duration-300 ${
              activeTab === "resume" ? "bg-opacity-90" : "bg-opacity-50 hover:bg-opacity-70"
            }`}
            style={{ backgroundColor: "var(--primary)", color: "white" }}
          >
            Resume
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            className={`px-4 py-2 rounded transition-all duration-300 ${
              activeTab === "jobs" ? "bg-opacity-90" : "bg-opacity-50 hover:bg-opacity-70"
            }`}
            style={{ backgroundColor: "var(--primary)", color: "white" }}
          >
            Jobs
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300">
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--primary)" }}>Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium" style={{ color: "var(--primary)" }}>Bio</label>
                <p className="mt-1" style={{ color: "var(--secondary)" }}>I am a passionate software engineer with 5+ years of experience.</p>
              </div>
              <div>
                <label className="block text-sm font-medium" style={{ color: "var(--primary)" }}>Contact Info</label>
                <p className="mt-1" style={{ color: "var(--secondary)" }}>Email: john.doe@example.com</p>
                <p className="mt-1" style={{ color: "var(--secondary)" }}>Phone: +123 456 7890</p>
              </div>
              <EditProfile />
            </div>
          </div>
        )}

        {/* Resume Tab */}
        {activeTab === "resume" && (
          <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300">
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--primary)" }}>Resume</h2>
            <ViewResume />
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === "jobs" && (
          <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300">
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--primary)" }}>Jobs</h2>
            <div className="space-y-6">
              <SavedJobs />
              <AppliedJobs />
            </div>
          </div>
        )}

        {/* Notifications and Logout */}
        <div className="mt-8 flex justify-end space-x-4">
          <Notifications />
          <ChangePassword />
          <button
            className="px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300"
            style={{ backgroundColor: "var(--primary)", color: "white" }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;