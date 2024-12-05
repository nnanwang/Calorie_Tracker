// src/pages/FoodDatabasePage.js
import React, { useEffect, useState } from 'react';
import { fetchFoods } from '../../api/apiService';

function FoodDatabasePage() {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadFoods = async () => {
            try {
                const data = await fetchFoods();
                setFoods(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch food data');
                setLoading(false);
            }
        };

        loadFoods();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <ul>
            {foods.map((food) => (
                <li key={food.id}>
                    {food.name} - {food.calories} calories
                </li>
            ))}
        </ul>
    );
};


export default FoodDatabasePage;

