import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/Auth.css';

const API_URL = process.env.REACT_APP_API_URL; // Access the base URL from environment variable

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(''); // State to hold error message

  const { email, password } = formData;
  const navigate = useNavigate(); // Initialize useNavigate

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      const body = JSON.stringify({ email, password });

      const res = await axios.post(`${API_URL}/api/auth/login`, body, config);

      if (res.data.token) {
        localStorage.setItem('token', res.data.token); // Save the token to localStorage
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('userId', res.data.id);
        navigate(`/dashboard/`);
      } else {
        setError('Invalid login response'); // If no token is returned, show an error
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.msg || 'Server Error');
      } else {
        setError('Server Error');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Login</h1>

        {error && <div className="error-message">{error}</div>} 
        <form onSubmit={onSubmit} className="form">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            className="input-field"
            required
          />
          <button type="submit" className="submit-button">Login</button>
        </form>

        <a href="/register" className="register-link">
          Go to Register
        </a>
      </div>
    </div>
  );
};

export default Login;
