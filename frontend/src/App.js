// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [editingId, setEditingId] = useState(null);

  // API URL based on environment
  const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    axios.get(`${API_URL}/api/users`)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, [API_URL]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      axios.put(`${API_URL}/api/users/${editingId}`, { name, email, age })
        .then(res => {
          setUsers(users.map(user => user._id === editingId ? res.data : user));
          setEditingId(null);
        });
    } else {
      axios.post(`${API_URL}/api/users`, { name, email, age })
        .then(res => setUsers([...users, res.data]));
    }
    setName('');
    setEmail('');
    setAge('');
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setAge(user.age);
    setEditingId(user._id);
  };

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/api/users/${id}`)
      .then(() => setUsers(users.filter(user => user._id !== id)));
  };

  return (
    <div>
      <h1>User Management</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
        <button type="submit">{editingId ? 'Update' : 'Add'} User</button>
      </form>

      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} - {user.email} - {user.age}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
