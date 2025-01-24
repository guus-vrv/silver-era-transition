import { useNavigate, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../Auth/AxiosInstance';
import './styles/BasicsForm.css';

const API_URL = process.env.REACT_APP_API_URL; // Access the base URL from environment variable

const formatCurrency = (value) => {
  if (!value) return '';
  return `€${parseFloat(value).toLocaleString('en-US')}`;
};

const AboutYourBusiness = ({ onComplete }) => {
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    profilePicture: {
      type: String,
      default: ''
    },
    profilePicturePreview: '', // Preview URL for the uploaded picture
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
    revenueEUR: '',
    cashflowEUR: '',
    customerBase: '',
    companyCulture: ''
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

  const handleCurrencyChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters
    setFormData({
      ...formData,
      [name]: numericValue,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`${API_URL}/api/profiles`, {
        ...formData,
        completedPages: formData.completedPages.includes("AboutYourBusiness") ? formData.completedPages : [...formData.completedPages, "AboutYourBusiness"]
      });
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
      {success && <div className="success-message">{success}</div>} {/* Display success message */}

      <form onSubmit={handleSubmit} className="basics-form">
        <div className="form-group">
          {formData.profilePicturePreview && (
            <img src={formData.profilePicturePreview} alt="Profile" className="profile-picture" />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="business">Business Name</label>
          <input
            type="text"
            id="business"
            name="business"
            value={formData.business}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="businessLocation">Business Location</label>
          <input
            type="text"
            id="businessLocation"
            name="businessLocation"
            value={formData.businessLocation}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="salesVolumeEUR">Sales Volume (EUR)</label>
          <input
            type="text"
            id="salesVolumeEUR"
            name="salesVolumeEUR"
            value={formatCurrency(formData.salesVolumeEUR)}
            onChange={handleCurrencyChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="resultEUR">Result (EUR)</label>
          <input
            type="text"
            id="resultEUR"
            name="resultEUR"
            value={formatCurrency(formData.resultEUR)}
            onChange={handleCurrencyChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="employees">Employees</label>
          <input
            type="number"
            id="employees"
            name="employees"
            value={formData.employees}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="shareToBeTransferred">Share To Be Transferred (%)</label>
          <input
            type="number"
            id="shareToBeTransferred"
            name="shareToBeTransferred"
            value={formData.shareToBeTransferred || ''}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (value >= 0 && value <= 100) {
                handleChange(e);
              }
            }}
            placeholder="Enter share to be transferred (0-100)"
            min="0"
            max="100"
            step="0.01"
            required
          />
          <small>Enter the share to be transferred as a percentage (e.g., 25 for 25%).</small>
        </div>
        <div className="form-group">
          <label htmlFor="transactionBackground">Transaction Background</label>
          <textarea
            id="transactionBackground"
            name="transactionBackground"
            value={formData.transactionBackground}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="productMarketFit">Product Market Fit</label>
          <input
            type="text"
            id="productMarketFit"
            name="productMarketFit"
            value={formData.productMarketFit}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="valueProposition">Value Proposition</label>
          <textarea
            id="valueProposition"
            name="valueProposition"
            value={formData.valueProposition}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="profitMargin">Profit Margin (%)</label>
          <input
            type="number"
            id="profitMargin"
            name="profitMargin"
            value={formData.profitMargin || ''}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (value >= 0 && value <= 100) {
                handleChange(e);
              }
            }}
            placeholder="Enter profit margin (0-100)"
            min="0"
            max="100"
            step="0.01"
            required
          />
          <small>Enter the profit margin as a percentage (e.g., 25 for 25%).</small>
        </div>
        <div className="form-group">
          <label htmlFor="revenue">Revenue</label>
          <input
            type="text"
            id="revenue"
            name="revenue"
            value={formatCurrency(formData.revenueEUR)}
            onChange={handleCurrencyChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cashflow">Cashflow</label>
          <input
            type="text"
            id="cashflow"
            name="cashflow"
            value={formatCurrency(formData.cashflowEUR)}
            onChange={handleCurrencyChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerBase">Customer Base</label>
          <textarea
            id="customerBase"
            name="customerBase"
            value={formData.customerBase}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="companyCulture">Company Culture</label>
          <textarea
            id="companyCulture"
            name="companyCulture"
            value={formData.companyCulture}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default AboutYourBusiness;
