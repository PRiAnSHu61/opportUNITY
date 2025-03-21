import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const jobTypes = [
  "Full-Time", "Part-Time", "Freelance", "Internship", "Remote", "On-Site"
];

const Step3 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { disabilities, skills } = location.state || { disabilities: [], skills: [] };
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);

  const handleJobTypeClick = (jobType) => {
    setSelectedJobTypes((prev) =>
      prev.includes(jobType) ? prev.filter((j) => j !== jobType) : [...prev, jobType]
    );
  };

  const handleClear = () => {
    setSelectedJobTypes([]);
  };

  const handleNext = () => {
    if (selectedJobTypes.length) {
      navigate("/step4_location", { state: { disabilities, skills, jobTypes: selectedJobTypes } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#205781] to-[#F6F8D5] text-white px-6">
      <div className="bg-white text-gray-900 rounded-lg shadow-lg p-6 w-full max-w-2xl animate-fadeIn">
        <h2 className="text-3xl font-semibold text-center text-[#205781]">Step 3: Select Your Preferred Job Type</h2>
        <p className="text-center text-gray-600 mt-2">Skills Selected: {skills.join(", ")}</p>

        <div className="mt-6 space-y-4 max-h-96 overflow-auto p-2 border border-gray-300 rounded-lg">
          <div className="grid grid-cols-2 gap-3">
            {jobTypes.map((jobType) => (
              <label
                key={jobType}
                className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition"
              >
                <input
                  type="checkbox"
                  value={jobType}
                  checked={selectedJobTypes.includes(jobType)}
                  onChange={() => handleJobTypeClick(jobType)}
                  className="w-4 h-4 text-[#4F959D] focus:ring-[#4F959D]"
                />
                <span className="text-gray-900">{jobType}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleClear}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedJobTypes.length
                ? "bg-[#4F959D] text-white hover:bg-[#76b5a9]"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            Clear Selection
          </button>

          <button
            onClick={handleNext}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedJobTypes.length
                ? "bg-[#4F959D] text-white hover:bg-[#76b5a9]"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            disabled={!selectedJobTypes.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3;
