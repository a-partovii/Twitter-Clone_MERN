import React, { useState } from "react";
import "./CreateTweetModal.css";
import { FaTimes, FaImage } from "react-icons/fa";
import { tweetsAPI } from "../../utils/api.js";

const CreateTweetModal = ({ onClose, userId, onTweetCreated }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!text.trim()) {
      setError("Please enter some text for your tweet");
      return;
    }

    if (text.trim().length > 280) {
      setError("Tweet cannot exceed 280 characters");
      return;
    }

    setIsLoading(true);

    try {
      const tweetData = {
        text: text.trim(),
        image: image.trim() || "",
        authorId: userId,
      };

      const newTweet = await tweetsAPI.create(tweetData);
      
      // Clear form
      setText("");
      setImage("");
      
      // Notify parent component
      if (onTweetCreated) {
        onTweetCreated(newTweet);
      }
      
      // Close modal
      onClose();
    } catch (err) {
      console.error("Error creating tweet:", err);
      setError("Failed to create tweet. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setText("");
      setImage("");
      setError("");
      onClose();
    }
  };

  const remainingChars = 280 - text.length;

  return (
    <div className="ctm-overlay" onClick={handleClose}>
      <div className="ctm-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="ctm-header">
          <button className="ctm-close-btn" onClick={handleClose} disabled={isLoading}>
            <FaTimes />
          </button>
          <h2>Create Tweet</h2>
        </div>

        {/* Form */}
        <form className="ctm-form" onSubmit={handleSubmit}>
          {/* Text Area */}
          <div className="ctm-textarea-container">
            <textarea
              className="ctm-textarea"
              placeholder="What's happening?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={280}
              disabled={isLoading}
              rows={6}
            />
            <div className="ctm-char-count" style={{ color: remainingChars < 20 ? 'red' : 'inherit' }}>
              {remainingChars}
            </div>
          </div>

          {/* Image URL Input */}
          <div className="ctm-image-input-container">
            <FaImage className="ctm-image-icon" />
            <input
              type="url"
              className="ctm-image-input"
              placeholder="Image URL (optional)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Error Message */}
          {error && <div className="ctm-error">{error}</div>}

          {/* Actions */}
          <div className="ctm-actions">
            <button
              type="button"
              className="ctm-cancel-btn"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ctm-submit-btn"
              disabled={isLoading || !text.trim()}
            >
              {isLoading ? "Posting..." : "Tweet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTweetModal;
