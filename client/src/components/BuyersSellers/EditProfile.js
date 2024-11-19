// src/components/MyAccount.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom
import axiosInstance from '../Auth/AxiosInstance'; // Assuming AxiosInstance is set up for authenticated requests
import { jwtDecode as jwt_decode } from 'jwt-decode'; // if you want to keep calling it jwt_decode
import BasicsForm from './BasicsForm';
import MoreAboutYou from './MoreAboutYou';
import BuyerPreferences from './BuyerPreferences';
import PreviewProfile from './PreviewProfile';
import AboutYourBusiness from './AboutYourBusiness';

const API_URL = process.env.REACT_APP_API_URL; // Access the base URL from environment variable


const EditProfile = () => {

  const [selectedOption, setSelectedOption] = useState('basics'); // Default: Edit Profile
  const [progress, setProgress] = useState(0);

  const role = localStorage.getItem('role');

  const fetchCompletion = async() => {
    try {
      const res = await axiosInstance.get(`${API_URL}/api/profiles`);
      setProgress(Math.floor(res.data.completedPages.length * (1/3) * 100));
    }
    catch (err)
    {
      console.log(err);
      alert('Error occurred');
    }
  }

  useEffect(() => {
    fetchCompletion();


  }, []);

  const renderFormContent = () => {
    switch (selectedOption) {
      case 'basics':
        return (
          <>
              <div className="edit-profile-form">
                <h1 className="edit-profile-title">Basics</h1>
                <p>Note: Your account remains anonymous until you and your broker decide to reveal it with the prospect.</p>
              <BasicsForm  onComplete={fetchCompletion} />
  
            </div>
          </>
        );
      case 'moreAboutYou':
        return (
          <>
              <div className="edit-profile-form">
                <h1 className="edit-profile-title">More About You</h1>
                <MoreAboutYou  onComplete={fetchCompletion} />
            </div>
          </>
        );
      case 'aboutBusiness':
        return (
          <>
              <div className="edit-profile-form">
                <h1 className="edit-profile-title">About Your Business</h1>
              <AboutYourBusiness  onComplete={fetchCompletion} />
  
            </div>
          </>
        );
      case 'buyerPreferences':
        return (
          <>
              <div className="edit-profile-form">
                <h1 className="edit-profile-title">{role === 'buyer' ? 'Seller' : 'Buyer'} Prefences</h1>
                <BuyerPreferences  onComplete={fetchCompletion} />
            </div>
          </>
        );
      case 'previewProfile':
        return (
          <>
              <div className="edit-profile-form">
                <h1 className="edit-profile-title">Preview Profile</h1>
                <PreviewProfile  onComplete={fetchCompletion}/>
            </div>
          </>
        );
      default:
        return <p>Select an option from the left to edit your account.</p>;
      }
  };

  return (

    <div>




      <h2 style={{textAlign: 'center', padding: '20px'}}>Edit Profile</h2>

      <div className="edit-profile-container">
        {/* Left Box (20%) */}
        <div className="box-left">
          <button className='option-btn' onClick={() => setSelectedOption('basics')}>Basics</button>
          <button className='option-btn'  onClick={() => setSelectedOption('moreAboutYou')}>More About You</button>
          {role === 'seller' && (<button className='option-btn'  onClick={() => setSelectedOption('aboutBusiness')}>About Your Business</button> )}
          <button className='option-btn'  onClick={() => setSelectedOption('buyerPreferences')}>{role === 'buyer' ? 'Seller' : 'Buyer'} Preferences</button>
          <button  className='option-btn' onClick={() => setSelectedOption('previewProfile')}>Preview Your Profile</button>

          {/* PROGRESS TRACKER */}

      <div className="progress-tracker" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h2 style={{textAlign: 'center', padding: '20px'}}>{progress}% Completed</h2>
          <div style={{width: '10rem', height: '10px', backgroundColor: 'lightgray', borderRadius: '5px'}}>
            <div style={{width: toString(progress).concat("%"), height: '100%', backgroundColor: 'green', borderRadius: '5px'}}></div>
          </div>
            
            
          </div>
        </div>

        {/* Right Box (80%) */}
        <div className='box-right'>
                {renderFormContent()}
        </div>
      </div>

    </div>
  );
};

export default EditProfile;
