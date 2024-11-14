import React from 'react';
import '../Home.css';  // Import the new CSS file

const Home = () => {
  return (
    <div className="home">
      <img src='/static/media/set-logo.a71ecc22017f294ed5f7.webp'></img>
      <h1 className="heading">Silver Era Transition</h1>
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
