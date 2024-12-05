// src/App.js
import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import Login from './components/pages/Login';
import ProfilePage from './components/pages/ProfilePage';
import FoodDatabasePage from './components/pages/FoodDatabasePage';
import MealTrackerPage from './components/pages/MealTrackerPage';
import ExerciseTrackerPage from './components/pages/ExerciseTrackerPage';
import FitnessPlanPage from './components/pages/FitnessPlanPage';
import NutritionEducationPage from './components/pages/NutritionEducationPage';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchFood from './components/pages/SearchFood';
import SearchFoodNutrition from './components/pages/SearchFoodNutrition';
import CalorieCalculator from './components/pages/CalorieCalculator';
import DietRecommendation from './components/pages/DietRecommendation';
import Register from './components/pages/Register';
import ProtectedRoute from './components/pages/ProtectedRoutes';
import axios from 'axios';

function App() {
  // State to manage authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  // State to store user data
  const [user, setUser] = useState(null);

  // Function to update authentication status and user data
  const setAuth = (authStatus) => {
    setIsAuthenticated(authStatus);
    if (!authStatus) {
      setUser(null);
      localStorage.removeItem('token');
    }
  };

  // Function to fetch user data from the backend
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.get('http://localhost:5000/api/users/profile', config);
      setUser(res.data.user);
    } catch (err) {
      console.error('Error fetching user data:', err);
      // Reset authentication state if token is invalid or expired
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('token');
    }
  };
  

  // useEffect hook to fetch user data when authentication status changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  return (
    <Router>

      <Header /> {/* Removed props from Header component */}

      <div >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProfilePage setAuth={setAuth} />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/food-database" element={<FoodDatabasePage />} />
          <Route path="/meal-tracker" element={<MealTrackerPage />} />
          <Route path="/exercise-tracker" element={<ExerciseTrackerPage />} />
          <Route path="/fitness-plan" element={<FitnessPlanPage />} />
          <Route path="/nutrition-education" element={<NutritionEducationPage />} />
          <Route path="/search-food" element={<SearchFood />} />
          <Route path="/search-food-nutritions" element={<SearchFoodNutrition />} />
          <Route path="/calorie-calculator" element={<CalorieCalculator />} />
          <Route path="/diet-recommendation" element={<DietRecommendation />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;


