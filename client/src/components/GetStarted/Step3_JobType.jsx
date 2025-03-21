import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const jobCategories = {
  "Employment Type": ["Full-Time", "Part-Time", "Freelance", "Internship"],
  "Work Location": ["Remote", "On-Site"]
};

const Step3 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousState = location.state || {};

  const [selectedJobTypes, setSelectedJobTypes] = useState(previousState.jobType || []);
  const isEditing = previousState.fromReview || false;

  useEffect(() => {
    if (previousState.jobType && previousState.jobType.length) {
      setSelectedJobTypes(previousState.jobType);
    }
  }, [previousState.jobType]);

  const handleSelection = (jobType) => {
    setSelectedJobTypes((prev) =>
      prev.includes(jobType) ? prev.filter((item) => item !== jobType) : [...prev, jobType]
    );
  };

  const handleClear = () => setSelectedJobTypes([]);

  const handleNext = () => {
    navigate(isEditing ? "/step6_review" : "/step4_location", {
      state: {
        ...previousState,
        jobType: selectedJobTypes,
        fromReview: isEditing,
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#205781] to-[#F6F8D5] text-white px-6">
      <div className="bg-white text-gray-900 rounded-lg shadow-lg p-6 w-full max-w-2xl animate-fadeIn">
        <h2 className="text-3xl font-semibold text-center text-[#205781]">{isEditing ? "Edit Job Type Selection" : "Step 3: Select Your Preferred Job Type"}</h2>

        {[ 
          { label: "Disabilities", value: previousState.disabilities?.length ? previousState.disabilities.join(", ") : "Not specified" },
          { label: "Skills", value: previousState.skills?.length ? previousState.skills.join(", ") : "Not specified" },
        ].map((item, index) => (
          <div key={index} className="mt-4 bg-gray-100 p-3 rounded-lg border border-gray-300">
            <h3 className="text-lg font-semibold text-[#4F959D]">{item.label}:</h3>
            <p className={`text-gray-900 ${item.value === "Not specified" ? "italic text-red-500" : ""}`}>{item.value}</p>
          </div>
        ))}

        {selectedJobTypes.length > 0 && (
          <div className="mt-4 bg-gray-100 p-3 rounded-lg border border-gray-300">
            <h3 className="text-lg font-semibold text-[#4F959D]">Selected Job Types:</h3>
            <p className="text-gray-900">{selectedJobTypes.join(", ")}</p>
          </div>
        )}

        <div className="mt-6 space-y-4 max-h-96 overflow-auto p-2 border border-gray-300 rounded-lg">
          {Object.entries(jobCategories).map(([category, jobTypes]) => (
            <div key={category} className="mb-3">
              <h3 className="text-lg font-semibold text-[#4F959D]">{category}</h3>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {jobTypes.map((jobType) => (
                  <label key={jobType} className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                    <input
                      type="checkbox"
                      value={jobType}
                      checked={selectedJobTypes.includes(jobType)}
                      onChange={() => handleSelection(jobType)}
                      className="w-4 h-4 text-[#4F959D] focus:ring-[#4F959D]"
                    />
                    <span className="text-gray-900">{jobType}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleClear}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedJobTypes.length ? "bg-[#4F959D] text-white hover:bg-[#76b5a9]" : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            Clear Selection
          </button>

          <button
            onClick={handleNext}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedJobTypes.length ? "bg-[#4F959D] text-white hover:bg-[#76b5a9]" : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            disabled={!selectedJobTypes.length}
          >
            {isEditing ? "Save Changes" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3;
