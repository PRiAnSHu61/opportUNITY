import React, { useState } from "react";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    alert("Password changed successfully!");
  };

  return (
    <div>
      <button
        className="px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300"
        style={{ backgroundColor: "var(--primary)", color: "white" }}
      >
        Change Password
      </button>
    </div>
  );
};

export default ChangePassword;