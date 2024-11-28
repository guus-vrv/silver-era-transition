import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom'; // Import useHistory from react-router-dom
import axiosInstance from '../Auth/AxiosInstance'; // Assuming AxiosInstance is set up for authenticated requests
import { jwtDecode as jwt_decode } from 'jwt-decode'; // if you want to keep calling it jwt_decode
import '../BuyersSellers/styles/ProfilesDisplay.css';

const API_URL = process.env.REACT_APP_API_URL; // Access the base URL from environment variable

const SelectChatProfiles = () => {

  const [activeProfileId, setActiveProfileId] = useState(null);
  const [message, setMessage] = useState('');
  const [profiles, setProfiles] = useState([]);
  const {roomNumber} = useParams();
  const [profilesToAdd, setProfilesToAdd] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const loc_groupChat = location.state?.groupChat // save group chat to add to new room if the user came from another page - WARNING: DIFFERENT NAME FOR THE SAME VARIABLE AS IN ADDROOM.JS
  const loc_profilesToAdd = location.state?.profilesToAdd; // save profiles to add to new room if the user came from another page - WARNING: DIFFERENT NAME FOR THE SAME VARIABLE AS IN ADDROOM.JS

  useEffect(() => {
    if (loc_profilesToAdd)
    {
      setProfilesToAdd(loc_profilesToAdd);
    }
    
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axiosInstance.get(`${API_URL}/api/profiles/broker-connected-users`);
      setProfiles(response.data.profiles);

    } catch (error) {
      console.error('Error fetching profiles data:', error);
    }

};

  useEffect(() => {
    fetchProfiles();
  }, []);

  const showInvite = (profileId) => {
    setActiveProfileId(profileId); // Set the active profile ID to the clicked profile
  };

  const closeInvite = () => {
    setActiveProfileId(null); // Clear the active profile ID to close the pop-up
  };

  const addProfile = (profileId) => {
      // add profile to state variable
  
      setProfilesToAdd([...profilesToAdd, profileId]);
      setActiveProfileId('');
    };

  const deleteProfile = (profileId) => {
    setProfilesToAdd(profilesToAdd => profilesToAdd.filter(profile => profile !== profileId));

  }

  const submitChoice =  async () => {
    try {
        const response = await axiosInstance.post(`${API_URL}/api/groupchat/create-from-members`, profilesToAdd);
        navigate(`/add-room/${roomNumber}`, { state: { groupChat: response.data.groupChat._id, profilesToAdd: profilesToAdd } });
        // when the profiles are fetched the broker will be able to select the members he wants to add to the room. This is similar logic to the Saved/Skipped profiles you will see later.
      } catch (error) {
        console.error('Error creating groupchat:', error);
      }
  }


  return (
    <div>
      <button className='back-button' onClick={() => navigate(`/add-room/${roomNumber}`, {state: {groupChat: loc_groupChat, profilesToAdd: profilesToAdd}})}>Back</button>

      <div className="profiles-container">
    
        {profiles.map(profile => (

        <div className="profile-card" key={profile.profile.user}>
          <img
            src={profile.profile.profilePicture ? `${API_URL}${profile.profile.profilePicture}` : ''} // Default image if not available
            alt={profile.profile.name}
            className="profile-picture"
          />
          <h3 className="profile-name">{profile.profile.name}</h3>
          <p className="about-section">{profile.profile.introduceYourself}</p>

          {profilesToAdd.includes(profile.profile.user) ? (<button className="button" style={{backgroundColor: 'red'}} onClick={() => deleteProfile(profile.profile.user)}>
              Remove
          </button> ) : (activeProfileId !== profile.profile.user && (
            <button className="invite-button" onClick={() => showInvite(profile.profile.user)}>
              Choose
          </button> ))
            
          }
          
          {activeProfileId === profile.profile.user && (
            <div className="right-box">
              <div className="invite-box">
                <div className="invite-profile-container">
                  <button
                    className="invite-button"
                    onClick={() => addProfile(profile.profile.user)}
                  >
                    Add
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

    <button  style={{marginTop: '2rem'}} className='submit-button' onClick={() => submitChoice()}>Create Chat With Selected Profiles</button>
        
    
    </div>
    
  );
};

export default SelectChatProfiles;
