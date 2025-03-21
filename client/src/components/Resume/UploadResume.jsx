import React, { useState } from "react";

const UploadResume = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      console.log("Resume Uploaded:", file);
      alert("Resume Uploaded Successfully!");
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--primary)" }}>Upload Your Resume</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium" style={{ color: "var(--primary)" }}>Choose File</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2"
            style={{ borderColor: "var(--secondary)", focus: { ringColor: "var(--accent)" } }}
            accept=".pdf,.doc,.docx"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white font-semibold rounded hover:bg-opacity-90 transition"
          style={{ backgroundColor: "var(--accent)" }}
        >
          Upload Resume
        </button>
      </form>
    </div>
  );
};

export default UploadResume;