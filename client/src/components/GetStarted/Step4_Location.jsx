import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const locations = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune",
  "Jaipur", "Ahmedabad", "Surat", "Lucknow", "Kanpur", "Nagpur", "Indore",
  "Thane", "Bhopal", "Visakhapatnam", "Patna", "Vadodara", "Ghaziabad",
  "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Varanasi",
  "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Jodhpur",
  "Raipur", "Kota", "Guwahati", "Chandigarh", "Noida", "Dehradun",
  "Andaman and Nicobar Islands", "Chandigarh", "Delhi", "Puducherry", "Ladakh", "Jammu and Kashmir"
];

const Step4 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const previousState = location.state || {};
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(previousState.location || "");

  useEffect(() => {
    if (previousState.location) {
      setSelectedLocation(previousState.location);
    }
  }, [previousState.location]);

  const handleNext = () => {
    navigate(previousState.fromReview ? "/step6_review" : "/step5_salary", {
      state: { ...previousState, location: selectedLocation },
    });
  };

  const filteredLocations = locations.filter(loc =>
    loc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#205781] to-[#F6F8D5] text-white px-6">
      <div className="bg-white text-gray-900 rounded-lg shadow-lg p-6 w-full max-w-2xl animate-fadeIn">
        <h2 className="text-3xl font-semibold text-center text-[#205781]">Step 4: Select Your Location</h2>
        
        {[ 
          { label: "Disabilities", value: previousState.disabilities?.length ? previousState.disabilities.join(", ") : "Not specified" },
          { label: "Skills", value: previousState.skills?.length ? previousState.skills.join(", ") : "Not specified" },
          { label: "Job Type", value: previousState.jobType?.length ? previousState.jobType.join(", ") : "Not specified" }
        ].map((item, index) => (
          <div key={index} className="mt-4 bg-gray-100 p-3 rounded-lg border border-gray-300">
            <h3 className="text-lg font-semibold text-[#4F959D]">{item.label}:</h3>
            <p className={`text-gray-900 ${item.value === "Not specified" ? "italic text-red-500" : ""}`}>{item.value}</p>
          </div>
        ))}

        <input
          type="text"
          placeholder="Search location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mt-4 border border-gray-300 rounded-lg focus:ring-[#4F959D] focus:border-[#4F959D]"
        />

        <div className="mt-4 space-y-4 max-h-96 overflow-auto p-2 border border-gray-300 rounded-lg">
          {filteredLocations.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {filteredLocations.map((loc) => (
                <label
                  key={loc}
                  className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition"
                >
                  <input
                    type="radio"
                    name="location"
                    value={loc}
                    checked={selectedLocation === loc}
                    onChange={() => setSelectedLocation(loc)}
                    className="w-4 h-4 text-[#4F959D] focus:ring-[#4F959D]"
                  />
                  <span className="text-gray-900">{loc}</span>
                </label>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No results found</p>
          )}
        </div>

        {selectedLocation && (
          <p className="text-center text-[#205781] font-semibold mt-4">
            Selected Location: {selectedLocation}
          </p>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setSelectedLocation("")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedLocation
                ? "bg-[#4F959D] text-white hover:bg-[#76b5a9]"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            disabled={!selectedLocation}
          >
            Clear Selection
          </button>

          <button
            onClick={handleNext}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedLocation
                ? "bg-[#4F959D] text-white hover:bg-[#76b5a9]"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            disabled={!selectedLocation}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4;
  