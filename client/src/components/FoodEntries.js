// src/components/FoodEntries.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FoodEntries() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/entries');
        setEntries(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div>
      <h1>Food Entries</h1>
      <ul>
        {entries.map(entry => (
          <li key={entry._id}>{entry.name} - {entry.calories} calories</li>
        ))}
      </ul>
    </div>
  );
}

export default FoodEntries;
