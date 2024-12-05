// Import necessary hooks from React and the axios library for making HTTP requests.
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the FoodEntries functional component.
function FoodEntries() {
  // Use the useState hook to create a state variable 'entries' with its setter function 'setEntries'. It's initialized as an empty array.
  const [entries, setEntries] = useState([]);

  // Use the useEffect hook to handle side effects. In this case, fetching data when the component mounts.
  useEffect(() => {
    // Define an asynchronous function 'fetchEntries' to fetch data from the server.
    const fetchEntries = async () => {
      try {
        // Make an HTTP GET request to retrieve entries. Await pauses execution until the request completes.
        const response = await axios.get('http://localhost:5000/entries');
        // Update the 'entries' state with the data received from the server, which is accessed via response.data.
        setEntries(response.data);
      } catch (error) {
        // If there is an error during the fetch, log it to the console.
        console.error('Error fetching data: ', error);
      }
    };

    // Call the 'fetchEntries' function to execute the fetch operation.
    fetchEntries();
  }, []); // The empty dependency array means this effect runs once after the initial render only, similar to componentDidMount.

  // Render part of the component that displays the food entries.
  return (
    <div>
      <h1>Food Entries</h1>  // Heading for the component.
      <ul>
        {/* Map over the 'entries' array and return a list item for each entry. The 'key' prop is important for performance and React's internal state management during re-renders. */}
        {entries.map(entry => (
          <li key={entry._id}>{entry.name} - {entry.calories} calories</li>
        ))}
      </ul>
    </div>
  );
}

// Export the FoodEntries component so it can be used in other parts of the application.
export default FoodEntries;

