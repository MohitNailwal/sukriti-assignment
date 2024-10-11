// src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetchUsers(); 
  }, []);


  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:5000/api/users');
    setUsers(response.data);
  };


  const handleEdit = (user) => {
    setUsername(user.username);
    setPassword(user.password);
    setEditingUserId(user._id);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingUserId) {
     
      await axios.put(`http://localhost:5000/api/users/${editingUserId}`, { username, password });
    } else {
   
      await axios.post('http://localhost:5000/api/register', { username, password });
    }
    fetchUsers();
    resetForm(); 
  };

  
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers(); // Refresh user list after deletion
  };


  const resetForm = () => {
    setUsername('');
    setPassword('');
    setEditingUserId(null);
  };

  
  const styles = {
    container: {
      backgroundColor: '#2c2c2c', 
      color: '#ffffff', 
      padding: '20px',
      borderRadius: '8px',
      maxWidth: '800px',
      margin: '20px auto',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '20px',
    },
    input: {
      margin: '10px 0',
      padding: '10px',
      border: 'none',
      borderRadius: '4px',
    },
    button: {
      padding: '10px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#45a049', 
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      padding: '10px',
      textAlign: 'left',
      borderBottom: '1px solid #444',
      backgroundColor: '#444', 
    },
    td: {
      padding: '10px',
      textAlign: 'left',
      borderBottom: '1px solid #444', 
    },
    rowHover: {
      backgroundColor: '#555', 
    },
    deleteButton: {
      padding: '5px 10px',
      marginRight: '5px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      backgroundColor: '#f44336', 
    },
  };

  return (
    <div style={styles.container}>
      <h1>User Management</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {editingUserId ? 'Update User' : 'Add User'}
        </button>
      </form>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Username</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} style={{ ...styles.td, ...(user._id === editingUserId ? styles.rowHover : {}) }}>
              <td style={styles.td}>{user.username}</td>
              <td>
                <button onClick={() => handleEdit(user)} style={styles.button}>
                  Edit
                </button>
                <button onClick={() => handleDelete(user._id)} style={styles.deleteButton}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
