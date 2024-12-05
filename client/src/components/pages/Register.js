// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../css/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { firstname, lastname, username, email, password, confirmPassword } = formData;

  // Function to handle changes in input fields
const handleChange = (e) => {
  // Update the formData state with the new value from the input field
  setFormData({
      ...formData,                   // Spread the existing formData values
      [e.target.name]: e.target.value // Update the specific field based on the input's name attribute
  });
};

// Function to validate form inputs
const validate = () => {
  const newErrors = {}; // Object to store any validation errors

  // Check if first name is empty or contains only whitespace
  if (!firstname.trim()) newErrors.firstname = 'First name is required.';

  // Check if last name is empty or contains only whitespace
  if (!lastname.trim()) newErrors.lastname = 'Last name is required.';

  // Check if username is empty or contains only whitespace
  if (!username.trim()) newErrors.username = 'Username is required.';

  // Validate email
  if (!email.trim()) {
      // Email is empty
      newErrors.email = 'Email is required.';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
      // Email format is invalid (simple regex check)
      newErrors.email = 'Email is invalid.';
  }

  // Validate password
  if (!password) {
      // Password is empty
      newErrors.password = 'Password is required.';
  } else if (password.length < 8) {
      // Password is too short
      newErrors.password = 'Password must be at least 8 characters.';
  }

  // Check if password and confirm password match
  if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
  }

  return newErrors; // Return the object containing all validation errors
};

// Function to handle form submission
const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior (page refresh)

  // Validate form data before submitting
  const validationErrors = validate();

  // If there are validation errors, update the errors state and stop submission
  if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set the validation errors to display them to the user
      return; // Stop further execution of handleSubmit
  }

  setLoading(true);   // Indicate that a submission is in progress
  setErrors({});      // Clear any existing errors
  setMessage('');     // Clear any existing messages

  try {
      // Send a POST request to the registration endpoint with the form data
      const res = await axios.post('http://localhost:5000/api/users/register', formData);

      // Set a success message from the server response or a default message
      setMessage(res.data.message || 'Registration successful! Redirecting to login...');

      // Reset the form fields to empty strings
      setFormData({
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
      });

      setLoading(false); // Submission is complete, turn off loading indicator

      // Redirect to the login page after a 2-second delay
      setTimeout(() => {
          navigate('/login'); // Use the navigate function from react-router-dom to change routes
      }, 2000);
  } catch (err) {
      setLoading(false); // Turn off loading indicator due to error

      // Check if the error response contains a specific error message
      if (err.response && err.response.data && err.response.data.error) {
          setMessage(err.response.data.error); // Display the specific error message from the server
      } else {
          // Display a generic error message if no specific message is provided
          setMessage('Registration failed. Please try again.');
      }
  }
};

return (
  <div className="register-container">
    <h2>Register</h2>
    <form onSubmit={handleSubmit} noValidate>
      {/* First Name */}
      <div className="form-group">
        <label htmlFor="firstname">First Name:</label>
        <input
          name="firstname"
          value={firstname}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        {errors.firstname && <span className="error">{errors.firstname}</span>}
      </div>

      {/* Last Name */}
      <div className="form-group">
        <label htmlFor="lastname">Last Name:</label>
        <input
          name="lastname"
          value={lastname}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        {errors.lastname && <span className="error">{errors.lastname}</span>}
      </div>

      {/* Username */}
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      {/* Password */}
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      {/* Confirm Password */}
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword}</span>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>

    {/* Message Display */}
    {message && <p className="message">{message}</p>}
  </div>
);
}

export default Register;