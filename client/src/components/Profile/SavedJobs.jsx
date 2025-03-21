import React from "react";

const SavedJobs = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold" style={{ color: "var(--primary)" }}>Saved Jobs</h3>
      <ul className="mt-2">
        <li className="text-sm" style={{ color: "var(--secondary)" }}>Job 1</li>
        <li className="text-sm" style={{ color: "var(--secondary)" }}>Job 2</li>
      </ul>
    </div>
  );
};

export default SavedJobs;