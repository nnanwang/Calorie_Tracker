// Profile.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../css/Profile.css';

function Profile({ setAuth }) {
  const [user, setUser] = useState(null);
  const [fitnessPlans, setFitnessPlans] = useState([]);
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [editedCalorie, setEditedCalorie] = useState('');
  const [editedPlan, setEditedPlan] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('No token found');
          navigate('/login');
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await axios.get('http://localhost:5000/api/users/profile', config);
        setUser(res.data.user);

        const plansRes = await axios.get('http://localhost:5000/api/users/fitness-plans', config);
        setFitnessPlans(plansRes.data.fitnessPlans);
      } catch (err) {
        console.error('Error fetching user data:', err);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    navigate('/login');
  };

  // Handle deleting a fitness plan
  const deleteFitnessPlan = async (planId) => {
    try {
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log('Deleting plan with ID:', planId);

      await axios.delete(`http://localhost:5000/api/users/fitness-plans/${planId}`, config);

      // Update the local state
      setFitnessPlans(fitnessPlans.filter((plan) => plan._id !== planId));
    } catch (err) {
      console.error('Error deleting fitness plan:', err);

      // Optionally, display an error message to the user
      alert('Failed to delete the fitness plan. Please try again.');
    }
  };

  // Handle starting to edit a fitness plan
  const startEditing = (plan) => {
    setEditingPlanId(plan._id);
    setEditedCalorie(plan.calorie);
    setEditedPlan(plan.plan);
  };

  // Handle saving an edited fitness plan
  const saveEditedPlan = async () => {
    try {
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      console.log('Sending PUT request to update plan:', {
        editingPlanId,
        editedCalorie,
        editedPlan,
      });

      const res = await axios.put(
        `http://localhost:5000/api/users/fitness-plans/${editingPlanId}`,
        {
          calorie: editedCalorie,
          plan: editedPlan,
        },
        config
      );

      console.log('Response from server:', res.data);

      // Update the local state with the updated plan
      setFitnessPlans(
        fitnessPlans.map((plan) =>
          plan._id === editingPlanId
            ? { ...plan, calorie: editedCalorie, plan: editedPlan }
            : plan
        )
      );

      // Reset editing state
      setEditingPlanId(null);
      setEditedCalorie('');
      setEditedPlan('');
    } catch (err) {
      console.error('Error updating fitness plan:', err);

      // Optionally, display an error message to the user
      alert('Failed to save the edited fitness plan. Please try again.');
    }
  };

  // Handle cancelling editing
  const cancelEditing = () => {
    setEditingPlanId(null);
    setEditedCalorie('');
    setEditedPlan('');
  };

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <h2>
        Welcome, {user.firstname} {user.lastname}!
      </h2>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>

      {fitnessPlans.length > 0 ? (
        <div className="fitness-plans-section">
          <h3>Your Saved Fitness Plans</h3>
          {fitnessPlans.map((plan) => (
            <div key={plan._id} className="fitness-plan-card">
              {editingPlanId === plan._id ? (
                <>
                  <p>
                    <strong>Date:</strong> {new Date(plan.date).toLocaleString()}
                  </p>
                  <p>
                    <strong>Calorie Intake:</strong>
                    <input
                      type="number"
                      value={editedCalorie}
                      onChange={(e) => setEditedCalorie(e.target.value)}
                    />
                  </p>
                  <p>
                    <strong>Plan:</strong>
                  </p>
                  <textarea
                    value={editedPlan}
                    onChange={(e) => setEditedPlan(e.target.value)}
                    rows={10}
                    cols={50}
                  ></textarea>
                  <div className="button-group">
                    <button onClick={saveEditedPlan} className="save-button">
                      Save
                    </button>
                    <button onClick={cancelEditing} className="cancel-button">
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    <strong>Date:</strong> {new Date(plan.date).toLocaleString()}
                  </p>
                  <p>
                    <strong>Calorie Intake:</strong> {plan.calorie}
                  </p>
                  <p>
                    <strong>Plan:</strong>
                  </p>
                  <ul className="bullet-list">
                    {plan.plan.split('\n').map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>
                  <div className="button-group">
                    <button onClick={() => startEditing(plan)} className="edit-button">
                      Edit
                    </button>
                    <button onClick={() => deleteFitnessPlan(plan._id)} className="delete-button">
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>You have no saved fitness plans.</p>
      )}

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
}

export default Profile;
