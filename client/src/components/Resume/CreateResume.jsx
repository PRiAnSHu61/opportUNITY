import React, { useState } from "react";

const CreateResume = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    skills: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Resume Created:", formData);
    alert("Resume Created Successfully!");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--primary)" }}>Create Your Resume</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium" style={{ color: "var(--primary)" }}>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2"
            style={{ borderColor: "var(--secondary)", focus: { ringColor: "var(--accent)" } }}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium" style={{ color: "var(--primary)" }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2"
            style={{ borderColor: "var(--secondary)", focus: { ringColor: "var(--accent)" } }}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium" style={{ color: "var(--primary)" }}>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2"
            style={{ borderColor: "var(--secondary)", focus: { ringColor: "var(--accent)" } }}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium" style={{ color: "var(--primary)" }}>Education</label>
          <textarea
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2"
            style={{ borderColor: "var(--secondary)", focus: { ringColor: "var(--accent)" } }}
            rows="3"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium" style={{ color: "var(--primary)" }}>Experience</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2"
            style={{ borderColor: "var(--secondary)", focus: { ringColor: "var(--accent)" } }}
            rows="3"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium" style={{ color: "var(--primary)" }}>Skills</label>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2"
            style={{ borderColor: "var(--secondary)", focus: { ringColor: "var(--accent)" } }}
            rows="3"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white font-semibold rounded hover:bg-opacity-90 transition"
          style={{ backgroundColor: "var(--accent)" }}
        >
          Create Resume
        </button>
      </form>
    </div>
  );
};

export default CreateResume;