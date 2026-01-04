import React from "react";
import "./LoginPage.css";
import { FaTwitter, FaSearch, FaUserFriends, FaCommentDots } from "react-icons/fa";

const LoginPages = () => {
  return (
    <div className="login-container">
      
      {/* Left Side (Blue Section) */}
      <div className="left-side">
        {/* bakground logo */}
        <div className="bg-logo">
          <FaTwitter />
        </div>
        
        <div className="info-list">
          <div className="info-item">
            <span className="icon"><FaSearch /></span>
            <span>Follow your interests.</span>
          </div>
          <div className="info-item">
            <span className="icon"><FaUserFriends /></span>
            <span>Hear what people are talking about.</span>
          </div>
          <div className="info-item">
            <span className="icon"><FaCommentDots /></span>
            <span>Join the conversation.</span>
          </div>
        </div>
      </div>

      {/* Right Side (White Section) */}
      <div className="right-side">
        
        <div className="content-wrapper">
          
          {/* small logo */}
          <div className="twitter-logo-small">
            <FaTwitter />
          </div>

          <h1 className="big-title">See what’s happening in the world right now</h1>
          
          <h2 className="sub-title">Join Twitter today.</h2>

          <div className="buttons-wrapper">
            <button className="btn btn-signup">Sign up</button>
            <button className="btn btn-login">Log in</button>
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default LoginPages;