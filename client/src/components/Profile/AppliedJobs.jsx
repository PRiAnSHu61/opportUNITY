import React from "react";

const AppliedJobs = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold" style={{ color: "var(--primary)" }}>Applied Jobs</h3>
      <ul className="mt-2">
        <li className="text-sm" style={{ color: "var(--secondary)" }}>Job A</li>
        <li className="text-sm" style={{ color: "var(--secondary)" }}>Job B</li>
      </ul>
    </div>
  );
};

export default AppliedJobs;