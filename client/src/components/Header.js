// In src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <nav style={{fontWeight:"bold", color:"#9370DB", margin:100,  textAlign:"center", display:"flex", justifyContent: "space-between"}}>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/meal-tracker">Meal Tracker</Link>
                <Link to="/exercise-tracker">Exercise Tracker</Link>
                <Link to="/fitness-plan">Fitness Plan</Link>
                <Link to="/nutrition-education">Nutrition Education</Link>
                <Link to="/food-database">Food Database</Link>
                <Link to="/login">Login</Link>
                {/* Add other links as needed */}
            </nav>
        </header>
    );
}

export default Header;
