// components/AddRoom.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './styles/AddRoom.css'; // Import the CSS for styles
import axiosInstance from '../Auth/AxiosInstance';

const API_URL = process.env.REACT_APP_API_URL; // Your API base URL

const AddRoom = () => {
  
  const [formData, setFormData] = useState({
    phase: '',
  });

  const {roomNumber} = useParams();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const profilesToAdd = location.state?.profilesToAdd;
  const groupChat = location.state?.groupChat;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(`${API_URL}/api/room`, {phase: formData.phase, roomNumber: roomNumber, profilesToAdd: profilesToAdd, groupChat: groupChat });

      

      // Redirect back to dashboard or another page after successful submission
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding room:', error);
      // Handle error (e.g., show an alert or notification)
    }
  };

  return (
    <div className="add-room-container">

      {error}
        
      <h2 style={{marginBottom: '2rem'}}>Add Room</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label>Room Number: {roomNumber}</label>
        </div>
        <div>
          <label>Phase:</label>
          <input
            type="text"
            className="input-field"
            value={formData.phase}
            onChange={(e) => setFormData({ ...formData, phase: e.target.value})}
            required
          />
        </div>
        <div>
          <label>Select Members: </label>
          {profilesToAdd ? 
          (<button type="button" className='button' style={{backgroundColor: 'orange'}} onClick={() => navigate(`/${roomNumber}/select-profiles`, {state: {groupChat: groupChat, profilesToAdd: profilesToAdd}})}>Edit Members</button> ) 
          : (<button type="button" className='button' onClick={() => navigate(`/${roomNumber}/select-profiles`, {state: {groupChat: groupChat, profilesToAdd: profilesToAdd}})}>Select Members</button>)
            
          }
          
          
        </div>
        <div>
        <label>Select Groupchat: </label>
          {groupChat ? 
          (<button type="button" className='button' style={{backgroundColor: 'orange'}} onClick={() => navigate(`/${roomNumber}/select-groupchat`, {state: {groupChat: groupChat, profilesToAdd: profilesToAdd}})}>Edit Groupchat</button> ) 
          : (<button type="button" className='button' onClick={() => navigate(`/${roomNumber}/select-groupchat`, {state: {groupChat: groupChat, profilesToAdd: profilesToAdd}})}>Select Groupchat</button>)
            
          }
        </div>
        <button type="button" className='submit-button' onClick={handleSubmit}>Add Room</button>
      
      </form>
      <button className='back-button' onClick={() => navigate('/dashboard')}>Back</button>
    </div>
  );
};

export default AddRoom;
