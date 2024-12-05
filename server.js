import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import routes
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const path = require('path');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your React app's URL if different
  credentials: true,
}));

app.use(express.json());

// Use routes
app.use('/api/users', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/authDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Uncomment this route if needed
// app.get('/api/foods', (req, res) => {
//     res.json([
//         { id: 1, name: 'Apple', calories: 95 },
//         { id: 2, name: 'Banana', calories: 105 },
//         { id: 3, name: 'Orange', calories: 62 },
//     ]);
// });

// Define a route to handle GET requests to '/api/food-nutritions'
app.get('/api/food-nutritions', (req, res) => {  
    const searchQuery = req.query.q ? req.query.q.toLowerCase() : ''; 

    fs.readFile('food.json', 'utf8', (err, data) => { 
        if (err) {  
            res.status(500).send('Error reading JSON file'); 
            return;
        }

        let foods;
        try {  
            foods = JSON.parse(data);
        } catch (parseError) {  
            res.status(500).send('Error parsing JSON data');
            return;
        }

        const filteredFoods = foods.filter(food =>
            food.name.toLowerCase().includes(searchQuery)
        );

        const result = filteredFoods.map(food => ({
            name: food.name,
            nutrition: food['nutrition-per-100g'],
        }));

        res.json(result);  
    });
});

const exercises = [
    { name: 'Running', burnRate: 600 },
    { name: 'Cycling', burnRate: 500 },
    { name: 'Swimming', burnRate: 700 },
    { name: 'Yoga', burnRate: 200 }
];

app.post('/suggestions', (req, res) => {
    const { calories } = req.body;
    if (!calories) {
        return res.status(400).json({ error: 'Calories are required' });
    }
    const suggestions = exercises.map(exercise => ({
        exercise: exercise.name,
        duration: (calories / exercise.burnRate).toFixed(2) + ' hours'
    }));
    res.json(suggestions);
});
