// routes/users.js

import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = decoded; // Attach decoded token to req.user
    next();
  });
}

// Registration endpoint
router.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    // Validate required fields
    if (!firstname || !lastname || !username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      isVerified: true, // Set isVerified to true for testing purposes
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    // Basic input validation
    if (!usernameOrEmail || !password) {
      return res.status(400).json({ error: 'Please provide username/email and password.' });
    }

    // Find the user by username or email
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid username/email or password.' });
    }

    // Check if the user's email is verified
    if (!user.isVerified) {
      return res.status(403).json({ error: 'Please verify your email before logging in.' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid username/email or password.' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id.toString(), username: user.username },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// POST /api/users/fitness-plan
router.post('/fitness-plan', authenticateToken, async (req, res) => {
  const { calorie, plan } = req.body;

  try {
    const user = await User.findById(req.user.userId);

    if (user) {
      // Add the new fitness plan to the user's fitnessPlans array
      user.fitnessPlans.push({ calorie, plan });
      await user.save();

      res.json({ message: 'Fitness plan saved successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error saving fitness plan:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/users/fitness-plans
router.get('/fitness-plans', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (user) {
      res.json({ fitnessPlans: user.fitnessPlans });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error fetching fitness plans:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/users/fitness-plans/:id
router.put('/fitness-plans/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const planId = req.params.id;
    const { calorie, plan } = req.body;

    console.log('PUT /fitness-plans/:id - Received data:', {
      userId,
      planId,
      calorie,
      plan,
    });

    const user = await User.findById(userId);

    if (user) {
      // Find the plan
      const fitnessPlan = user.fitnessPlans.id(planId);

      console.log('Found fitness plan:', fitnessPlan);

      if (fitnessPlan) {
        // Update the plan fields
        fitnessPlan.calorie = calorie !== undefined ? calorie : fitnessPlan.calorie;
        fitnessPlan.plan = plan !== undefined ? plan : fitnessPlan.plan;
        await user.save();

        console.log('Fitness plan updated successfully');

        res.json({ message: 'Fitness plan updated successfully', fitnessPlan });
      } else {
        console.log('Fitness plan not found');
        res.status(404).json({ error: 'Fitness plan not found' });
      }
    } else {
      console.log('User not found');
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error updating fitness plan:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/users/fitness-plans/:id
router.delete('/fitness-plans/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const planId = req.params.id;

    const user = await User.findById(userId);

    if (user) {
      // Find the plan index
      const planIndex = user.fitnessPlans.findIndex(
        (plan) => plan._id.toString() === planId
      );

      if (planIndex > -1) {
        // Remove the plan from the array
        user.fitnessPlans.splice(planIndex, 1);
        await user.save();

        res.json({ message: 'Fitness plan deleted successfully' });
      } else {
        res.status(404).json({ error: 'Fitness plan not found' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error deleting fitness plan:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Profile endpoint
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password -__v');

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json({ user });
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

export default router;

