// src/components/ResumePage.jsx
import React, { useState } from "react";

const ResumePage = () => {
  const [hasResume, setHasResume] = useState(false);
  const [file, setFile] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false);
      alert("Resume uploaded successfully!");
    }, 2000);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your feedback!");
    setFeedback("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "var(--background)" }}>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--primary)" }}>Resume</h1>

        {/* Resume Options */}
        <div className="mb-8">
          <p className="text-lg mb-4" style={{ color: "var(--primary)" }}>
            {hasResume ? "You already have a resume." : "You don't have a resume yet."}
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setHasResume(!hasResume)}
              className="py-2 px-4 rounded transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: "var(--accent)", color: "white" }}
            >
              {hasResume ? "Create New Resume" : "I Have a Resume"}
            </button>
          </div>
        </div>

        {/* Upload Resume Section */}
        {hasResume && (
          <div className="mb-8 transition-all duration-500 ease-in-out">
            <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--primary)" }}>Upload Your Resume</h2>
            <div className="flex items-center gap-4">
              <input
                type="file"
                onChange={handleFileChange}
                className="border rounded p-2 flex-1"
                style={{ borderColor: "var(--secondary)" }}
              />
              <button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className="py-2 px-4 rounded transition-all duration-300 hover:scale-105 disabled:opacity-50"
                style={{ backgroundColor: "var(--primary)", color: "white" }}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        )}

        {/* Create Resume Section */}
        {!hasResume && (
          <div className="mb-8 transition-all duration-500 ease-in-out">
            <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--primary)" }}>Create Your Resume</h2>
            <p className="mb-4" style={{ color: "var(--primary)" }}>
              Start building your resume from scratch. Fill in your details, skills, and experience.
            </p>
            <button
              className="py-2 px-4 rounded transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: "var(--accent)", color: "white" }}
            >
              Create Resume
            </button>
          </div>
        )}

        {/* Feedback Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--primary)" }}>Feedback</h2>
          <form onSubmit={handleFeedbackSubmit}>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your feedback..."
              className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2"
              style={{ borderColor: "var(--secondary)", focus: { ringColor: "var(--accent)" } }}
              rows="4"
            />
            <button
              type="submit"
              className="py-2 px-4 rounded transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: "var(--primary)", color: "white" }}
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;