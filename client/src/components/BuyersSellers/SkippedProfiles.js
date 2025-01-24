// src/components/MyAccount.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom
import axiosInstance from '../Auth/AxiosInstance'; // Assuming AxiosInstance is set up for authenticated requests
import { jwtDecode as jwt_decode } from 'jwt-decode'; // if you want to keep calling it jwt_decode
import './styles/ProfilesDisplay.css';
import './styles/ViewProfile.css';
import DiscoverProfile from './DiscoverProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faClose } from '@fortawesome/free-solid-svg-icons'; 

const API_URL = process.env.REACT_APP_API_URL; // Access the base URL from environment variable

const SkippedProfiles = () => {

  const [skippedProfiles, setSkippedProfiles] = useState([]);
  const navigate = useNavigate();
  const [activeProfileId, setActiveProfileId] = useState(null);
  const [profileView, setProfileView] = useState(null);
  const [message, setMessage] = useState('');
  const [reachCount, setReachCount] = useState(0);


  const fetchReachCount = async () => {
      try {
        const response = await axiosInstance.get(`${API_URL}/api/profiles`);
        setReachCount(response.data.reachCount ? response.data.reachCount : 0);
      }
      catch (err) {
        if (err.response && err.response.status === 404) {
          console.log(err);
        }
      }
  }


  const fetchSkippedProfiles = async () => {
    try {
      const response = await axiosInstance.get(`${API_URL}/api/message/skipped`);
      setSkippedProfiles(response.data);
    } catch (error) {
      console.error('Error fetching skipped profiles:', error);
    }
  };

  useEffect(() => {
    fetchReachCount();
    fetchSkippedProfiles();
  }, []);


  const handleInvite = async (skippedProfileId) => {
    try {
      // creates group chat
      
      const groupChat = await axiosInstance.post(`${API_URL}/api/groupchat/create`, {
        receiverId: skippedProfileId
      })

      if (message === '')
      {
        setMessage('Hey! Glad to connect!');
      }

      const response = await axiosInstance.post(`${API_URL}/api/groupchat/${groupChat.data.groupChat._id}/message`, {
        message: message, // Message content
      });

      setMessage('');

      const res = await axiosInstance.put(`${API_URL}/api/profiles/update-count`);

      if (response.status === 201) {
        alert('Invitation sent successfully!');
        fetchReachCount();
        closeInvite(); // Close the pop-up
        fetchSkippedProfiles();
      } else {
        alert(`Failed to send invitation: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error sending invitation:', error);
      alert('Failed to send invitation. Please try again later.');
    }
  };

  const showInvite = (profileId) => {
    setActiveProfileId(profileId); // Set the active profile ID to the clicked profile
  };

  const closeInvite = (profileId) => {
    setActiveProfileId(null); // Clear the active profile ID to close the pop-up
  };

  const showProfile = (profileId) => {
    setProfileView(profileId); // Clear the active profile ID to close the pop-up
  };

  const closeShowProfile = (profileId) => {
    setProfileView(null); // Clear the active profile ID to close the pop-up
  };


    function getResetTime() {
      const now = new Date(); // Current date and time
      const currentDay = now.getDay(); // Day of the week (0 = Sunday)
      const daysUntilSunday = (7 - currentDay) % 7; // Days left to Sunday
  
      // Calculate the next Sunday at midnight
      const nextSundayMidnight = new Date(now);
      nextSundayMidnight.setDate(now.getDate() + daysUntilSunday);
      nextSundayMidnight.setHours(0, 0, 0, 0); // Set to midnight
  
      // Format the date as a string
      return nextSundayMidnight.toLocaleString("en-US", {
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };
  


  return (
    <div>

      {profileView ? (

        <div className="popup-overlay" onClick={closeShowProfile}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <div className='close-popup'>
            <FontAwesomeIcon icon={faClose} style={{color: 'red'}} className="close-popup-button" onClick={closeShowProfile} />
          </div>
          
          
          <DiscoverProfile profileId={profileView} />
        </div>
        </div>
      )
      
      : 
      
      (

      <div>

      {reachCount === 0 ? (

      <div className="reachouts">
      <span>You have <strong style={{color: 'red'}}>{reachCount} invites</strong> left</span>
      <span>Your invites reset at {getResetTime()}</span>
      </div>) 

      : 

      (<div className="reachouts">
      <span>You have <strong>{reachCount} invites</strong> left</span>
      </div>)
    
    }

<div className="profiles-container">
        {skippedProfiles.map((profile) => (
          <div className="profile-card" key={profile.profile.user}>
            <img
              src={
                profile.profile.profilePicture
                  ? `${API_URL}${profile.profile.profilePicture}`
                  : ''
              } // Default image if not available
              alt={profile.profile.name}
              className="profile-picture"
            />

            <button
              className="view-profile-button"
              onClick={() => showProfile(profile.profile.user)}
            >
              View Profile
            </button>

          </div>
        ))}
      </div>

      </div>

      )}

    </div>
      
  );
};

export default SkippedProfiles;