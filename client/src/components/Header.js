// In src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css'; // Import the CSS file

function Header({ isAuthenticated, user, setAuth }) {
  const handleLogout = () => {
    setAuth(false, null);
  };

  return (
    <header>
      <nav className="nav-left">
        <Link to="/">Calorie Tracker</Link>
        <Link to="/diet-recommendation">Diet Recommendation</Link>
        <Link to="/fitness-plan">Fitness Plan</Link>
        <Link to="/search-food-nutritions">Search Food Nutrition</Link>
              <Link to="/calorie-calculator">Calorie Calculator</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/login">Login/Register</Link>
              
        {/* Add other links as needed */}
      </nav>
    </header>
  );
}

export default Header;

