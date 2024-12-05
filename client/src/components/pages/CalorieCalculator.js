import React, { useState } from 'react';

const CalorieCalculator = () => {
    const [gender, setGender] = useState('male');
    const [weight, setWeight] = useState(''); // Weight in kg
    const [height, setHeight] = useState(''); // Height in cm
    const [age, setAge] = useState(''); // Age in years
    const [activity, setActivity] = useState(1.2); // Default activity level
    const [calories, setCalories] = useState(null);

    // BMR Calculation based on the Mifflin-St Jeor formula
    const calculateBMR = () => {
        const weightInKg = parseFloat(weight);
        const heightInCm = parseFloat(height);
        const ageInYears = parseFloat(age);

        let BMR;
        if (gender === 'male') {
            BMR = 10 * weightInKg + 6.25 * heightInCm - 5 * ageInYears + 5;
        } else {
            BMR = 10 * weightInKg + 6.25 * heightInCm - 5 * ageInYears - 161;
        }

        // Calculate total daily calories with activity factor
        const totalCalories = BMR * activity;
        setCalories(totalCalories.toFixed(2)); // Rounding to 2 decimal points
    };

    return (
        <div>
            <h1>Calorie Calculator</h1>
            <div>
                <label>Gender:</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            <div>
                <label>Weight (kg):</label>
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Enter weight in kg"
                />
            </div>

            <div>
                <label>Height (cm):</label>
                <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Enter height in cm"
                />
            </div>

            <div>
                <label>Age (years):</label>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter age in years"
                />
            </div>

            <div>
                <label>Activity Level:</label>
                <select value={activity} onChange={(e) => setActivity(parseFloat(e.target.value))}>
                    <option value={1.2}>Sedentary (little or no exercise)</option>
                    <option value={1.375}>Lightly active (light exercise)</option>
                    <option value={1.55}>Moderately active (moderate exercise)</option>
                    <option value={1.725}>Very active (hard exercise)</option>
                    <option value={1.9}>Super active (very hard exercise)</option>
                </select>
            </div>

            <button onClick={calculateBMR}>Calculate Calories</button>

            {calories && (
                <div>
                    <h2>Total Daily Calorie Requirement: {calories} kcal</h2>
                </div>
            )}
        </div>
    );
};

export default CalorieCalculator;
