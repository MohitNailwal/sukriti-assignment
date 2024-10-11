import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Send POST request to save user data
      await axios.post('http://localhost:5000/api/register', { username, password });

      // Redirect to login page after successful registration
      navigate('/login'); 
    } catch (error) {
      console.error('Error registering user:', error); // Handle any errors
    }
  };

  // Inline styles
  const styles = {
    container: {
      backgroundColor: '#2c2c2c', // Dark background
      color: '#ffffff', // White text
      padding: '20px',
      borderRadius: '8px',
      maxWidth: '400px', // Set a max width for the form
      margin: '20px auto',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    },
    heading: {
      textAlign: 'center', // Center the heading
    },
    input: {
      margin: '10px 0',
      padding: '10px',
      border: 'none',
      borderRadius: '4px',
      width: '100%', // Make inputs full width
    },
    button: {
      padding: '10px',
      backgroundColor: '#4CAF50', // Green button
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      width: '100%', // Make button full width
    },
    buttonHover: {
      backgroundColor: '#45a049', // Darker green on hover
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.container}>
      <h2 style={styles.heading}>Register</h2>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        required // Make input required
        style={styles.input} // Apply inline styles
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required // Make input required
        style={styles.input} // Apply inline styles
      />
      <button type="submit" style={styles.button}>Register</button>
    </form>
  );
};

export default Register;
