import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const skills = [...new Set([
  "Deep Learning", "Python", "Data Visualization", "Digital Art", "Sketching", "Painting",
  "Content Writing", "Social Media Marketing", "Subject Expertise", "Public Speaking", "Budgeting",
  "Branding", "Case Analysis", "Legal Documentation", "Negotiation", "Excel", "Financial Modeling",
  "Crisis Management", "Media Relations", "Nutrition", "Editing", "SEO", "Multilingual",
  "Fitness Training", "Research", "Technical Documentation", "Attention to Detail", "Typing Speed",
  "Copywriting", "Google Analytics", "Motivation", "Exercise Science", "Payroll Management",
  "Employee Engagement", "Project Planning", "Agile Methodology", "Risk Management", "Java",
  "JavaScript", "Report Writing", "Counseling", "Store Management", "Typography", "Medical Knowledge",
  "Drug Dispensing", "Patient Consultation", "Tactics", "Team Management", "TensorFlow",
  "Machine Learning", "Recruitment", "History Knowledge", "Music Composition", "Therapy",
  "Mental Health Support", "CRM", "Communication", "Conflict Resolution", "Customer Relations",
  "Sales Strategy", "SEO Strategy", "Keyword Research", "Project Management",
  "UI/UX", "Network Security", "Event Coordination", "Vendor Management", "Ethical Hacking",
  "First Aid", "Medical Terminology", "Classroom Management", "AutoCAD", "Illustrator",
  "Photoshop", "Instrument Proficiency", "Performance", "Risk Assessment"
])];

const Step2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const disabilities = location.state?.disabilities || [];
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [customSkill, setCustomSkill] = useState("");

  const handleSkillClick = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleClear = () => {
    setSelectedSkills([]);
    setCustomSkill("");
  };

  const handleNext = () => {
    if (selectedSkills.length || customSkill.trim()) {
      navigate("/step3_jobtype", { state: { disabilities, skills: [...selectedSkills, customSkill].filter(Boolean) } });
    }
  };

  const filteredSkills = skills.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#205781] to-[#F6F8D5] text-white px-6">
      <div className="bg-white text-gray-900 rounded-lg shadow-lg p-6 w-full max-w-2xl animate-fadeIn">
        <h2 className="text-3xl font-semibold text-center text-[#205781]">Step 2: Select Your Skills</h2>
        <p className="text-center text-gray-600 mt-2">Disabilities Selected: {disabilities.join(", ")}</p>
        
        <input
          type="text"
          placeholder="Search skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mt-4 border border-gray-300 rounded-lg focus:ring-[#4F959D] focus:border-[#4F959D]"
        />
        
        <div className="mt-4 space-y-4 max-h-96 overflow-auto p-2 border border-gray-300 rounded-lg">
          {filteredSkills.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {filteredSkills.map((skill) => (
                <label
                  key={skill}
                  className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition"
                >
                  <input
                    type="checkbox"
                    value={skill}
                    checked={selectedSkills.includes(skill)}
                    onChange={() => handleSkillClick(skill)}
                    className="w-4 h-4 text-[#4F959D] focus:ring-[#4F959D]"
                  />
                  <span className="text-gray-900">{skill}</span>
                </label>
              ))}
            </div>
          ) : (
            <div className="text-center mt-4">
              <p className="text-gray-600">No skills found. Enter your skill below:</p>
              <input
                type="text"
                placeholder="Enter your skill"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:ring-[#4F959D] focus:border-[#4F959D]"
              />
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleClear}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedSkills.length || customSkill.trim()
                ? "bg-[#4F959D] text-white hover:bg-[#76b5a9]"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            Clear Selection
          </button>

          <button
            onClick={handleNext}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedSkills.length || customSkill.trim()
                ? "bg-[#4F959D] text-white hover:bg-[#76b5a9]"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            disabled={!selectedSkills.length && !customSkill.trim()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2;
