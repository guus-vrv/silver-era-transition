import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/DiscoverProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faBookmark, faCheck } from '@fortawesome/free-solid-svg-icons'; 
import axiosInstance from '../Auth/AxiosInstance';

const API_URL = process.env.REACT_APP_API_URL; // Access the base URL from environment variable

const DiscoverProfile = () => {

  const [error, setError] = useState(null); // State for error handling
  const [profilesFound, setProfilesFound] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
   const [filters, setFilters] = useState([]);
   const [expandedSections, setExpandedSections] = useState({});
   const role = localStorage.getItem('role');


  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    profilePicture: {
      type: String,
      default: ''
    },
    profilePicturePreview: '',
    name: '',
    user: '',
    lastName: '',
    introduceYourself: '',
    backgroundExperience: '',
    descriptionOfIdealMatch: '',
    interests: '',
    business: '',
    businessLocation: '',
    salesVolumeEUR: '',
    resultEUR: '',
    employees: '',
    shareToBeTransferred: '',
    transactionBackground: '',
    productMarketFit: '',
    valueProposition: '',
    profitMargin: '',
    revenue: '',
    cashflow: '',
    customerBase: '',
    companyCulture: ''
  });
  

  const [message, setMessage] = useState('');

  const fetchFilters = async () => {
    try {
      const response = await axiosInstance.get(`${API_URL}/api/profiles/filters`);
      setFilters(response.data.filters ? response.data.filters : []);
    }
    catch (err) {
      if (err.response && err.response.status === 404) {
        console.log(err);
      }
    }
  };

  const fetchProfile = async () => {
    setBookmarked(false);

    try {
        const res = await axiosInstance.get(`${API_URL}/api/profiles/discover`);
        setProfilesFound(true);
        const profilePictureUrl = res.data.profilePicture ? `${API_URL}${res.data.profilePicture}` : ''; // Construct full URL
        setProfile(res.data);
        setProfile((prev) => ({
            ...prev,
            profilePicturePreview: profilePictureUrl, // Set initial preview from fetched data
          }));
    } catch (err) {
        if (err.response && err.response.status === 404) {
          setProfilesFound(false);
          console.log(err);
        }
    }
  };

  useEffect(() => {
      
      fetchFilters();

      fetchProfile();

  }, []);

  const toggleExpand = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const truncateText = (text, section) => { // shorten text if it is too lang and add read more link later
    const isExpanded = expandedSections[section];
    if (text.length <= 200 || isExpanded) {
      return text;
    }
    return `${text.slice(0, 200)}...`;
  };

  const handleInvite = async (receiverId) => {
    try {
      // creates group chat
      
      const groupChat = await axiosInstance.post(`${API_URL}/api/groupchat/create`, {
        receiverId
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
        fetchProfile();
      } else {
        alert(`Failed to send invitation: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error sending invitation:', error);
      alert('Failed to send invitation. Please try again later.');
    }
  };

  const handleBookmark = async (receiverId) => {
    // Logic for saving and skipping (if you want to save a user but not message them straight away)

        if(bookmarked)
        {
          try {
            const response = await axiosInstance.post(`${API_URL}/api/message/un-save`, {receiverId});
      
            if (response.status === 201) {
              // GO TO NEXT PROFILE
              setBookmarked(false);
            } else {
                alert(`Failed to un-save profile: ${response.data.error}`);
            }
      
        } 
       
          catch (err) {
              if (err.response && err.response.status === 404) {
                  alert('Profile not un-saved');
              } else {
                  alert('Error un-saving profile data.');
              }
          }
        }
        else
        {
              try {
                const response = await axiosInstance.post(`${API_URL}/api/message/save`, {receiverId});
          
                if (response.status === 201) {
                  // GO TO NEXT PROFILE
                  alert('Profile saved');
                  setBookmarked(true);
                } else {
                    alert(`Failed to save profile: ${response.data.error}`);
                }
          
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    alert('Profile not saved');
                } else {
                    alert('Error saving profile data.');
                }
            }
        }
      

  };

  
const handleSkip = async (receiverId) => {

  if (!bookmarked)
    // if the user is not saved, but only skipped we move on to the next profile
  {

    try {

        const response = await axiosInstance.post( `${API_URL}/api/message/skip`, {receiverId});

        if (response.status === 201) {
          // GO TO NEXT PROFILE
          fetchProfile();
        } else {
            alert(`Failed to skip profile: ${response.data.error}`);
        }

        } 
        catch (error) {
          console.error('Error skipping profile:', error);
          alert('Failed to skip profile. Please try again later.');
        }

  }

  else
  {
    fetchProfile();
  }
  

};

  return (
    <div>
      {profilesFound ? (
      <div className="discover-profile-container">
          <div className="top-container">
            <div className="profile-box">
              <div className="form-group">
                  {profile.profilePicturePreview && (
                  <img src={profile.profilePicturePreview} alt="Profile" className="profile-picture" />
                  )}
              </div>
              <h2 className="user-name">{profile.name} {profile.lastName}</h2>
              <button className="save-profile" onClick={() => handleBookmark(profile.user)}>
                {bookmarked ? <FontAwesomeIcon icon={faCheck} style={{color: 'green'}}/> : <FontAwesomeIcon icon={faBookmark} style={{color: '#385454'}} /> }
                  
              </button>
            </div>
          </div>

          <div className="bottom-container">
            <div className="left-box">
              <div className="info-box">
                <h3>About</h3>
                <p>

                {truncateText(profile.introduceYourself, 'introduceYourself')}
                  {profile.introduceYourself.length > 200 && (
                    <span style={{color: 'blue', textDecoration: 'underline'}} className="read-more" onClick={() => toggleExpand('introduceYourself')}>
                      {expandedSections['introduceYourself'] ? ' Read Less' : ' Read More'}
                    </span>
                  )}

                </p>
              </div>
              <div className="info-box">
                <h3>My Background</h3>
                <p>

                {truncateText(profile.backgroundExperience, 'backgroundExperience')}
                  {profile.backgroundExperience.length > 200 && (
                    <span style={{color: 'blue', textDecoration: 'underline'}} className="read-more" onClick={() => toggleExpand('backgroundExperience')}>
                      {expandedSections['backgroundExperience'] ? ' Read Less' : ' Read More'}
                    </span>
                  )}

                </p>
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
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message here..."
                  />
                  <button className="invite-button" onClick={() => handleInvite(profile.user)}>
                    Invite to Connect
                  </button>
                  <button className="skip-button" onClick={() => handleSkip(profile.user)}>
                    Skip for Now
                  </button>
                </div>
              </div>
              
              <div className="filter-box" style={{marginTop: '20px'}}>
                <div style={{marginTop: '.5rem'}} className="filter-title">
                  <h3>Your Filters</h3>
                      
                </div>
              
                
                <button className="button" onClick={() => navigate('/filters')}> Edit Filters</button>
              </div>

              {role === 'buyer' && profile.business && (
  
                  <div className="info-box business">
                    <h3>Business Details</h3>
                    <p><strong>{profile.business} in {profile.businessLocation}</strong></p>
                    <p><strong>Sales Volume:</strong> €{profile.salesVolumeEUR}</p>
                    <p><strong>Result:</strong> €{profile.resultEUR}</p>
                    <p><strong>Employees:</strong> {profile.employees}</p>
                    <p><strong>Share to Be Transferred:</strong> {profile.shareToBeTransferred}</p>
                    <p><strong>Transaction Background:</strong> {profile.transactionBackground}</p>
                    <p><strong>Product Market Fit:</strong> {profile.productMarketFit}</p>
                    <p><strong>Value Proposition:</strong> {profile.valueProposition}</p>
                  </div>
                
              )}

              

            </div>
          </div>

          </div>

          )
          : 
          
          (
            <div className="discover-profile-container" style={{display: 'flex', alignItems: 'center', marginTop: '30vh'}}>
              <h2 className="user-name">No profiles found</h2>
            </div>
          )
        
        }

      </div>

  );
};

export default DiscoverProfile;
