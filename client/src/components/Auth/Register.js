import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/Auth.css';

const API_URL = process.env.REACT_APP_API_URL; // Access the base URL from environment variable

const Register = () => {
  console.log("Register rendered");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'broker',
    brokerEmail: '' // Add brokerEmail to the state
  });

  const [error, setError] = useState(''); // State to hold error messages
  const { name, email, password, role, brokerEmail} = formData;
  const navigate = useNavigate();

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleNoBrokerClick = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      brokerEmail: 'SETdenhaag@gmail.com',
    }));
  };

  const onSubmit = async e => {
    e.preventDefault(); // prevent page reload
    setError(''); // Clear any previous errors

    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      const body = JSON.stringify({ name, email, password, role, brokerEmail: (role === 'buyer' || role === 'seller') ? brokerEmail : undefined });
      console.log(config);
      const res = await axios.post(`${API_URL}/api/auth/register`, body, config); // make API request to back-end server
      console.log(res.data); // Handle successful registration
      navigate('/login');
    } catch (err) {
      if (err.response) {
        // Check if the response contains 'errors' (an array of error objects)
        if (err.response.data.errors) {
          // If errors exist, concatenate all error messages
          setError(err.response.data.errors.map((error) => error.msg).join(', '));
        } else if (err.response.data.msg) {
          // If it's a single error message, use it
          setError(err.response.data.msg);
        } else {
          setError('Unknown server error');
        }
      } else {
        setError('Server Error');
      }
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      {error && <div className="error-message">{error}</div>} {/* Display error message */}
      <form className="register-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
          className="input-field"
          required
        />
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
        <select
          name="role"
          value={role}
          onChange={onChange}
          className="input-field"
        >
          <option value="broker">Broker</option>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>

        {/* Conditionally render broker email input for buyers and sellers */}
        {(role === 'buyer' || role === 'seller') && (
          <input
            type="email"
            placeholder="Broker Email"
            name="brokerEmail"
            value={brokerEmail}
            onChange={onChange}
            className="input-field"
            required
          />
         
        )}


          {(role === 'buyer' || role === 'seller') && (
                    <a href="#" className="register-link" style={{textDecoration: 'underline', marginBottom: '2rem'}} onClick={handleNoBrokerClick}>
                      No broker? Click here
                    </a>
          )}



        <button type="submit" className="submit-button">Register</button>
      </form>

      <a href="/login" className="register-link">Go to Login</a>
    </div>
  );
};

export default Register;
