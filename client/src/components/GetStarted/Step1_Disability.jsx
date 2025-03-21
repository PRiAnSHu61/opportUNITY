import { useState } from "react";
import { useNavigate } from "react-router-dom";

const disabilityCategories = {
  "Visual Impairment": ["Blind", "Visually Impaired", "Low Vision", "Legally Blind", "Color Blindness", "Tunnel Vision"],
  "Hearing Impairment": ["Deaf", "Hard of Hearing", "Hearing Loss", "Partially Deaf", "Auditory Processing Disorder", "Tinnitus"],
  "Physical Disability": ["Wheelchair User", "Paralyzed", "Mobility Impairment", "Amputee", "Cerebral Palsy", "Spinal Cord Injury"],
  "Cognitive Impairment": ["Learning Disability", "Dyscalculia", "Intellectual Disability", "Slow Learner", "Down Syndrome", "Memory Impairment"],
  "Speech Impairment": ["Mute", "Speech Disorder", "Stammering", "Stuttering", "Aphasia", "Selective Mutism"],
  "Mental Health Condition": ["Depression", "Anxiety", "Bipolar", "Schizophrenia", "PTSD", "OCD"],
  "Chronic Illness": ["Fibromyalgia", "Chronic Fatigue", "Diabetes", "Lupus", "Crohn's Disease", "Irritable Bowel Syndrome"]
};

const Step1 = () => {
  const [selectedDisabilities, setSelectedDisabilities] = useState([]);
  const navigate = useNavigate();

  const handleSelection = (disability) => {
    setSelectedDisabilities((prev) =>
      prev.includes(disability)
        ? prev.filter((item) => item !== disability)
        : [...prev, disability]
    );
  };

  const handleClear = () => {
    setSelectedDisabilities([]); 
  };

  const handleNext = () => {
    if (selectedDisabilities.length) {
      navigate("/step2_skills", { state: { disabilities: selectedDisabilities } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#205781] to-[#F6F8D5] text-white px-6">
      <div className="bg-white text-gray-900 rounded-lg shadow-lg p-6 w-full max-w-2xl animate-fadeIn">
        <h2 className="text-3xl font-semibold text-center text-[#205781]">Step 1: Select Your Disability</h2>

        <div className="mt-6 space-y-4 max-h-96 overflow-auto p-2 border border-gray-300 rounded-lg">
          {Object.entries(disabilityCategories).map(([category, disabilities]) => (
            <div key={category} className="mb-3">
              <h3 className="text-lg font-semibold text-[#4F959D]">{category}</h3>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {disabilities.map((disability) => (
                  <label key={disability} className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                    <input
                      type="checkbox"
                      value={disability}
                      checked={selectedDisabilities.includes(disability)}
                      onChange={() => handleSelection(disability)}
                      className="w-4 h-4 text-[#4F959D] focus:ring-[#4F959D]"
                    />
                    <span className="text-gray-900">{disability}</span>
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
              selectedDisabilities.length
                ? "bg-[#4F959D] text-white hover:bg-[#76b5a9]"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            Clear Selection
          </button>

          <button
            onClick={handleNext}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedDisabilities.length
                ? "bg-[#4F959D] text-white hover:bg-[#76b5a9]"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            disabled={!selectedDisabilities.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1;
