import React, { useState } from "react";
import "./SignupModal.css"; // Imports the scoped styles with 'sm-' prefix
import { FaTwitter, FaTimes } from "react-icons/fa";

const SignupModal = ({ onClose }) => {
  // 1. State management for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(""); // Date of Birth

  // 2. Form submission handler
  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signup Data Submitted:", { name, email, dob });
    // TODO: Connect to backend API
  };

  return (
    // Overlay: Dark background that covers the whole screen
    <div className="sm-overlay" onClick={onClose}>
      
      {/* Container: The white modal box */}
      <div className="sm-container" onClick={(e) => e.stopPropagation()}>
        
        {/* 
           HEADER SECTION 
           Placed OUTSIDE the scrollable area so it stays fixed at the top.
        */}
        <div className="sm-header">
          {/* Close Button (X) */}
          <button className="sm-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
          
          {/* Twitter Logo (Centered) */}
          <div className="sm-logo">
            <FaTwitter />
          </div>
          
          {/* Spacer for alignment balance */}
          <div style={{ width: 30 }}></div> 
        </div>

        {/* 
           SCROLLABLE WRAPPER 
           This div takes up the remaining height and handles scrolling.
           The scrollbar will appear on the right edge of this div.
        */}
        <div className="sm-content-scrollable">
            
            {/* Body: Contains the actual content and form */}
            <div className="sm-body">
              <h2 className="sm-title">Create your account</h2>
              
              <form onSubmit={handleSignup}>
                
                {/* Name Input */}
                <div className="sm-input-group">
                    <input 
                      type="text" 
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="sm-input"
                      required
                    />
                </div>
                
                {/* Email Input */}
                <div className="sm-input-group">
                    <input 
                      type="email" 
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="sm-input"
                      required
                    />
                </div>

                {/* Date of Birth Section */}
                <div className="sm-input-group">
                    <span className="sm-dob-label">Date of birth</span>
                    <p className="sm-dob-desc">
                        This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.
                    </p>
                    <input 
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="sm-input"
                      style={{ cursor: 'pointer' }}
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="sm-submit-btn">
                  Sign up
                </button>
                
              </form>
            </div>
        </div>
        {/* End of Scrollable Wrapper */}

      </div>
    </div>
  );
};

export default SignupModal;