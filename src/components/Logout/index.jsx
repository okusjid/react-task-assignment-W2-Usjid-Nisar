import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css"; // Import the CSS module

// Create a Logout component
const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="logoutButton">
      Logout
    </button>
  );
};

export default Logout;
