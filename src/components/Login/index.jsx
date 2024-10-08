import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Import the CSS module

const LoginURL = import.meta.env.VITE_Login; // Import the login URL from the environment variables

// Create a LoginPage component
const LoginPage = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use the navigate hook

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const expirationTime = 30 * 60 * 1000; // 30 minutes in milliseconds
      const timer = setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/login");
      }, expirationTime);
      return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!username) {
      setError("Username cannot be empty");
      return;
    }

    if (!password) {
      setError("Password cannot be empty");
      return;
    }

    try {
      const response = await fetch(LoginURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 30, // Set the expiration time to 30 minutes
        }),
      });

      const data = await response.json(); // Parse the JSON response

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="loginContainer">
      {/* Use the class from the module */}
      <h1 className="heading">Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label className="label">Username:</label>
          <input type="text" ref={usernameRef} className="input" />
        </div>
        <div className="formGroup">
          <label className="label">Password:</label>
          <input type="password" ref={passwordRef} className="input" />
        </div>
        <button type="submit" className="button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
