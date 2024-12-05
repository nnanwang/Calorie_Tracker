import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const fetchFoods = async () => {
    try {
        const response = await axios.get(`${API_URL}/foods`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch foods:', error);
        throw error;
    }
};

const fetchFitnessSuggestions = async (calories) => {
    try {
        const response = await fetch('http://localhost:5000/suggestions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ calories })  // Make sure calories is sent in the request body
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;  // Return the suggestions
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        throw error;
    }
};


export { fetchFoods, fetchFitnessSuggestions };
