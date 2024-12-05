// src/components/SearchFood.js
import React, { useState } from 'react';
import { fetchFoods } from '../../api/apiService';

const SearchFood = () => {
    const [searchQuery, setSearchQuery] = useState(''); // Store the search query
    const [filteredFoods, setFilteredFoods] = useState([]); // Store the filtered foods based on search
    const [isSearched, setIsSearched] = useState(false); // Track whether the user has searched
    const [loading, setLoading] = useState(false); // Track loading state
    const [error, setError] = useState(null); // Track errors

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // Update the search query
    };

    // Handle search button click
    const handleSearch = async () => {
        if (!searchQuery) return; // Do nothing if the search query is empty

        setLoading(true); // Show loading indicator
        setError(null); // Clear any previous errors

        try {
            const data = await fetchFoods(); // Fetch all food data from the API

            // Filter the foods based on the search query
            const filtered = data.filter((food) =>
                food.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

            setFilteredFoods(filtered); // Update the filtered foods list
            setIsSearched(true); // Mark that a search has been performed
        } catch (err) {
            setError('Failed to fetch food data.'); // Handle errors
        } finally {
            setLoading(false); // Stop loading indicator
        }
    };

    return (
        <div>
            <h1>Search Food Calories</h1>

            <input
                type="text"
                placeholder="Enter food name"
                value={searchQuery}
                onChange={handleSearchChange} // Update the search query as the user types
            />
            <button onClick={handleSearch}>Search</button>

            {/* Show loading state */}
            {loading && <p>Loading...</p>}

            {/* Show error message if there's an error */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Display search results only after a search has been performed */}
            {isSearched && (
                <div>
                    {filteredFoods.length > 0 ? (
                        <ul>
                            {filteredFoods.map((food) => (
                                <li key={food.id}>
                                    {food.name} - {food.calories} calories
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No foods found for "{searchQuery}"</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchFood;
