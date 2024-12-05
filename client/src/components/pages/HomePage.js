// In src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/HomePage.css'; // Adjust the path if necessary

function HomePage() {
  return (
    <div className="home-container">
      <div className="overlay"></div>
      <div className="content">
              <h1>Welcome to <br />
                  Calorie Tracker App!</h1>
        <p>Track your meals, exercises, and achieve your fitness goals.</p>
        <Link to="/register" className="cta-button">Get Started</Link>
      </div>
    </div>
  );
}

export default HomePage;
