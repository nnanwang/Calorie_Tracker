// src/api/apiService.js
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

export { fetchFoods };
