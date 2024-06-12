import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', { username, password });
      console.log('Registration successful:', response.data);
      setMessage('Registration successful');
    } catch (error) {
      console.error('Error registering user:', error.response.data);
      setMessage('Error registering user: ' + error.response.data.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { username, password });
      console.log('Login successful:', response.data);
      setToken(response.data.token);
      setMessage('Login successful');
    } catch (error) {
      console.error('Error logging in:', error.response.data);
      setMessage('Error logging in: ' + error.response.data.message);
    }
  };

  const handleLogout = () => {
    setToken('');
    console.log('Logged out successfully');
    setMessage('Logged out successfully');
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete('http://localhost:3000/auth/delete-account', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setToken('');
      console.log('Account deleted successfully');
      setMessage('Account deleted successfully');
    } catch (error) {
      console.error('Error deleting account:', error.response.data);
      setMessage('Error deleting account: ' + error.response.data.message);
    }
  };

  return (
    <div className="App">
      {message && <p>{message}</p>}
      {!token ? (
        <div>
          <h1>Login</h1>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
          <h1>Register</h1>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleRegister}>Register</button>
        </div>
      ) : (
        <Router>
          <nav>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleDeleteAccount}>Delete Account</button>
          </nav>
          <Routes>
            <Route path="/profile" element={<Profile token={token} />} />
            <Route path="*" element={<Navigate to="/profile" />} />
          </Routes>
        </Router>
      )}
    </div>
  );
};

const Profile = ({ token }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data);
        console.log('User data retrieved:', response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.response.data);
      }
    };
    fetchUserData();
  }, [token]);

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {userData.username}</p>
      <p>User ID: {userData._id}</p>
    </div>
  );
};

export default App;
