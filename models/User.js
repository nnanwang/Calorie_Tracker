// models/User.js
import mongoose from 'mongoose';

const FitnessPlanSchema = new mongoose.Schema({
    calorie: Number,
    plan: String,
    date: { type: Date, default: Date.now },
  });

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true, // Ensures username uniqueness
        trim: true,    // Removes whitespace from both ends
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'], // Email format validation
    },
    password: {
        type: String,
        required: true,
        minlength: 8,  // Enforces password length
    },
    isVerified: {
        type: Boolean,
        default: false, // For email verification status
    },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,

    fitnessPlans: [FitnessPlanSchema],

}, { timestamps: true }); // Enables automatic createdAt and updatedAt fields

// Export the model
export default mongoose.model('User', userSchema);
