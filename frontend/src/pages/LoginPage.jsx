import React, { useState } from "react";
import "./LoginPage.css";
// 1. Import the actual Modal components
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignUpModal"; 
import { FaTwitter, FaSearch, FaUserFriends, FaCommentDots } from "react-icons/fa";

const LoginPages = () => {
  // State to handle visibility of the Login Modal
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  // State to handle visibility of the Signup Modal
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <div className="login-container">
      
      {/* --- Left Side (Blue Section) --- */}
      <div className="left-side">
        {/* Large background watermark logo */}
        <div className="bg-logo">
          <FaTwitter />
        </div>
        
        {/* List of features */}
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

      {/* --- Right Side (White Section) --- */}
      <div className="right-side">
        
        <div className="content-wrapper">
          
          {/* Small Twitter Logo */}
          <div className="twitter-logo-small">
            <FaTwitter />
          </div>

          {/* Main Headlines */}
          <h1 className="big-title">See what’s happening in the world right now</h1>
          <h2 className="sub-title">Join Twitter today.</h2>

          {/* Action Buttons */}
          <div className="buttons-wrapper">
            
            {/* 2. Clicking this sets isSignupOpen to TRUE */}
            <button 
              className="btn btn-signup"
              onClick={() => setIsSignupOpen(true)}
            >
              Sign up
            </button>
            
            {/* Clicking this sets isLoginOpen to TRUE */}
            <button 
              className="btn btn-login"
              onClick={() => setIsLoginOpen(true)} 
            >
              Log in
            </button>
          </div>
          
        </div>

      </div>

      {/* --- Modals Section --- */}
      {/* These components only render when their state is true */}
      
      {/* Login Modal */}
      {isLoginOpen && (
        <LoginModal onClose={() => setIsLoginOpen(false)} />
      )}
      
      {/* 
          3. Signup Modal - This is the fix. 
          It now renders the actual SignupModal component instead of the placeholder text.
      */}
      {isSignupOpen && (
        <SignupModal onClose={() => setIsSignupOpen(false)} />
      )}
      
    </div>
  );
};

export default LoginPages;