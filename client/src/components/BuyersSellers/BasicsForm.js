import { useNavigate, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../Auth/AxiosInstance';
import './styles/BasicsForm.css';

const API_URL = process.env.REACT_APP_API_URL; // Access the base URL from environment variable


const BasicsForm = ({onComplete}) => {
  // Define the form state
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    profilePicture: {
        type: String,
        default: ''
    },
    profilePicturePreview: '', // Preview URL for the uploaded picture
    name: '',
    lastName: '',
    age: '',
    location: '',
    nationality: '',
    introduceYourself: '',
    accomplishments: '',
    backgroundExperience: '',
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
            console.log(res.data);
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

    console.log(formData.completedPages);
}, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle profile picture upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      profilePicture: file,
      profilePicturePreview: URL.createObjectURL(file), // Create a URL for preview
    }));
    e.target.value = ''; // Reset the file input
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const profilePicture = formData.profilePicture;

      let profilePictureUrl;
  
      if (profilePicture instanceof File) {
        const imageData = new FormData();
        imageData.append('profilePicture', profilePicture);
  
        const response = await axiosInstance.post(`${API_URL}/api/uploads/uploadProfilePicture`, imageData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
  
          profilePictureUrl = response.data.profilePicture; // Get the URL from the upload response
        }
  
      // Now send the rest of the form data
      await axiosInstance.put(`${API_URL}/api/profiles`, {
        ...formData,
        profilePicture: profilePictureUrl || formData.profilePicture, // Use the URL if it exists, otherwise keep the previous
        completedPages: formData.completedPages.includes("BasicsForm") ? formData.completedPages : [...formData.completedPages, "BasicsForm"]
      });

      setSuccess('Successfully saved profile!');  
      onComplete();
      

    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };


  return (

    <div style={{marginTop: '2rem'}}>
      {error && <div className="error-message">{error}</div>} {/* Display error message */}
      {success && <div className="success-message">{success}</div>} {/* Display error message */}

    <form onSubmit={handleSubmit} className="basics-form">
      {/* Profile Picture Upload */}
      <div className="form-group">
        {formData.profilePicturePreview && (
           <img src={formData.profilePicturePreview} alt="Profile" className="profile-picture" />
        )}
        <label htmlFor="profilePicture">Profile Picture</label>
        <input
          type="file"
          id="profilePicture"
          name="profilePicture"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>

      {/* Name and Last Name */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Age */}
      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>

      {/* Location */}
      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      {/* Nationality */}
      <div className="form-group">
        <label htmlFor="nationality">Nationality</label>
        <input
          type="text"
          id="nationality"
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          required
        />
      </div>

      {/* Introduce Yourself */}
      <div className="form-group">
        <label htmlFor="introduceYourself">
          Introduce Yourself
          <p>
            Write a paragraph or two about your background and what you're
            looking for. Cover your professional accomplishments and interests,
            it's ok to get a little personal here as well!
          </p>
        </label>
        <textarea
          id="introduceYourself"
          name="introduceYourself"
          value={formData.introduceYourself}
          onChange={handleChange}
          rows="6"
          required
        ></textarea>
      </div>

      {/* Accomplishments */}
      <div className="form-group">
        <label htmlFor="accomplishments">Accomplishments</label>
        <textarea
          id="accomplishments"
          name="accomplishments"
          value={formData.accomplishments}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>
      </div>

      {/* Background/Experience */}
      <div className="form-group">
        <label htmlFor="backgroundExperience">
          Background / Experience
        </label>
        <textarea
          id="backgroundExperience"
          name="backgroundExperience"
          value={formData.backgroundExperience}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>
      </div>

      {/* Submit Button */}
      <button type="submit" className="submit-btn">
        Save Profile
      </button>
    </form>
    </div>
  );
};

export default BasicsForm;
