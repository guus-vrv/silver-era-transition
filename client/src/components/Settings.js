// src/components/MyAccount.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom
import axiosInstance from './Auth/AxiosInstance'; // Assuming AxiosInstance is set up for authenticated requests
import { jwtDecode as jwt_decode } from 'jwt-decode'; // if you want to keep calling it jwt_decode
import './styles/Settings.css';

const API_URL = process.env.REACT_APP_API_URL; // Your API base URL

const Settings = () => {

  const navigate = useNavigate(); // useHistory hook to programmatically navigate

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
          // Make an API call to get the user details
          const response = await axiosInstance.get(`${API_URL}/api/profiles/email`);
          // Set the email from the response
          setEmail(response.data.email);
      }
       catch (error) {
        console.error('Error fetching user details:', error);
        setErrorMessage('Failed to load user details');
      }
    };

    fetchUserDetails(); // Call the function when the component mounts
  }, []);
  
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    try {
      setSuccessMessage('');
      setErrorMessage('');
      const response = await axiosInstance.put(`${API_URL}/api/profiles/update-email`, { email });
      setSuccessMessage(response.data.message);
    } catch (error) {
        console.log(error.response.data.message)
      setErrorMessage(error.response.data.message);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      setSuccessMessage('');
      setErrorMessage('');
      const response = await axiosInstance.put(`${API_URL}/api/profiles/update-password`, {
        oldPassword,
        newPassword,
      });
      setSuccessMessage(response.data.message);
      

    } catch (error) {
        setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className='my-account-container'>
        <div className="my-account-form">
        <h1 className="my-account-title">My Account</h1>

        {/* Success or Error Messages */}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Email Update Form */}
        <form onSubmit={handleEmailUpdate} className='form' >
        <h3 className='section-heading'>Update Email</h3>
        <input
        type="email"
        placeholder="New Email"
        value={email}
        name="email"
        className='input-field'
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        <button type="submit" className='submit-button'>Update Email</button>
        </form>

        <hr className="divider" />

        {/* Password Update Form */}
        <form onSubmit={handlePasswordUpdate} className="form">
        <h3 className='section-heading'>Update Password</h3>
        <input
        type="password"
        placeholder="Current Password"
        value={oldPassword}
        name="oldPassword"
        className='input-field'
        onChange={(e) => setOldPassword(e.target.value)}
        required
        />
        <input
        type="password"
        placeholder="New Password"
        name="newPassword"
        className='input-field'
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        />
        <button type="submit" className='submit-button'>Update Password</button>
        </form>

        </div>
    </div>
  );
};

export default Settings;

