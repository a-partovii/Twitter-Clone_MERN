import React, { useState, useMemo } from 'react';
import { sampleTweets, sampleUsers } from '../../../../database/SampleData.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Feed.css';

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}m`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}h`;
  } else if (diffInSeconds < 604800) {
    return `${Math.floor(diffInSeconds / 86400)}d`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

const Tweet = ({ tweet, currentUserId }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLiked, setIsLiked] = useState(tweet.likes?.includes(currentUserId) || false);
  const [isRetweeted, setIsRetweeted] = useState(tweet.retweets?.includes(currentUserId) || false);
  const [isBookmarked, setIsBookmarked] = useState(tweet.bookmarks?.includes(currentUserId) || false);
  const [likesCount, setLikesCount] = useState(tweet.likes?.length || 0);
  const [retweetsCount, setRetweetsCount] = useState(tweet.retweets?.length || 0);

  if (!tweet || !tweet.author) return null;

  const isOwner = tweet.authorId === currentUserId;

  const handleLike = (e) => {
    e.stopPropagation();
    if (isLiked) {
      setIsLiked(false);
      setLikesCount(prev => Math.max(0, prev - 1));
    } else {
      setIsLiked(true);
      setLikesCount(prev => prev + 1);
    }
  };

  const handleRetweet = (e) => {
    e.stopPropagation();
    if (isRetweeted) {
      setIsRetweeted(false);
      setRetweetsCount(prev => Math.max(0, prev - 1));
    } else {
      setIsRetweeted(true);
      setRetweetsCount(prev => prev + 1);
    }
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this tweet?')) {
      // In the real app, this would call a delete function
      console.log('Delete tweet:', tweet.id);
    }
    setShowMenu(false);
  };

  return (
    <article className="tweet">
      <div className="tweet-avatar">
        <img 
          src={tweet.author.profileAvatar || '/empty-pfp.png'} 
          alt={tweet.author.name}
        />
      </div>

      <div className="tweet-content">
        <div className="tweet-header">
          <div className="tweet-author-info">
            <span className="tweet-author-name">
              {tweet.author.name}
            </span>
            {tweet.author.verified && (
              <i className="fas fa-check-circle verified-badge"></i>
            )}
            <span className="tweet-author-username">
              @{tweet.author.user_id}
            </span>
            <span className="tweet-separator">·</span>
            <span className="tweet-date">{formatDate(tweet.createdAt)}</span>
          </div>
          
          <div className="tweet-menu">
            <button 
              className="tweet-menu-button"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
            >
              <i className="fas fa-ellipsis-h"></i>
            </button>
            
            {showMenu && (
              <div className="tweet-menu-dropdown">
                {isOwner && (
                  <button 
                    className="menu-item delete"
                    onClick={handleDelete}
                  >
                    <i className="fas fa-trash"></i>
                    Delete
                  </button>
                )}
                <button className="menu-item">
                  <i className="fas fa-flag"></i>
                  Report
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="tweet-text">
          {tweet.text}
        </div>

        {tweet.image && (
          <div className="tweet-image-container">
            <img 
              src={tweet.image} 
              alt="Tweet" 
              className="tweet-image"
            />
          </div>
        )}

        <div className="tweet-actions">
          <button 
            className="tweet-action reply"
            title="Reply"
          >
            <i className="far fa-comment"></i>
            <span>{tweet.replies?.length || 0}</span>
          </button>

          <button 
            className={`tweet-action retweet ${isRetweeted ? 'active' : ''}`}
            onClick={handleRetweet}
            title="Retweet"
          >
            <i className="fas fa-retweet"></i>
            <span>{retweetsCount}</span>
          </button>

          <button 
            className={`tweet-action like ${isLiked ? 'active' : ''}`}
            onClick={handleLike}
            title="Like"
          >
            <i className={isLiked ? 'fas fa-heart' : 'far fa-heart'}></i>
            <span>{likesCount}</span>
          </button>

          <button 
            className={`tweet-action bookmark ${isBookmarked ? 'active' : ''}`}
            onClick={handleBookmark}
            title="Bookmark"
          >
            <i className={isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark'}></i>
          </button>

          <button 
            className="tweet-action share"
            title="Share"
          >
            <i className="fas fa-upload"></i>
          </button>
        </div>
      </div>
    </article>
  );
};

const Feed = ({ userId = "a-partovii" }) => {
  // Map tweets with their authors
  const tweetsWithAuthors = useMemo(() => {
    return sampleTweets.map(tweet => {
      const author = sampleUsers.find(user => user.user_id === tweet.authorId);
      return {
        ...tweet,
        author: author || {
          user_id: tweet.authorId,
          name: 'Unknown User',
          profileAvatar: '/empty-pfp.png',
          verified: false
        }
      };
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by newest first
  }, []);

  return (
    <main className="feed-container">
      <div className="feed-header">
        <h2>Home</h2>
      </div>
      <div className="feed-tweets">
        {tweetsWithAuthors.map(tweet => (
          <Tweet key={tweet.id} tweet={tweet} currentUserId={userId} />
        ))}
      </div>
    </main>
  );
};

export default Feed;
