import React, { useState } from 'react';
import axios from 'axios';
import open_api_key from '../open_api_key' // Import the API key from a local file for security.

// DictionaryDemo functional component definition.
const DictionaryDemo = () => {
    // State hooks for managing the input word, definition result, and loading state.
    const [definition, setDefinition] = useState('');
    const [word, setWord] = useState('');
    const [loading, setLoading] = useState(false);

    // Asynchronous function to fetch a funny definition of a word using OpenAI's API.
    const getDefinition = async () => {
        setLoading(true); // Set loading to true to indicate that the request is in progress.
        setDefinition(''); // Clear any previous definitions.

        try {
            // Axios POST request to OpenAI's API.
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: "gpt-3.5-turbo", // Specify the model used for the request.
                    messages: [{ role: "user", content: `Give a funny definition for the word "${word}"` }], // The prompt to send.
                    temperature: 0.7 // Controls the randomness of the response.
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${open_api_key}`, // Authorization header with the API key.
                    },
                }
            );
            // Set the definition to the first choice's content received from the API.
            setDefinition(response.data.choices[0].message.content);
        } catch (error) {
            // Error handling if the request fails.
            console.error('Error:', error.response ? error.response.data : error.message);
            setDefinition('Failed to get the definition. Please try again.');
        } finally {
            setLoading(false); // Set loading to false to indicate that the request has completed.
        }
    };

    // JSX for rendering the component.
    return (
        <div style={{ padding: 30 }}>
            <h1 style={{ color: "darkturquoise", fontWeight: 'bold', marginBottom: 20 }}>Dictionary Demo</h1>
            <label style={{ marginBottom: 10 }}>
                Enter a word:
                <input
                    type="text"
                    style={{ height: 40, borderColor: 'gainsboro', borderWidth: 1, borderRadius: 10, padding: 10, marginBottom: 10 }}
                    onChange={e => setWord(e.target.value)} // Update the word state on input change.
                    value={word} // Display the current word state.
                    placeholder="Type a word here" // Placeholder for the input.
                    onKeyPress={event => {
                        if (event.key === 'Enter') { // Handle enter key press to trigger the definition fetch.
                            getDefinition();
                        }
                    }}
                />
            </label>
            <button
                style={{ backgroundColor: 'darkturquoise', color: 'white', padding: 10, borderRadius: 10, border: 'none', fontWeight: 'bold' }}
                onClick={getDefinition} // Trigger the definition fetch on button click.
                disabled={loading} // Disable the button when a request is in progress.
            >
               {/* Change button text based on loading state. */}
                {loading ? 'Searching...' : 'Get Funny Definition'} 
            </button>
            {definition !== '' && (
                <div style={{ backgroundColor: 'honeydew', marginTop: 20, padding: 20 }}>
                    <p style={{ fontSize: 20, color: 'darkturquoise', textAlign: 'center' }}>
                    {/* // Label for the definition. */}
                        Definition:
                    </p>
                    <p style={{ backgroundColor: 'white', padding: 10, borderRadius: 5 }}>
                    {/* Display the fetched definition. */}
                        {definition} 
                    </p>
                </div>
            )}
        </div>
    );
};

export default DictionaryDemo; // Export the component for use in other parts of the application.

