import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import LoginModal from "../../components/LoginModal/LoginModal.jsx";
import SignupModal from "../../components/SignUpModal/SignUpModal.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { FaTwitter, FaSearch, FaUserFriends, FaCommentDots } from "react-icons/fa";

const LoginPages = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);

    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (isAuthenticated) {
                navigate("/home", { replace: true });
            } else {
                setIsLoginOpen(true);
            }
        }
    }, [isAuthenticated, loading, navigate]);

    if (loading || isAuthenticated) {
        return (
            <div className='loading-screen'>
                <FaTwitter className='loading-logo' />
            </div>
        );
    }

    const handleSwitchToSignup = () => {
        setIsLoginOpen(false);
        setIsSignupOpen(true);
    };

    const handleSwitchToLogin = () => {
        setIsSignupOpen(false);
        setIsLoginOpen(true);
    };

    return (
        <div className='login-container'>
            <div className='left-side'>
                <div className='bg-logo'>
                    <FaTwitter />
                </div>
                <div className='info-list'>
                    <div className='info-item'>
                        <FaSearch className='icon' />
                        <span>Follow your interests.</span>
                    </div>
                    <div className='info-item'>
                        <FaUserFriends className='icon' />
                        <span>Hear what people are talking about.</span>
                    </div>
                    <div className='info-item'>
                        <FaCommentDots className='icon' />
                        <span>Join the conversation.</span>
                    </div>
                </div>
            </div>

            <div className='right-side'>
                <div className='content-wrapper'>
                    <div className='twitter-logo-small'>
                        <FaTwitter />
                    </div>
                    <h1 className='big-title'>See what’s happening in the world right now</h1>
                    <h2 className='sub-title'>Join Twitter today.</h2>
                    <div className='buttons-wrapper'>
                        <button className='btn btn-signup' onClick={() => setIsSignupOpen(true)}>
                            Sign up
                        </button>
                        <button className='btn btn-login' onClick={() => setIsLoginOpen(true)}>
                            Log in
                        </button>
                    </div>
                </div>
            </div>

            {isLoginOpen && (
                <div className='modal-overlay'>
                    <LoginModal
                        onClose={() => setIsLoginOpen(false)}
                        onSwitchToSignup={handleSwitchToSignup}
                    />
                </div>
            )}

            {isSignupOpen && (
                <div className='modal-overlay'>
                    <SignupModal onClose={handleSwitchToLogin} />
                </div>
            )}
        </div>
    );
};

export default LoginPages;
