import React from 'react';
import '../Home.css';  // Import the new CSS file

const Home = () => {
  return (
    <div className="home">
      <h1 className="heading">Welcome to SET!</h1>
      <div className="links">
        <a href="/login" className="link">
          Go to Login
        </a>
        <a href="/register" className="link">
          Go to Register
        </a>
      </div>
    </div>
  );
};

export default Home;
