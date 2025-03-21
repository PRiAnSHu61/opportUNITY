import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const JobDetails = () => {
  const location = useLocation();
  const job = location.state?.job || {
    title: "Software Engineer",
    company: "Tech Corp",
    location: "Remote",
    type: "Full-Time",
    salary: "$80,000 - $100,000",
    description:
      "We are looking for a skilled Software Engineer to join our team. You will be responsible for developing and maintaining software applications, collaborating with cross-functional teams, and ensuring high-quality code.",
  };
  
  const navigate = useNavigate();

  const handleApply = () => {
    // Navigate to the application page or show a modal
    alert("Apply for this job!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#205781] to-[#F6F8D5] text-white px-6 py-12">
      <div className="bg-white text-gray-900 rounded-lg shadow-lg p-8 w-full max-w-3xl animate-fadeIn">
        {/* Job Title and Company */}
        <h1 className="text-4xl font-bold text-[#205781]">{job.title}</h1>
        <p className="text-xl text-[#4F959D] mt-2">{job.company}</p>

        {/* Job Details */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold text-[#205781]">Location:</span>
            <span className="text-lg text-gray-700">{job.location}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold text-[#205781]">Job Type:</span>
            <span className="text-lg text-gray-700">{job.type}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold text-[#205781]">Salary:</span>
            <span className="text-lg text-gray-700">{job.salary}</span>
          </div>
        </div>

        {/* Job Description */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#205781]">Job Description</h2>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">{job.description}</p>
        </div>

        {/* Apply Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleApply}
            className="px-8 py-3 bg-[#4F959D] text-white font-semibold rounded-lg hover:bg-[#76b5a9] transition duration-300"
          >
            Apply Now
          </button>
        </div>

        {/* Back Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition duration-300"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;