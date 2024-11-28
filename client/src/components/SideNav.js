// src/components/SideNav.js
import React, {useEffect, useState} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component
import { faHome, faUser, faBookmark, faInfoCircle, faEnvelope, faSearch, faRightFromBracket, faGauge, faBug } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
import './styles/SideNav.css'; // Add custom CSS for the sidebar
import customIcon from '../images/set-logo.webp';

const SideNav = () => {
  const [role, setRole] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null); // Voor dropdown status
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Retrieve the role from localStorage
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole); // Update the state with the role
    }

    setDropdownOpen(null);

  }, [location]);

  if (!role) {
    return null;
  }

  const toggleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  const closeDropdown = () => {
    setDropdownOpen(null);
  };

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
      <Link to="/dashboard"><img src={customIcon} alt="Custom Icon" className="custom-icon" href="/dashboard" /> </Link>
      </div>
      
      {/* App name */}
      <ul>
        <li>
          <Link to="/dashboard"><FontAwesomeIcon icon={faGauge} /> <span className='menu-link'>Dashboard</span></Link>
        </li>
        {role !== 'broker' && (
          <li>
          <Link to="/discover"> <FontAwesomeIcon icon={faSearch} /> <span className='menu-link'>Discover Profiles</span></Link>
        </li>
        )}
        {role !== 'broker' && (
          <li className="dropdown">
          <span className="dropdown-toggle" onClick={() => toggleDropdown("revisit")}>
            <Link><FontAwesomeIcon icon={faBookmark} /> <span className='menu-link'>Revisit Profiles</span></Link>
          </span>
          <ul className={`dropdown-menu ${dropdownOpen === "revisit" ? "show" : ""}`}>
            <li><Link to="/saved" onClick={closeDropdown}>Saved Profiles</Link></li>
            <li><Link to="/skipped" onClick={closeDropdown}>Skipped Profiles</Link></li>
          </ul>
        </li>
        )}

        <li>
          <Link to="/inbox"><FontAwesomeIcon icon={faEnvelope} /> <span className='menu-link'>Inbox</span></Link>
        </li>
         <li>
          <Link to="https://docs.google.com/document/d/1mylEajDY7N8dj38b9Ou7Gu9KUbZzOBZdmWpsNMLDQLY/edit?tab=t.0" target='_blank'><FontAwesomeIcon icon={faInfoCircle} /> <span className='menu-link'>Read the SET guide</span></Link>
        </li>
        <li>
          <Link to="https://forms.gle/qk2mXxxNNe2riVJm8" target='_blank'><FontAwesomeIcon icon={faBug} /> <span className='menu-link'>Report Issues</span></Link>
        </li>
        <li className="dropdown">
          <span className="dropdown-toggle" onClick={() => toggleDropdown("account")}>
            <Link><FontAwesomeIcon icon={faUser} /> <span className='menu-link'>My Account</span></Link>
          </span>
          <ul className={`dropdown-menu ${dropdownOpen === "account" ? "show" : ""}`}>
            {role !== 'broker' && <li><Link to="/edit-profile" onClick={closeDropdown}>Edit Profile</Link></li>}
            <li><Link to="/settings" onClick={closeDropdown}>Settings</Link></li>
            <li><Link to="/login" className="logout-link" onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} style={{marginRight: '0.5rem'}} /> Logout</Link></li>
          </ul>
        </li>
       
        
       

      </ul>
    </div>
  );
};

export default SideNav;
