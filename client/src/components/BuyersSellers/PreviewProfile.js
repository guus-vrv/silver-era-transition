import React, { useEffect, useState } from 'react';
import './styles/DiscoverProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faBookmark, faCheck } from '@fortawesome/free-solid-svg-icons'; 
import axiosInstance from '../Auth/AxiosInstance';

const API_URL = process.env.REACT_APP_API_URL; // Access the base URL from environment variable

const PreviewProfile = () => {
    const [profile, setProfile] = useState({
        profilePicture: {
            type: String,
            default: ''
        },
        name: '', // Preview URL for the uploaded picture
        lastName: '',
        introduceYourself: '',
        backgroundExperience: '',
        vision: '',
        interests: '',
      });

  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchProfile = async () => {
        try {
            const res = await axiosInstance.get(`${API_URL}/api/profiles`);
            const profilePictureUrl = res.data.profilePicture ? `${API_URL}${res.data.profilePicture}` : ''; // Construct full URL
            setProfile(res.data);
            setProfile((prev) => ({
                ...prev,
                profilePicturePreview: profilePictureUrl, // Set initial preview from fetched data
              }));
        } catch (err) {
            if (err.response && err.response.status === 404) {
                alert('No profile information found for this user.');
            } else {
                alert('Error retrieving profile data.');
            }
        }
    };

    fetchProfile();
}, []);

  if (error) {
    return <div className="error-message">{error}</div>; // Display error if there's one
  }

  if (!profile) {
    return <div>Loading...</div>; // Show loading while fetching
  }

  return (
    <div className='preview-profile'>
       <div className="discover-profile-container">
          <div className="top-container">
            <div className="profile-box">
              <div className="form-group">
                  {profile.profilePicturePreview && (
                  <img src={profile.profilePicturePreview} alt="Profile" className="profile-picture" />
                  )}
              </div>
              <h2 className="user-name">{profile.name} {profile.lastName}</h2>
              <button className="save-profile" >
                <FontAwesomeIcon icon={faCheck} style={{color: 'green'}}/>
                  
              </button>
            </div>
          </div>

          <div className="bottom-container">
            <div className="left-box">
              <div className="info-box">
                <h3>About</h3>
                <p>{profile.introduceYourself}</p>
              </div>
              <div className="info-box">
                <h3>My Background</h3>
                <p>{profile.backgroundExperience}</p>
              </div>
              <div className="info-box">
                <h3>Ideal Match</h3>
                <p>{profile.descriptionOfIdealMatch}</p>
              </div>
              <div className="info-box">
                <h3>Shared Interests</h3>
                <p>{profile.interests}</p>
              </div>
            </div>

            <div className="right-box">
              <div className="invite-box">
                {/* INVITE  */}
                <div className="invite-profile-container">
                  <textarea
                    className="invite-input"
                    placeholder="Enter your message here..."
                    disabled
                  />
                  <button className="invite-button">
                    Invite to Connect
                  </button>
                  <button className="skip-button">
                    Skip for Now
                  </button>
                </div>
              </div>
              
              <div className="filter-box" style={{marginTop: '20px'}}>
                <div style={{marginTop: '.5rem'}} className="filter-title">
                  <h3>Your Filters</h3>
                      
                </div>
              
                
                <button className="button"> Edit Filters</button>
              </div>
              

            </div>
          </div>

          </div>
    </div>
  );
};

export default PreviewProfile;
