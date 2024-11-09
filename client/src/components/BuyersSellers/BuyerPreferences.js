import { useNavigate, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../Auth/AxiosInstance';
import './styles/BasicsForm.css';

const API_URL = process.env.REACT_APP_API_URL; // Access the base URL from environment variable

const BuyerPreferences = ({onComplete}) => {
  // Define the form state
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    profilePicture: {
        type: String,
        default: ''
    },
    profilePicturePreview: '', // Preview URL for the uploaded picture
    timeFrame: '',
    typeOfSale: '',
    buyerIndustry: '', // buyer only
    buyerLocation: '', // buyer only
    sellerIndustry: '', // seller only
    sellerLocation: '', // seller only
    descriptionOfIdealMatch: '',
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
      await axiosInstance.put(`${API_URL}/api/profiles`, {...formData, completedPages: formData.completedPages.includes("BuyerPreferences") ? formData.completedPages : [...formData.completedPages, "BuyerPreferences"]});
      setSuccess('Successfully saved profile!');        
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

      <div className="form-group">
          <label htmlFor="timeFrame">Timeframe</label>
          <input
            type="text"
            id="timeFrame"
            name="timeFrame"
            value={formData.timeFrame}
            onChange={handleChange}
            required
          />
        </div>
  

      <div className="form-group">
        <label htmlFor="typeOfSale">Type Of Sale</label>
        <input
          type="text"
          id="typeOfSale"
          name="typeOfSale"
          value={formData.typeOfSale}
          onChange={handleChange}
          required
        />
      </div>

      {role === 'buyer' && (
      <div className="form-group">
        <label htmlFor="buyerIndustry">Buyer Industry</label>
        <input
          type="text"
          id="buyerIndustry"
          name="buyerIndustry"
          value={formData.buyerIndustry}
          onChange={handleChange}
          required
        />
      </div>
      )}

      {role === 'seller' && (
      <div className="form-group">
        <label htmlFor="sellerIndustry">Seller Industry</label>
        <input
          type="text"
          id="sellerIndustry"
          name="sellerIndustry"
          value={formData.sellerIndustry}
          onChange={handleChange}
          required
        />
      </div>
      )}

      {role === 'buyer' && (
      <div className="form-group">
        <label htmlFor="buyerLocation">Buyer Location</label>
        <input
          type="text"
          id="buyerLocation"
          name="buyerLocation"
          value={formData.buyerLocation}
          onChange={handleChange}
          required
        />
      </div>
      )}

      {role === 'seller' && (
      <div className="form-group">
        <label htmlFor="sellerLocation">Seller Location</label>
        <input
          type="text"
          id="sellerLocation"
          name="sellerLocation"
          value={formData.sellerLocation}
          onChange={handleChange}
          required
        />
      </div>
      )}
  
      <div className="form-group">
        <label htmlFor="descriptionOfIdealMatch">Description Of Ideal Match</label>
        <input
          type="text"
          id="descriptionOfIdealMatch"
          name="descriptionOfIdealMatch"
          value={formData.descriptionOfIdealMatch}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        Save Profile
      </button>

    </form>

    </div>
  );
};

export default BuyerPreferences;
