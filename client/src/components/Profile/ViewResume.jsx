import React from "react";

const ViewResume = () => {
  return (
    <div>
      <iframe
        src="https://example.com/resume.pdf"
        className="w-full h-96 rounded-lg shadow-md"
        title="Resume"
      />
      <button
        className="mt-4 px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300"
        style={{ backgroundColor: "var(--accent)", color: "white" }}
      >
        Download Resume
      </button>
    </div>
  );
};

export default ViewResume;