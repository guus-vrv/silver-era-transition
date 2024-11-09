// src/components/SideNav.js
import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component
import { faHome, faUser, faBookmark, faInfoCircle, faEnvelope, faSearch, faRightFromBracket, faGauge } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
import './styles/SideNav.css'; // Add custom CSS for the sidebar
import customIcon from '../images/set-logo.webp';

const SideNav = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the role from localStorage
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole); // Update the state with the role
    }
  }, []);

  if (!role) {
    return null; // You can show a loading spinner or placeholder if the role is not yet available
  }

  const handleLogout = () => {
    // Clear local storage or cookies
    localStorage.removeItem('role'); // Clear the role
    localStorage.removeItem('token'); // Clear the token (if applicable)

    // After clearing the storage, navigate to the login page
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="sidenav">
      <div>
      <img src={customIcon} alt="Custom Icon" className="custom-icon" /> 
      </div>
      
      {/* App name */}
      <ul>
        <li>
          <Link to="/dashboard"><FontAwesomeIcon icon={faGauge} /> Dashboard</Link>
        </li>
        {role !== 'broker' && (
          <li>
          <Link to="/discover"> <FontAwesomeIcon icon={faSearch} /> Discover Profiles</Link>
        </li>
        )}
        {role !== 'broker' && (
          <li className="dropdown">
          <span className="dropdown-toggle">
            <li>
              <Link><FontAwesomeIcon icon={faBookmark} /> Revisit Profiles</Link>
            </li>
          </span>
          <ul className="dropdown-menu">
            <li>
              <Link to="/saved">Saved Profiles</Link>
            </li>
            <li>
              <Link to="/skipped">Skipped Profiles</Link>
            </li>
          </ul>
        </li>
        )}

        <li>
          <Link to="/inbox"><FontAwesomeIcon icon={faEnvelope} /> Inbox</Link>
        </li>
         <li>
          <Link to="https://docs.google.com/document/d/1mylEajDY7N8dj38b9Ou7Gu9KUbZzOBZdmWpsNMLDQLY/edit?tab=t.0" target='_blank'><FontAwesomeIcon icon={faInfoCircle} /> Read the SET guide</Link>
        </li>
        <li className="dropdown">
          <span className="dropdown-toggle">
            <li>
            <Link><FontAwesomeIcon icon={faUser} /> My Account</Link>
            </li>
          </span>
          <ul className="dropdown-menu">
            {role !== 'broker' && (
            <li>
              <Link to="/edit-profile">Edit Profile</Link>
            </li>
            )}
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <Link to="/login" className="logout-link" onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} /> Logout</Link>
            </li>
          </ul>
        </li>
       
        
       

      </ul>
    </div>
  );
};

export default SideNav;
