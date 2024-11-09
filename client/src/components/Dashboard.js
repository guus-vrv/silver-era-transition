import React, { useState, useEffect } from 'react';
import axiosInstance from './Auth/AxiosInstance';
import { useParams, useNavigate } from 'react-router-dom';
import Filters from './BuyersSellers/Filters';
import Room from './Brokers/Room';

const API_URL = process.env.REACT_APP_API_URL; // Access the base URL from environment variable

const Dashboard = () => {
  const [role, setRole] = useState('');
  const [hasProfile, setHasProfile] = useState(false);
  const { id } = useParams(); // Get the user ID from URL params
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user role and profile data when component mounts
    const fetchUserData = async () => {
      try {
        const userResponse = await axiosInstance.get(`${API_URL}/api/user`);
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

      <h2 style={{textAlign: 'center', padding: '20px'}}>Your Dashboard</h2>

      {/* Broker Section */}
      {role === 'broker' && (
        <div>

          <div className="dashboard-section">
            <table className="clients-table">
            <thead>
              <tr>
                <th className="table-head-room">Room</th>
                <th className="table-head-phase">Phase</th>
                <th className="table-head-created">Created</th>
                <th className="table-head-updated">Updated</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => (
                <tr className="rooms" key={index}>
                  <td
                    onClick={() => navigate(`/room/${room.roomNumber}`)}
                    className="room-cell"
                  >
                    {room.roomNumber}
                  </td>
                  <td className="phase-cell">Phase {room.phase}</td>
                  <td className="created-cell">{room.created.split('T')[0]}</td>
                  <td className="updated-cell">{room.updated.split('T')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>

        
          
          </div>

         <button type="submit" style={{marginTop: '2rem'}} className="submit-button" onClick={addRoom}>Add Room</button>

      </div>
      )}

      {/* Buyer/Seller Profile Section */}
      {(role === 'buyer' || role === 'seller') && (
        <div style={{textAlign: 'center'}} className='dashboard-page'>
        <h2 className="dashboard-heading" style={{marginBottom: "2rem"}}> Your Filters</h2>
        <Filters />
      </div>
      )}

    </div>
  );
};

export default Dashboard;
