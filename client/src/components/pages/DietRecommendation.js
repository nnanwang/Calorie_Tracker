import React, { useState } from 'react';
import axios from 'axios';
import open_api_key from '../open_api_key';

const DietRecommendation = () => {
    const [foodItems, setFoodItems] = useState('');
    const [dietSuggestions, setDietSuggestions] = useState('');
    const [loading, setLoading] = useState(false);

    const getDietSuggestions = async () => {
        setLoading(true);
        setDietSuggestions('');

        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: "gpt-3.5-turbo",
                    messages: [{
                        role: "user",
                        content: `Suggest some diet recommendations based on these food items: "${foodItems}"`
                    }],
                    temperature: 0.7,
                    max_tokens: 150,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${open_api_key}`
                    },
                }
            );

            setDietSuggestions(response.data.choices[0].message.content);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setDietSuggestions('Failed to get diet suggestions. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Diet Recommendations</h1>
            <label>
                Enter food items (comma separated):
                <input
                    type="text"
                    onChange={e => setFoodItems(e.target.value)}
                    value={foodItems}
                    placeholder="Type food items..."
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                            getDietSuggestions();
                        }
                    }}
                />
            </label>

            <button
                onClick={getDietSuggestions}
                disabled={loading}
            >
                {loading ? 'Searching...' : 'Get Diet Suggestion'}
            </button>

            {dietSuggestions && (
                <div>
                    <h2>Diet Suggestions:</h2>
                    <p>{dietSuggestions}</p>
                </div>
            )}
        </div>
    );
}

export default DietRecommendation;