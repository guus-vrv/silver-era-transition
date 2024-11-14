// src/components/MyAccount.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom
import axiosInstance from '../Auth/AxiosInstance'; // Assuming AxiosInstance is set up for authenticated requests
import { jwtDecode as jwt_decode } from 'jwt-decode'; // if you want to keep calling it jwt_decode
import './styles/ProfilesDisplay.css';
import DiscoverProfile from './DiscoverProfile';

const API_URL = process.env.REACT_APP_API_URL; // Access the base URL from environment variable

const SavedProfiles = () => {

  const navigate = useNavigate();
  const [activeProfileId, setActiveProfileId] = useState(null);
  const [message, setMessage] = useState('');

  const [savedProfiles, setSavedProfiles] = useState([]);

  const fetchSavedProfiles = async () => {
    try {
      const response = await axiosInstance.get(`${API_URL}/api/message/saved`);
      setSavedProfiles(response.data);
    } catch (error) {
      console.error('Error fetching skipped profiles:', error);
    }
  };

  useEffect(() => {
    fetchSavedProfiles();
  }, []);

  const showInvite = (profileId) => {
    setActiveProfileId(profileId); // Set the active profile ID to the clicked profile
  };

  const closeInvite = () => {
    setActiveProfileId(null); // Clear the active profile ID to close the pop-up
  };

  const handleInvite = async (savedProfileId) => {
    // Implement your invite functionality here
      try {
        // creates group chat
        
        const groupChat = await axiosInstance.post(`${API_URL}/api/groupchat/create`, {
          receiverId: savedProfileId
        })
  
        if (message === '')
        {
          setMessage('Hey! Glad to connect!');
        }
  
        const response = await axiosInstance.post(`${API_URL}/api/groupchat/${groupChat.data.groupChat._id}/message`, {
          message: message, // Message content
        });
  
        setMessage('');
  
        if (response.status === 201) {
          alert('Invitation sent successfully!');
          closeInvite(); // Close the pop-up
          fetchSavedProfiles();
        } else {
          alert(`Failed to send invitation: ${response.data.error}`);
        }
      } catch (error) {
        console.error('Error sending invitation:', error);
        alert('Failed to send invitation. Please try again later.');
      }
    };


  return (
    <div className="profiles-container">

        {savedProfiles.map(profile => (

        <div className="profile-card" key={profile.profile.user}>
          <img
            src={profile.profile.profilePicture ? `${API_URL}${profile.profile.profilePicture}` : ''} // Default image if not available
            alt={profile.profile.name}
            className="profile-picture"
          />
          <h3 className="profile-name">{profile.profile.name}</h3>
         {/* HIER IN DE TOEKOMST READ MORE FUNCTIE */}
          {profile.hasConnection ? (
            <button className="invite-button" onClick={() => navigate(`/group-chat/${profile.groupChat._id}`)}>
            View Chat
          </button> ) : 
          (
            activeProfileId !== profile.profile.user ? (<button className="invite-button" onClick={() => showInvite(profile.profile.user)}>
            Invite
          </button>) : ''
            
          )}
          
          {activeProfileId === profile.profile.user && (
            <div className="right-box">
              <div className="invite-box">
                <div className="invite-profile-container">
                  <textarea
                    className="invite-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message here..."
                  />
                  <button
                    className="invite-button"
                    onClick={() => handleInvite(profile.profile.user)}
                  >
                    Invite to Connect
                  </button>
                  <button className="skip-button" onClick={closeInvite} style={{backgroundColor: 'red'}}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
            
          
          </div>
          
        ))}
    </div>
    
  );
};

export default SavedProfiles;