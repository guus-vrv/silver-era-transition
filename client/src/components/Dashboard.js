import React, { useState, useEffect } from 'react';
import axiosInstance from './Auth/AxiosInstance';
import { useParams, useNavigate } from 'react-router-dom';
import Filters from './BuyersSellers/Filters';
import Room from './Brokers/Room';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component
import { faBookmark, faUserCircle } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
import './styles/Dashboard.css';

const API_URL = process.env.REACT_APP_API_URL; // Access the base URL from environment variable

const Dashboard = () => {
  const [role, setRole] = useState('');
  const [hasFinishedProfile, setHasFinishedProfile] = useState(false);
  const [completedPages, setCompletedPages] = useState(0);
  const [numberOfSavedProfiles, setNumberOfSavedProfiles] = useState(0);
  const { id } = useParams(); // Get the user ID from URL params
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user role and profile data when component mounts
    const fetchUserData = async () => {
      try {
        const userResponse = await axiosInstance.get(`${API_URL}/api/user`);
        if (userResponse.data.role === 'buyer' || userResponse.data.role === 'seller')
        {
          const profile = await axiosInstance.get(`${API_URL}/api/profiles`);
          setCompletedPages(profile.data.completedPages.length);
          const numberOfSavedProfiles = await axiosInstance.get(`${API_URL}/api/profiles/saved`);
          setNumberOfSavedProfiles(numberOfSavedProfiles.data);
        }
        setRole(userResponse.data.role);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchRooms = async () => {
      try {
        const response = await axiosInstance.get(`${API_URL}/api/room`);
        setRooms(response.data);
        console.log('RSSS', response.data);
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    }

    fetchUserData();
    fetchRooms();
  }, [id]);

  const addRoom = () => {
    let availableRoomNumber = 0;
    while (rooms.some(room => room.roomNumber === availableRoomNumber)) {
      availableRoomNumber++;
    }
    
    navigate(`/add-room/${availableRoomNumber}`);
   
  }

  return (
    <div className="dashboard-container">

      {role === 'broker' && (

  <div>
    <div className="dashboard-section">
      <div className="cards-container">
        {rooms.map((room, index) => (
          <div 
            className="room-card" 
            key={index} 
            onClick={() => navigate(`/room/${room.roomNumber}`)}
          >
            <h2 className="room-title">Room {room.roomNumber}</h2>
            <p className="room-info">Phase: {room.phase}</p>
            <p className="room-info">Created: {room.created.split('T')[0]}</p>
            <p className="room-info">Updated: {room.updated.split('T')[0]}</p>
          </div>
        ))}
      </div>
    </div>
    <button 
      type="submit" 
      style={{ marginTop: '2rem' }} 
      className="submit-button" 
      onClick={addRoom}
    >
      Add Room
    </button>
  </div>
)}


{(role === 'buyer' || role === 'seller') && (
  <div className="dashboard-page">

      {role === 'buyer' && completedPages < 3 && (

        <div className="profile-completion" onClick={() => navigate("/edit-profile")}>

          <FontAwesomeIcon icon={faUserCircle} className="box-icon" />
          <h2 className="dashboard-heading">
            <FontAwesomeIcon icon={faUserCircle} className="box-icon" />
            {completedPages * (1 / 3) * 100}% Of Profile Completed
          </h2>

        </div>
      )}

      {role === 'seller' && completedPages < 4 && (
        <div className="profile-completion" onClick={() => navigate("/edit-profile")}>

        <FontAwesomeIcon icon={faUserCircle} className="box-icon" />

          <h2 className="dashboard-heading">
            
            {completedPages * (1 / 4) * 100}% Of Profile Completed
          </h2>

        </div>
      )}

    { numberOfSavedProfiles > 0 && (
    <div className="saved-profiles" onClick={() => navigate("/saved")}>
      <FontAwesomeIcon icon={faBookmark} className="box-icon" />
      <h2 className="dashboard-heading">
        You Have {numberOfSavedProfiles} Saved Profiles Awaiting An Invite.
      </h2>
    </div>

    )}

    <div className="filters">
      <h2 className="dashboard-heading">Your Filters</h2>
      <Filters />
    </div>
  </div>
)}


    </div>
  );
};

export default Dashboard;
