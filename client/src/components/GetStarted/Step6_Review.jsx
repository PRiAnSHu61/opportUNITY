import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const Step6_Review = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    disabilities = [],
    skills = [],
    jobType = [],
    location: userLocation = "",
    salary = "",
  } = location.state || {};

  const handleConfirm = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      setError("");

      // Save `getStarted: true` in Firestore
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, { getStarted: true });

      // Prepare data for job recommendations
      const userInputs = {
        disability: disabilities,
        skills,
        work_mode: jobType,
        location: userLocation
      };

      console.log("Sending data to backend:", userInputs);

      // Call job recommendation API
      const response = await axios.post(
        "http://127.0.0.1:5001/api/recommend_jobs",
        userInputs,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("API Response:", response.data);

      // Navigate to job recommendations with user data
      navigate("/job_recommendations", { state: { userData: userInputs } });

    } catch (error) {
      console.error("Error:", error);
      setError("Failed to complete setup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#205781] to-[#F6F8D5] text-white px-6">
      <div className="bg-white text-gray-900 rounded-lg shadow-lg p-6 w-full max-w-2xl animate-fadeIn">
        <h2 className="text-3xl font-semibold text-center text-[#205781]">Step 6: Review Your Selections</h2>

        <div className="mt-4 space-y-4">
          {[
            { label: "Disabilities", value: disabilities.join(", ") || "Not specified", editPath: "/step1_disability" },
            { label: "Skills", value: skills.join(", ") || "Not specified", editPath: "/step2_skills" },
            { label: "Job Type", value: jobType.join(", ") || "Not specified", editPath: "/step3_jobtype" },
            { label: "Location", value: userLocation || "Not specified", editPath: "/step4_location" },
            { label: "Expected CTC (LPA)", value: salary || "Not specified", editPath: "/step5_salary" },
          ].map((item, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold text-[#205781]">{item.label}:</p>
                <p className="text-gray-700">{item.value}</p>
              </div>
              <button
                onClick={() => navigate(item.editPath, { state: location.state })}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
            </div>
          ))}
        </div>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        <div className="flex justify-between mt-6">
          <button onClick={() => navigate(-1)} className="px-6 py-3 rounded-lg font-semibold bg-gray-400 text-white hover:bg-gray-500 transition">
            Back
          </button>

          <button
            onClick={handleConfirm}
            className="px-6 py-3 rounded-lg font-semibold bg-[#4F959D] text-white hover:bg-[#76b5a9] transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "Confirm & Proceed"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step6_Review;
