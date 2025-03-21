import React, { useState } from "react";

const ProfilePicture = () => {
  const [image, setImage] = useState("https://via.placeholder.com/150");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-32 h-32 mx-auto">
      <img
        src={image}
        alt="Profile"
        className="w-full h-full rounded-full object-cover"
      />
      <label
        className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer shadow-md"
        style={{ backgroundColor: "var(--accent)" }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </label>
    </div>
  );
};

export default ProfilePicture;