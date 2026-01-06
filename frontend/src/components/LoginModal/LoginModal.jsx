import React, { useState } from "react";
import "./LoginModal.css";
import { FaTwitter, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const LoginModal = ({ onClose, onSwitchToSignup }) => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!identifier.trim()) {
            setError("Please enter your username or email");
            setIsLoading(false);
            return;
        }

        if (!password.trim()) {
            setError("Please enter your password");
            setIsLoading(false);
            return;
        }

        const result = await login(identifier.trim(), password.trim());

        if (result.success) {
            onClose();
            navigate("/home");
        } else {
            setError(result.error || "Invalid credentials. Please try again.");
        }

        setIsLoading(false);
    };

    return (
        <div className='lm-overlay' onClick={onClose || (() => {})}>
            <div className='lm-container' onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className='lm-header'>
                    {onClose && (
                        <button className='lm-close-btn' onClick={onClose}>
                            <FaTimes />
                        </button>
                    )}
                    {!onClose && <div className='lm-placeholder'></div>}
                    <div className='lm-logo'>
                        <FaTwitter />
                    </div>
                    <div className='lm-placeholder'></div>
                </div>

                {/* Body */}
                <div className='lm-body'>
                    <h2 className='lm-title'>Sign in to Twitter</h2>

                    {error && <div className='lm-error'>{error}</div>}

                    <form onSubmit={handleLogin}>
                        <div className='lm-input-group'>
                            <input
                                type='text'
                                placeholder='Username or email (e.g., a-partovii)'
                                value={identifier}
                                onChange={(e) => {
                                    setIdentifier(e.target.value);
                                    setError("");
                                }}
                                className='lm-input'
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div className='lm-input-group'>
                            <input
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError("");
                                }}
                                className='lm-input'
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <button type='submit' className='lm-submit-btn' disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Log in"}
                        </button>
                    </form>

                    <button className='lm-forgot-btn'>Forgot password?</button>

                    <div className='lm-footer'>
                        <p>
                            Don't have an account?
                            <span className='lm-link' onClick={onSwitchToSignup}>
                                Sign up
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
