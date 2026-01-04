import React, { useState } from "react";
import "./LoginModal.css";
import { FaTwitter, FaTimes } from "react-icons/fa";

const LoginModal = ({ onClose, onSwitchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login Attempt:", { email, password });
  };

  return (
    <div className="lm-overlay" onClick={onClose}>
      <div className="lm-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="lm-header">
          <button className="lm-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
          <div className="lm-logo">
            <FaTwitter />
          </div>
          <div style={{ width: 30 }}></div> 
        </div>

        {/* Body */}
        <div className="lm-body">
          <h2 className="lm-title">Sign in to Twitter</h2>
          
          <form onSubmit={handleLogin}>
            <div className="lm-input-group">
                <input 
                  type="text" 
                  placeholder="Phone, email, or username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="lm-input"
                  required
                />
            </div>
            
            <div className="lm-input-group">
                <input 
                  type="password" 
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="lm-input"
                  required
                />
            </div>

            <button type="submit" className="lm-submit-btn">
              Log in
            </button>
          </form>

          <button className="lm-forgot-btn">Forgot password?</button>
          
          <div className="lm-footer">
            <p>
              Don't have an account? 
              <span className="lm-link" onClick={onSwitchToSignup}>Sign up</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;