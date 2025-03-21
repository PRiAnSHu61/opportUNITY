import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const skillsCategories = {
  "Technical Skills": ["Deep Learning", "Python", "Java", "JavaScript", "TensorFlow", "Machine Learning", "UI/UX", "Network Security", "AutoCAD", "Illustrator", "Photoshop"],
  "Soft Skills": ["Public Speaking", "Negotiation", "Team Management", "Communication", "Conflict Resolution", "Motivation"],
  "Marketing & Writing": ["Content Writing", "SEO", "Copywriting", "Google Analytics", "Branding", "Sales Strategy", "Keyword Research"],
  "Finance & Business": ["Budgeting", "Financial Modeling", "Project Management", "Risk Management", "Payroll Management", "Case Analysis"],
  "Medical & Health": ["Medical Knowledge", "Patient Consultation", "First Aid", "Nutrition", "Exercise Science", "Mental Health Support", "Therapy"],
};

const Step2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousState = location.state || {};

  const [selectedSkills, setSelectedSkills] = useState(previousState.skills || []);
  const isEditing = previousState.fromReview || false;

  useEffect(() => {
    if (previousState.skills) {
      setSelectedSkills(previousState.skills);
    }
  }, [previousState.skills]);

  const handleSelection = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((item) => item !== skill) : [...prev, skill]
    );
  };

  const handleClear = () => setSelectedSkills([]);

  const handleNext = () => {
    navigate(isEditing ? "/step6_review" : "/step3_jobtype", {
      state: {
        ...previousState,
        skills: selectedSkills,
        fromReview: isEditing,
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#205781] to-[#F6F8D5] text-white px-6">
      <div className="bg-white text-gray-900 rounded-lg shadow-lg p-6 w-full max-w-2xl animate-fadeIn">
        <h2 className="text-3xl font-semibold text-center text-[#205781]">{isEditing ? "Edit Skills" : "Step 2: Select Your Skills"}</h2>

        {previousState.disabilities && previousState.disabilities.length > 0 && (
          <div className="mt-4 bg-gray-100 p-3 rounded-lg border border-gray-300">
            <h3 className="text-lg font-semibold text-[#4F959D]">Selected Disabilities:</h3>
            <p className="text-gray-900">{previousState.disabilities.join(", ")}</p>
          </div>
        )}

        {selectedSkills.length > 0 && (
          <div className="mt-4 bg-gray-100 p-3 rounded-lg border border-gray-300">
            <h3 className="text-lg font-semibold text-[#4F959D]">Selected Skills:</h3>
            <p className="text-gray-900">{selectedSkills.join(", ")}</p>
          </div>
        )}

        <div className="mt-6 space-y-4 max-h-96 overflow-auto p-2 border border-gray-300 rounded-lg">
          {Object.entries(skillsCategories).map(([category, skills]) => (
            <div key={category} className="mb-3">
              <h3 className="text-lg font-semibold text-[#4F959D]">{category}</h3>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {skills.map((skill) => (
                  <label key={skill} className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                    <input
                      type="checkbox"
                      value={skill}
                      checked={selectedSkills.includes(skill)}
                      onChange={() => handleSelection(skill)}
                      className="w-4 h-4 text-[#4F959D] focus:ring-[#4F959D]"
                    />
                    <span className="text-gray-900">{skill}</span>
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
              selectedSkills.length ? "bg-[#4F959D] text-white hover:bg-[#76b5a9]" : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            Clear Selection
          </button>

          <button
            onClick={handleNext}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedSkills.length ? "bg-[#4F959D] text-white hover:bg-[#76b5a9]" : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            disabled={!selectedSkills.length}
          >
            {isEditing ? "Save Changes" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2;