// components/BrokerDashboard.js
import React, { useState, useEffect } from 'react';
import './styles/MyClients.css'; // Import the CSS for styles
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Auth/AxiosInstance';

const API_URL = process.env.REACT_APP_API_URL; // Your API base URL

const MyClients = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch sample data (replace this with your data fetching logic)
    const fetchRooms = async () => {
      
      try {
        const response = await axiosInstance.get(`${API_URL}/api/room`);
        setRooms(response.data);

      } catch (error) {
          console.error('Error getting room:', error);
          // Handle error (e.g., show an alert or notification)
      }
    };
    fetchRooms();
  }, []);

  const navigateToRoom = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  const handleAddRoom = () => {
    navigate('/add-room'); // Navigate to the AddRoom component
  };

  return (
    <div className="dashboard">
    
      <div className="table-container">
        <table className="clients-table">
          <thead>
            <tr>
              <th className="table-head-room">Room</th>
              <th className="table-head-phase">Phase</th>
              <th className="table-head-created">Created</th>
              <th className="table-head-updated">Updated</th>
              <th className="table-head-business-space">Business Space</th>
              <th className="table-head-prospect">Prospect</th>
              <th className="table-head-location">Location</th>
              <th className="table-head-revenue">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((item, index) => (
              <tr className="rooms" key={index}>
                <td
                  onClick={() => navigateToRoom(item.room)}
                  className="room-cell"
                >
                  {item.roomNumber}
                </td>
                <td className="phase-cell">{item.phase}</td>
                <td className="created-cell">{item.created}</td>
                <td className="updated-cell">{item.updated}</td>
                <td className="business-space-cell">{item.businessSpace}</td>
                <td className="prospect-cell">{item.prospect}</td>
                <td className="location-cell">{item.location}</td>
                <td className="revenue-cell">{item.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>

        
      </div>
      
      <button className="add-room-button" onClick={handleAddRoom}>
        Add Room
      </button>

    </div>
  );
};

export default MyClients;
