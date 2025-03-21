import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const salaryOptions = [
  "Below 2 LPA", "2 - 4 LPA", "4 - 6 LPA",
  "6 - 8 LPA", "8 - 10 LPA", "10 - 15 LPA",
  "15 - 20 LPA", "Above 20 LPA"
];

const Step5 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousState = location.state || {};

  const [selectedSalary, setSelectedSalary] = useState(previousState.salary || "");
  const isEditing = previousState.fromReview || false;

  const handleSelection = (salary) => {
    setSelectedSalary(salary);
  };

  const handleNext = () => {
    navigate(isEditing ? "/step6_review" : "/step6_review", {
      state: {
        ...previousState,
        salary: selectedSalary,
        fromReview: isEditing,
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#205781] to-[#F6F8D5] text-white px-6">
      <div className="bg-white text-gray-900 rounded-lg shadow-lg p-6 w-full max-w-2xl animate-fadeIn">
        <h2 className="text-3xl font-semibold text-center text-[#205781]">{isEditing ? "Edit Expected CTC" : "Step 5: Expected CTC (LPA)"}</h2>

        <div className="mt-4 bg-gray-100 p-3 rounded-lg border border-gray-300">
          <h3 className="text-lg font-semibold text-[#4F959D]">Selected Information:</h3>
          <p className="text-gray-900"><strong>Disabilities:</strong> {previousState.disabilities?.join(", ") || "None"}</p>
          <p className="text-gray-900"><strong>Skills:</strong> {previousState.skills?.join(", ") || "None"}</p>
          <p className="text-gray-900"><strong>Job Type:</strong> {previousState.jobType?.join(", ") || "None"}</p>
          <p className="text-gray-900"><strong>Location:</strong> {previousState.location || "Not selected"}</p>
        </div>

        {selectedSalary && (
          <div className="mt-4 bg-gray-100 p-3 rounded-lg border border-gray-300">
            <h3 className="text-lg font-semibold text-[#4F959D]">Selected Salary:</h3>
            <p className="text-gray-900">{selectedSalary}</p>
          </div>
        )}

        <div className="mt-6 space-y-4 max-h-96 overflow-auto p-2 border border-gray-300 rounded-lg">
          {salaryOptions.map((salary) => (
            <label key={salary} className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition">
              <input
                type="radio"
                name="salary"
                value={salary}
                checked={selectedSalary === salary}
                onChange={() => handleSelection(salary)}
                className="w-4 h-4 text-[#4F959D] focus:ring-[#4F959D]"
              />
              <span className="text-gray-900">{salary}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleNext}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedSalary ? "bg-[#4F959D] text-white hover:bg-[#76b5a9]" : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            disabled={!selectedSalary}
          >
            {isEditing ? "Save Changes" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step5;
