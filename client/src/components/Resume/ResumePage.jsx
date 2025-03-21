import React, { useState } from "react";

const ResumePage = () => {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="min-h-screen flex flex-col items-center p-4" style={{ backgroundColor: "var(--background)" }}>
      <div className="w-full max-w-4xl">
        {/* Resume Header */}
        <h1 className="text-3xl font-bold text-center mb-8" style={{ color: "var(--primary)" }}>Resume</h1>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("create")}
            className={`px-4 py-2 rounded ${activeTab === "create" ? "bg-opacity-90" : "bg-opacity-50"}`}
            style={{ backgroundColor: "var(--primary)", color: "white" }}
          >
            Create Resume
          </button>
          <button
            onClick={() => setActiveTab("upload")}
            className={`px-4 py-2 rounded ${activeTab === "upload" ? "bg-opacity-90" : "bg-opacity-50"}`}
            style={{ backgroundColor: "var(--primary)", color: "white" }}
          >
            Upload Resume
          </button>
        </div>

        {/* Create Resume Tab */}
        {activeTab === "create" && <CreateResume />}

        {/* Upload Resume Tab */}
        {activeTab === "upload" && <UploadResume />}
      </div>
    </div>
  );
};

export default ResumePage;