const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enables CORS
app.use(bodyParser.json()); // Parses JSON data in requests

// Example route
app.get('/api/foods', (req, res) => {
    res.json([{
        id: 1, name: 'Apple', calories: 95,
        id: 2, name: 'Banana', calories: 105,
     }]);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT} successfully!`));
// Compare this snippet from Calorie_Tracker/client/src/components/pages/ExerciseTrackerPage.js: