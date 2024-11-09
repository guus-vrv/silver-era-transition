import { useNavigate, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../Auth/AxiosInstance';
import './styles/BasicsForm.css';

const API_URL = process.env.REACT_APP_API_URL; // Access the base URL from environment variable

const MoreAboutYou = ({onComplete}) => {
  // Define the form state
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    profilePicture: {
        type: String,
        default: ''
    },
    profilePicturePreview: '', // Preview URL for the uploaded picture
    leadershipStyle: '',
    interests: '',
    vision: '',
    businessModelCanvas: '', // seller only
    personalValues: '',
    goals: '',
    reasonForSelling: '', // seller only
    reasonForBuying: '', // buyer only
    currentPosition: '', // buyer only
    freeTimeActivities: '',
    postSaleInvolvement: '',
    completedPages: []
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
        try {
            const res = await axiosInstance.get(`${API_URL}/api/profiles`);
            const profilePictureUrl = res.data.profilePicture ? `${API_URL}${res.data.profilePicture}` : ''; // Construct full URL
            setRole(res.data.user.role);
            setFormData(res.data);
            setFormData((prev) => ({
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

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      // Now send the rest of the form data
      await axiosInstance.put(`${API_URL}/api/profiles`, {...formData, completedPages: formData.completedPages.includes("MoreAboutYou") ? formData.completedPages : [...formData.completedPages, "MoreAboutYou"]});
      setSuccess('Successfully saved profile');        
      onComplete();
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Error occurred: ', error.message);
    }
  };


  return (

    <div>
    {error && <div className="error-message">{error}</div>} {/* Display error message */}
    {success && <div className="success-message">{success}</div>} {/* Display error message */}

    <form onSubmit={handleSubmit} className="basics-form">
      {/* Profile Picture Upload */}
      <div className="form-group">
        {formData.profilePicturePreview && (
           <img src={formData.profilePicturePreview} alt="Profile" className="profile-picture" />
        )}
      </div>

      {/* Name and Last Name */}
      <div className="form-row">
        <div className="form-group">
            <label htmlFor="leadershipStyle">
            Leadership Style
            <p>
            Write a paragraph or two about your background and what you're looking for. Cover your professional accomplishments and interests,  it's ok to get a little personal here as well!
            </p>
            </label>
            <textarea
            id="leadershipStyle"
            name="leadershipStyle"
            value={formData.leadershipStyle}
            onChange={handleChange}
            rows="6"
            required
            ></textarea>
        </div>
      </div>

      <div className="form-group">
          <label htmlFor="interests">Interests</label>
          <input
            type="text"
            id="interests"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            required
          />
        </div>

      {/* Age */}
      <div className="form-group">
        <label htmlFor="vision">Vision</label>
        <input
          type="text"
          id="vision"
          name="vision"
          value={formData.vision}
          onChange={handleChange}
          required
        />
      </div>

      {/* Location */}
      {role === 'seller' && (
        <div className="form-group">
        <label htmlFor="businessModelCanvas">Business Model Canvas</label>
        <input
          type="text"
          id="businessModelCanvas"
          name="businessModelCanvas"
          value={formData.businessModelCanvas}
          onChange={handleChange}
          required
        />
      </div>
      )}
      

      {/* Nationality */}
      <div className="form-group">
        <label htmlFor="personalValues">Personal Values</label>
        <input
          type="text"
          id="personalValues"
          name="personalValues"
          value={formData.personalValues}
          onChange={handleChange}
          required
        />
      </div>

      {/* Introduce Yourself */}
      <div className="form-group">
        <label htmlFor="goals">Goals</label>
        <input
          type="text"
          id="goals"
          name="goals"
          value={formData.goals}
          onChange={handleChange}
          required
        />
      </div>

      {/* Accomplishments */}
      {role === 'seller' && (
      <div className="form-group">
        <label htmlFor="reasonForSelling">Reason For Selling</label>
        <textarea
          id="reasonForSelling"
          name="reasonForSelling"
          value={formData.reasonForSelling}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>
      </div>
      )}

      {role === 'buyer' && (
      <div className="form-group">
        <label htmlFor="reasonForBuying">Reason For Buying</label>
        <textarea
          id="reasonForBuying"
          name="reasonForBuying"
          value={formData.reasonForBuying}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>
      </div>
      )}

      {role === 'buyer' && (
      <div className="form-group">
        <label htmlFor="currentPosition">Current Position</label>
        <textarea
          type="text"
          id="currentPosition"
          name="currentPosition"
          value={formData.currentPosition}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      )}


      {/* Background/Experience */}
      <div className="form-group">
        <label htmlFor="postSaleInvolvement">Post-Sale Involvement</label>
        <input
          type="text"
          id="postSaleInvolvement"
          name="postSaleInvolvement"
          value={formData.postSaleInvolvement}
          onChange={handleChange}
          required
        />
      </div>
      {/* Submit Button */}
      <button type="submit" className="submit-btn">
        Save Profile
      </button>
    </form>
    </div>
  );
};

export default MoreAboutYou;
