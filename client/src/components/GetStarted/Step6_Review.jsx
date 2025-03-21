import { useLocation, useNavigate } from "react-router-dom";

const Step6= () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    disabilities = [],
    skills = [],
    jobType = [],
    location: userLocation = "",
    salary = "",
  } = location.state || {};

  const handleEdit = (step) => {
    navigate(step, {
      state: {
        disabilities,
        skills,
        jobType,
        location: userLocation,
        salary,
        fromReview: true, 
      },
    });
  };

  const handleConfirm = () => {
    navigate("/job_recommendations", {
      state: { disabilities, skills, jobType, location: userLocation, salary },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#205781] to-[#F6F8D5] text-white px-6">
      <div className="bg-white text-gray-900 rounded-lg shadow-lg p-6 w-full max-w-2xl animate-fadeIn">
        <h2 className="text-3xl font-semibold text-center text-[#205781]">Step 6: Review Your Selections</h2>

        <div className="mt-4 space-y-4">
          {[ 
            { label: "Disabilities", value: disabilities.length ? disabilities.join(", ") : "Not specified", step: "/step1_disability" },
            { label: "Skills", value: skills.length ? skills.join(", ") : "Not specified", step: "/step2_skills" },
            { label: "Job Type", value: jobType.length ? jobType.join(", ") : "Not specified", step: "/step3_jobtype" },
            { label: "Location", value: userLocation || "Not specified", step: "/step4_location" },
            { label: "Expected CTC (LPA)", value: salary || "Not specified", step: "/step5_salary" },
          ].map((item, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold text-[#205781]">{item.label}:</p>
                <p className={`text-gray-700 ${item.value === "Not specified" ? "italic text-red-500" : ""}`}>{item.value}</p>
              </div>
              <button 
                onClick={() => handleEdit(item.step)} 
                className="px-4 py-2 text-sm bg-[#4F959D] text-white rounded-lg hover:bg-[#76b5a9] transition"
              >
                Edit
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-lg font-semibold bg-gray-400 text-white hover:bg-gray-500 transition"
          >
            Back
          </button>

          <button
            onClick={handleConfirm}
            className="px-6 py-3 rounded-lg font-semibold bg-[#4F959D] text-white hover:bg-[#76b5a9] transition"
          >
            Confirm & Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step6;