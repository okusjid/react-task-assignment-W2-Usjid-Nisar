import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Logout.module.css'; // Import the CSS module

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className={styles.logoutButton}>
      Logout
    </button>
  );
};

export default Logout;
