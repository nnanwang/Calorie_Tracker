// src/components/SearchNutrition.js
import React, { useState } from 'react';
import axios from 'axios';

const SearchFoodNutrition = () => {
    const [searchQuery, setSearchQuery] = useState(''); // Store the search query
    const [filteredFoods, setFilteredFoods] = useState([]); // Store the filtered foods
    const [loading, setLoading] = useState(false); // Track loading state
    const [error, setError] = useState(null); // Track errors

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // Update the search query state
    };

    // Handle search button click
    const handleSearch = async () => {
        if (!searchQuery) return; // Do nothing if the search query is empty

        setLoading(true); // Show loading
        setError(null); // Clear any previous errors

        try {
            const response = await axios.get(`http://localhost:5000/api/food-nutritions?q=${searchQuery}`); // Send query to the backend
            const data = response.data;

            setFilteredFoods(data); // Update the filtered foods list
        } catch (err) {
            setError('Failed to fetch food data'); // Handle errors
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div>
            <h1>Search Food Nutrition</h1>
            <input
                type="text"
                placeholder="Enter part of the food name"
                value={searchQuery}
                onChange={handleSearchChange} // Update the search query as the user types
            />
            <button onClick={handleSearch}>Search</button>

            {loading && <p>Loading...</p>}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {filteredFoods.length > 0 && (
                <div>
                    <h2>Search Results</h2>
                    <p>(Nutrition per 100g)</p>
                    <ul>
                        {filteredFoods.map((food, index) => {
                            const nutrition = food.nutrition || {}; // Provide a fallback if nutrition is undefined
                            return (
                                <li key={index}>
                                    <h3>{food.name}</h3>
                                    <ul>
                                        <li>Energy: {nutrition.energy ?? 'No data'} kJ</li>
                                        <li>Protein: {nutrition.protein ?? 'No data'} g</li>
                                        <li>Fat: {nutrition.fat ?? 'No data'} g</li>
                                        <li>Saturated Fat: {nutrition['saturated-fat'] ?? 'No data'} g</li>
                                        <li>Carbohydrate: {nutrition.carbohydrate ?? 'No data'} g</li>
                                        <li>Sugars: {nutrition.sugars ?? 'No data'} g</li>
                                        <li>Dietary Fibre: {nutrition['dietary-fibre'] ?? 'No data'} g</li>
                                        <li>Sodium: {nutrition.sodium ?? 'No data'} mg</li>
                                    </ul>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchFoodNutrition;
