// components/RoomDetails.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../Auth/AxiosInstance';
import './styles/Room.css'; // Import the CSS for styles
import { useNavigate, useParams } from 'react-router-dom';
import GroupChat from '../GroupChat';

const API_URL = process.env.REACT_APP_API_URL; // Access the base URL from environment variable

const Room = () => {
  const navigate = useNavigate();
  const [room, setRoom] = useState({});
  const {roomNumber} = useParams();
  const [activeTab, setActiveTab] = useState('members'); // State for active tab

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axiosInstance.get(`${API_URL}/api/room/${roomNumber}`);
        setRoom(response.data);
        //response.data -> reports [], participants [], phase
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    }

    fetchRoomData();

  }, []);

  const renderTab = () => {
    switch (activeTab) {

        case 'members':
          return (
            <>
                  <div className="participants-pictures">
                    {room.participants ? (room.participants.map((participant) => {
                      return (
                        <div>

                        <img 
                          key={participant.userId} 
                          src={participant.profile.profilePicture ? `${API_URL}${participant.profile.profilePicture}` : `${API_URL}/uploads/broker.png`}
                          alt={`${participant.name}'s profile`} 
                          className="participant-picture"
                          style={{textAlign: 'center', marginTop: '1rem', marginRight: '1rem'}}
                        />

                        <p style={{textAlign: 'center', marginTop: '1rem', marginRight: '1rem'}}><strong>{participant.userDetails.name}</strong></p>

                      </div>

                    );

                  })) : (<p><strong>No members</strong></p>) } 

                  </div>
                          
              
              </>
            );

            case 'chat':
              return (
                <>
                      <GroupChat groupChatId={room.groupChatId}/>
                    
                </>
              );
      default:
        return <p>Select an option at the top to view the information.</p>;
      }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab); // Change the active tab

  };

  const handleDeleteRoom = async () => {
    try {
      const response = await axiosInstance.delete(`${API_URL}/api/room/${roomNumber}`);
    } catch (error) {
      console.error('Error deleting room', error);
    }
  }

  return (
    <div className="room-details">
      {/* Tabs for navigation */}
      <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>Room {roomNumber}</h2>

      <div className="tabs">
         <button className='button' onClick={() => navigate('/dashboard')}>Back</button>
        <button 
          onClick={() => handleTabChange('members')} 
          className={activeTab === 'members' ? 'active button' : 'button'}
        >
          Members
        </button>
        <button 
          onClick={() => handleTabChange('chat')} 
          className={activeTab === 'chat' ? 'active button' : 'button'}
        >
          Chat
        </button>
        <button className='button' style={{backgroundColor: 'red'}} onClick={() => {
          if (window.confirm("Are you sure you want to delete this room?")) {
            handleDeleteRoom();
            navigate('/dashboard');
          } 
        
        }}>Delete Room</button>


      </div>

      <div className='tab'>
        {renderTab()}
      </div>

      
   
    </div>
  );
};

export default Room;
