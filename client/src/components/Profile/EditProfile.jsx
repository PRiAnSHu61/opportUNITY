// src/components/Profile/EditProfile.jsx
import React, { useState } from "react";

const EditProfile = () => {
  const [bio, setBio] = useState("I am a passionate software engineer with 5+ years of experience.");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("+123 456 7890");

  const handleSave = () => {
    alert("Profile updated successfully!");
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium" style={{ color: "var(--primary)" }}>Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2"
          style={{ borderColor: "var(--secondary)", focus: { ringColor: "var(--accent)" } }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium" style={{ color: "var(--primary)" }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2"
          style={{ borderColor: "var(--secondary)", focus: { ringColor: "var(--accent)" } }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium" style={{ color: "var(--primary)" }}>Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2"
          style={{ borderColor: "var(--secondary)", focus: { ringColor: "var(--accent)" } }}
        />
      </div>
      <button
        onClick={handleSave}
        className="px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300"
        style={{ backgroundColor: "var(--accent)", color: "white" }}
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditProfile;