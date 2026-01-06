import React, { useState } from "react";
import "./SignupModal.css";
import { FaTwitter, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { usersAPI } from "../../utils/api.js";
import { useAuth } from "../../context/AuthContext.jsx";

const SignupModal = ({ onClose }) => {
    // Required fields
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!userId.trim() || !password.trim() || !name.trim()) {
            setError("Please fill in all required fields");
            setIsLoading(false);
            return;
        }

        try {
            const newUser = {
                user_id: userId.trim(),
                passsword: password,
                name: name.trim(),
                email: email.trim() || "",
                bio: "",
                profileAvatar: `/pfp-images/pfp+${userId.trim()}.jpg`,
                profileBanner: `/banner-images/banner+${userId.trim()}.jpg`,
                followersList: [],
                followingList: [],
                joinedDate: new Date().toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                }),
                verified: false,
            };

            // Create user via API
            await usersAPI.create(newUser);

            // Automatically log in the new user
            const loginResult = await login(userId.trim(), password);

            if (loginResult.success) {
                onClose();
                navigate("/home");
            } else {
                setError("Account created but failed to log in. Please try logging in manually.");
            }
        } catch (err) {
            console.error("Signup error:", err);
            setError(err.message || "Failed to create account. Username might already exist.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='sm-overlay' onClick={onClose}>
            <div className='sm-container' onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className='sm-header'>
                    <button className='sm-close-btn' onClick={onClose}>
                        <FaTimes />
                    </button>

                    <div className='sm-logo'>
                        <FaTwitter />
                    </div>

                    <div style={{ width: 30 }}></div>
                </div>

                <div className='sm-content-scrollable'>
                    <div className='sm-body'>
                        <h2 className='sm-title'>Create your account</h2>

                        {error && (
                            <div
                                className='sm-error'
                                style={{
                                    color: "#f4212e",
                                    padding: "12px",
                                    marginBottom: "16px",
                                    background: "#fee",
                                    borderRadius: "8px",
                                    border: "1px solid #f4212e",
                                }}
                            >
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSignup}>
                            {/* Username */}
                            <div className='sm-input-group'>
                                <input
                                    type='text'
                                    placeholder='Username'
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    className='sm-input'
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className='sm-input-group'>
                                <input
                                    type='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='sm-input'
                                    required
                                />
                            </div>

                            {/* Name */}
                            <div className='sm-input-group'>
                                <input
                                    type='text'
                                    placeholder='Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='sm-input'
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className='sm-input-group'>
                                <input
                                    type='email'
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='sm-input'
                                />
                            </div>

                            {/* Date of Birth */}
                            <div className='sm-input-group'>
                                <span className='sm-dob-label'>Date of birth</span>
                                <p className='sm-dob-desc'>
                                    This will not be shown publicly. Confirm your own age.
                                </p>
                                <input
                                    type='date'
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    className='sm-input'
                                />
                            </div>

                            <button type='submit' className='sm-submit-btn' disabled={isLoading}>
                                {isLoading ? "Creating account..." : "Sign up"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupModal;
