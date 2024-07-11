// src/pages/FoodDatabasePage.js
import React, { useEffect, useState } from 'react';
import { fetchFoods } from '../../api/apiService';

function FoodDatabasePage() {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchFoods();
                setFoods(data);
            } catch (error) {
                console.log('Error fetching food data:', error);
            }
        };

        loadData();
    }, []);

    return (
        <div>
            <h1>Food Database</h1>
            <ul>
                {foods.map(food => (
                    <li key={food.id}>{food.name} - {food.calories} calories</li>
                ))}

            </ul>
        </div>
    );
}

export default FoodDatabasePage;

