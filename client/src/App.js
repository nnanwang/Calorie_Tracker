// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import ProfilePage from './components/pages/ProfilePage';
import FoodDatabasePage from './components/pages/FoodDatabasePage';
import MealTrackerPage from './components/pages/MealTrackerPage';
import ExerciseTrackerPage from './components/pages/ExerciseTrackerPage';
import FitnessPlanPage from './components/pages/FitnessPlanPage';
import NutritionEducationPage from './components/pages/NutritionEducationPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
      <Router>
        <h1 style={{
          textAlign: "center",
          marginTop: 50,
          marginBottom: -50,
          color: "#6A5ACD	"
        }}>
          Calorie Tracker App
        </h1>
        <Header />
        <div style={{margin:100, }}>
            <Routes >
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/food-database" element={<FoodDatabasePage />} />
                <Route path="/meal-tracker" element={<MealTrackerPage />} />
                <Route path="/exercise-tracker" element={<ExerciseTrackerPage />} />
                <Route path="/fitness-plan" element={<FitnessPlanPage />} />
                <Route path="/nutrition-education" element={<NutritionEducationPage />} />
          </Routes>
          </div>
            <Footer />
      </Router>
      
    );
}

export default App;

