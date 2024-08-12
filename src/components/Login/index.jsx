import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css'; // Import the CSS module


const LoginURL = import.meta.env.VITE_Login;


const LoginPage = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 30
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className={styles.loginContainer}> {/* Use the class from the module */}
      <h1 className={styles.heading}>Login</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Username:</label>
          <input type="text" ref={usernameRef} className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Password:</label>
          <input type="password" ref={passwordRef} className={styles.input} />
        </div>
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
