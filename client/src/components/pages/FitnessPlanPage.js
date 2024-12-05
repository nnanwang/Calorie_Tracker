import React, { useState } from 'react';
import axios from 'axios';
import open_api_key from '../open_api_key';
import '../../css/FitnessPlan.css';

const FitnessPlan = () => {
    const [calorie, setCalorie] = useState(0);
    const [fitnessPlan, setFitnessPlan] = useState('');
    const [loading, setLoading] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
  
    const getFitnessPlan = async () => {
      setLoading(true);
      setFitnessPlan('');
      setSaveMessage('');
  
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'user',
                content: `Suggest a concise fitness plan based on the daily calorie: "${calorie}", please give me as bullet points and limit into 200 tokens.`,
              },
            ],
            temperature: 0.7,
            max_tokens: 200,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${open_api_key}`,
            },
          }
        );
  
        const generatedPlan = response.data.choices[0].message.content;
        setFitnessPlan(generatedPlan);
  
        // Save the generated plan to the backend
        await saveFitnessPlan(calorie, generatedPlan);
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        setFitnessPlan('Failed to get fitness suggestions. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
    // Function to save the fitness plan to the backend
    const saveFitnessPlan = async (calorie, plan) => {
      try {
        const token = localStorage.getItem('token');
  
        if (!token) {
          setSaveMessage('Please log in to save your fitness plan.');
          return;
        }
  
        const res = await axios.post(
          'http://localhost:5000/api/users/fitness-plan',
          { calorie, plan },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (res.data && res.data.message) {
          setSaveMessage(res.data.message);
        }
      } catch (err) {
        console.error('Error saving fitness plan:', err.response ? err.response.data : err.message);
        setSaveMessage('Failed to save fitness plan. Please try again.');
      }
    };
  
    // Function to split the fitness plan into individual rows based on new lines
    const splitToRows = (plan) => {
      return plan.split('\n').filter((item) => item.trim() !== '');
    };
  
    return (
      <div className="fitness-plan-container">
        <h1 className="title">Fitness Plan Recommendations</h1>
        <div className="input-section">
          <label className="calorie-label">Enter daily calorie intake:</label>
          <input
            type="text"
            onChange={(e) => setCalorie(e.target.value)}
            value={calorie}
            placeholder="Type calorie..."
            className="calorie-input"
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                getFitnessPlan();
              }
            }}
          />
          <button onClick={getFitnessPlan} disabled={loading} className="submit-button">
            {loading ? 'Searching...' : 'Get Fitness Plan'}
          </button>
        </div>
  
        {loading && <div className="loading-spinner">Loading...</div>}
  
        {fitnessPlan && (
          <div className="fitness-plan-card">
            <h2 className="fitness-plan-title">Fitness Plan Suggestions</h2>
            <ul className="bullet-list">
              {splitToRows(fitnessPlan).map((row, index) => (
                <li style={{ margin: 20 }} key={index}>
                  {row}
                </li>
              ))}
            </ul>
            {saveMessage && <p>{saveMessage}</p>}
          </div>
        )}
      </div>
    );
  };
  
  export default FitnessPlan;