// src/components/Layout.js
import React from 'react';
import SideNav from './SideNav';
import './styles/Layout.css'; // Import CSS for layout

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <SideNav /> {/* Sidebar always visible on the left */}
      <div className="content">
        {children} {/* Dynamic content based on route */}
      </div>
    </div>
  );
};

export default Layout;
