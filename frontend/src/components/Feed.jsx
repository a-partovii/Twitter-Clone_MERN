import React, { useState, useMemo, useRef, useEffect } from 'react';
import { sampleTweets, sampleUsers } from '../../../database/SampleData.js';
import Avatar from './Avatar'; // استفاده از کامپوننت آواتار هوشمند
import './Feed.css';


// React Icons
import {
  FaCheckCircle, FaEllipsisH, FaTrash, FaFlag, FaRetweet,
  FaStar, FaRegStar, FaRegComment, FaRegBookmark, FaBookmark
} from 'react-icons/fa';
import { FiShare } from "react-icons/fi"; // آیکون شیر استانداردتر


// --- Helper Functions ---
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};


// --- Sub-Component: Single Tweet ---
const Tweet = ({ tweet, currentUserId }) => {
  // States
  const [showMenu, setShowMenu] = useState(false);
  const [isLiked, setIsLiked] = useState(tweet.likes?.includes(currentUserId) || false);
  const [likesCount, setLikesCount] = useState(tweet.likes?.length || 0);
  const [isRetweeted, setIsRetweeted] = useState(tweet.retweets?.includes(currentUserId) || false);
  const [retweetsCount, setRetweetsCount] = useState(tweet.retweets?.length || 0);
  const [isBookmarked, setIsBookmarked] = useState(tweet.bookmarks?.includes(currentUserId) || false);

  // Refs for Click Outside
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMenu]);

  if (!tweet || !tweet.author) return null;

  // Handlers
  const isOwner = tweet.authorId === currentUserId;

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikesCount(prev => (isLiked ? prev - 1 : prev + 1));
  };

  const handleRetweet = (e) => {
    e.stopPropagation();
    setIsRetweeted(!isRetweeted);
    setRetweetsCount(prev => (isRetweeted ? prev - 1 : prev + 1));
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Delete this tweet?')) console.log('Deleted:', tweet.id);
    setShowMenu(false);
  };

  return (
    <article className="tweet">
      {/* Avatar Column */}
      <div className="tweet-avatar-section">
        <Avatar 
          src={tweet.author.profileAvatar} 
          name={tweet.author.name} 
          size="48px" 
        />
      </div>

      {/* Content Column */}
      <div className="tweet-content">
        
        {/* Header: Name, ID, Date, Menu */}
        <div className="tweet-header">
          <div className="tweet-author-info">
            <span className="tweet-author-name">{tweet.author.name}</span>
            {tweet.author.verified && <FaCheckCircle className="verified-badge" />}
            <span className="tweet-author-username">@{tweet.author.user_id}</span>
            <span className="tweet-separator">·</span>
            <span className="tweet-date">{formatDate(tweet.createdAt)}</span>
          </div>

          <div className="tweet-menu-container">
            <button 
              className="icon-button" 
              ref={buttonRef} 
              onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
            >
              <FaEllipsisH />
            </button>
            
            {showMenu && (
              <div className="tweet-menu-dropdown" ref={menuRef}>
                {isOwner && (
                  <button className="menu-item delete" onClick={handleDelete}>
                    <FaTrash /> Delete
                  </button>
                )}
                <button className="menu-item"><FaFlag /> Report</button>
              </div>
            )}
          </div>
        </div>

        {/* Body Text */}
        <p className="tweet-text">{tweet.text}</p>

        {/* Image Attachment */}
        {tweet.image && (
          <div className="tweet-image-container">
            <img src={tweet.image} alt="Tweet attachment" className="tweet-image" />
          </div>
        )}

        {/* Action Buttons (Reply, Retweet, Like, Share) */}
        <div className="tweet-actions">
          
          {/* 1. Reply */}
          <button className="tweet-action-btn reply">
            <div className="icon-wrapper"><FaRegComment /></div>
            <span>{tweet.replies?.length || 0}</span>
          </button>

          {/* 2. Retweet */}
          <button 
            className={`tweet-action-btn retweet ${isRetweeted ? 'active' : ''}`} 
            onClick={handleRetweet}
          >
            <div className="icon-wrapper"><FaRetweet /></div>
            <span>{retweetsCount}</span>
          </button>

          {/* 3. Like (Star) */}
          <button 
            className={`tweet-action-btn like ${isLiked ? 'active' : ''}`} 
            onClick={handleLike}
          >
            <div className="icon-wrapper">
              {isLiked ? <FaStar /> : <FaRegStar />}
            </div>
            <span>{likesCount}</span>
          </button>

          {/* 4. Bookmark */}
          <button 
            className={`tweet-action-btn bookmark ${isBookmarked ? 'active' : ''}`} 
            onClick={handleBookmark}
          >
            <div className="icon-wrapper">
              {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            </div>
          </button>
          
          {/* 5. Share */}
          <button className="tweet-action-btn share">
            <div className="icon-wrapper"><FiShare /></div>
          </button>

        </div>
      </div>
    </article>
  );
};


// --- Main Feed Component ---
const Feed = ({ userId = 'safa_dev' }) => {
  // Merge tweets with author data
  const tweetsWithAuthors = useMemo(() => {
    return sampleTweets
      .map(tweet => {
        const author = sampleUsers.find(user => user.user_id === tweet.authorId);
        return {
          ...tweet,
          author: author || {
            user_id: tweet.authorId,
            name: 'Unknown',
            profileAvatar: null,
            verified: false
          }
        };
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, []);

  return (
    <main className="feed-container">
      {/* Sticky Header */}
      <div className="feed-header">
        <h2>Home</h2>
      </div>

      {/* Tweet Input Box (Optional - Placeholder) */}
      <div className="tweet-input-placeholder">
        {/* بعداً فرم توییت زدن اینجا میاد */}
      </div>

      {/* Tweets List */}
      <div className="feed-list">
        {tweetsWithAuthors.map(tweet => (
          <Tweet key={tweet.id} tweet={tweet} currentUserId={userId} />
        ))}
      </div>
    </main>
  );
};

export default Feed;
