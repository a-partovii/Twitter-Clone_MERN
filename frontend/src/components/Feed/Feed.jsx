import { useState, useRef, useEffect } from "react";
import { tweetsAPI } from "../../utils/api.js";
import {
    FaCheckCircle,
    FaEllipsisH,
    FaTrash,
    FaFlag,
    FaRetweet,
    FaHeart,
    FaBookmark,
    FaRegComment,
    FaRegHeart,
    FaRegBookmark,
} from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import "./Feed.css";

// Helper function to format date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    if (diffInSeconds < 60) return `${diffInSeconds}s`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};
const Tweet = ({ tweet, currentUserId }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [isLiked, setIsLiked] = useState(tweet.likes?.includes(currentUserId) || false);
    const [isRetweeted, setIsRetweeted] = useState(
        tweet.retweets?.includes(currentUserId) || false
    );
    const [isBookmarked, setIsBookmarked] = useState(
        tweet.bookmarks?.includes(currentUserId) || false
    );
    const [likesCount, setLikesCount] = useState(tweet.likes?.length || 0);
    const [retweetsCount, setRetweetsCount] = useState(tweet.retweets?.length || 0);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setShowMenu(false);
            }
        };
        if (showMenu) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [showMenu]);
    if (!tweet || !tweet.author) return null;
    const isOwner = tweet.authorId === currentUserId;
    const handleLike = async (e) => {
        e.stopPropagation();
        try {
            const updatedTweet = await tweetsAPI.like(tweet.id, currentUserId);
            setIsLiked(updatedTweet.likes.includes(currentUserId));
            setLikesCount(updatedTweet.likes.length);
        } catch (error) {
            console.error("Error liking tweet:", error);
        }
    };

    const handleRetweet = async (e) => {
        e.stopPropagation();
        try {
            const updatedTweet = await tweetsAPI.retweet(tweet.id, currentUserId);
            setIsRetweeted(updatedTweet.retweets.includes(currentUserId));
            setRetweetsCount(updatedTweet.retweets.length);
        } catch (error) {
            console.error("Error retweeting:", error);
        }
    };

    const handleBookmark = async (e) => {
        e.stopPropagation();
        try {
            const updatedTweet = await tweetsAPI.bookmark(tweet.id, currentUserId);
            setIsBookmarked(updatedTweet.bookmarks.includes(currentUserId));
        } catch (error) {
            console.error("Error bookmarking tweet:", error);
        }
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this tweet?")) {
            try {
                await tweetsAPI.delete(tweet.id);
                window.location.reload();
            } catch (error) {
                console.error("Error deleting tweet:", error);
                alert("Failed to delete tweet");
            }
        }
        setShowMenu(false);
    };
    return (
        <article className='tweet'>
            <div className='tweet-avatar'>
                <img src={tweet.author.profileAvatar || "/empty-pfp.png"} alt={tweet.author.name} />
            </div>
            <div className='tweet-content'>
                {/* Header */}
                <div className='tweet-header'>
                    <div className='tweet-author-info'>
                        <span className='tweet-author-name'>{tweet.author.name}</span>
                        {tweet.author.verified && (
                            <span className='verified-badge'>
                                <FaCheckCircle />
                            </span>
                        )}
                        <span className='tweet-author-username'>@{tweet.author.user_id}</span>
                        <span className='tweet-separator'>·</span>
                        <span className='tweet-date'>{formatDate(tweet.createdAt)}</span>
                    </div>
                    <div className='tweet-menu'>
                        <button
                            className='tweet-menu-button'
                            ref={buttonRef}
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowMenu((prev) => !prev);
                            }}
                        >
                            <FaEllipsisH />
                        </button>
                        {showMenu && (
                            <div className='tweet-menu-dropdown' ref={menuRef}>
                                {isOwner && (
                                    <button className='menu-item delete' onClick={handleDelete}>
                                        <FaTrash />
                                        <span>Delete</span>
                                    </button>
                                )}
                                <button className='menu-item'>
                                    <FaFlag />
                                    <span>Report</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                {/* Text */}
                <div className='tweet-text'>{tweet.text}</div>
                {/* Image */}
                {tweet.image && (
                    <div className='tweet-image-container'>
                        <img src={tweet.image} alt='Tweet' className='tweet-image' />
                    </div>
                )}
                {/* Actions */}
                <div className='tweet-actions'>
                    <button
                        className={`tweet-action like ${isLiked ? "active" : ""}`}
                        onClick={handleLike}
                    >
                        {isLiked ? <FaHeart /> : <FaRegHeart />}
                        <span>{likesCount}</span>
                    </button>
                    <button className='tweet-action reply'>
                        <FaRegComment />
                        <span>{tweet.replies?.length || 0}</span>
                    </button>
                    <button
                        className={`tweet-action retweet ${isRetweeted ? "active" : ""}`}
                        onClick={handleRetweet}
                    >
                        <FaRetweet />
                        <span>{retweetsCount}</span>
                    </button>
                    <button
                        className={`tweet-action bookmark ${isBookmarked ? "active" : ""}`}
                        onClick={handleBookmark}
                    >
                        {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                    </button>
                    <button className='tweet-action share'>
                        <FaArrowUpRightFromSquare />
                    </button>
                </div>
            </div>
        </article>
    );
};
const Feed = ({ userId = "a-partovii", refreshTrigger }) => {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTweets = async () => {
        try {
            setLoading(true);
            const data = await tweetsAPI.getAll();
            setTweets(data);
            setError(null);
        } catch (err) {
            console.error("Error fetching tweets:", err);
            setError(
                "Failed to load tweets. Make sure the backend server is running on port 5000."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTweets();
    }, [refreshTrigger]);

    if (loading) {
        return (
            <main className='feed-container'>
                <div className='feed-header'>
                    <h2>Home</h2>
                </div>
                <div style={{ padding: "20px", textAlign: "center" }}>
                    <p>Loading tweets...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className='feed-container'>
                <div className='feed-header'>
                    <h2>Home</h2>
                </div>
                <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
                    <p>{error}</p>
                    <p style={{ marginTop: "10px", fontSize: "14px" }}>
                        Make sure to run: <code>npm start</code> in the <code>server</code> folder
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className='feed-container'>
            <div className='feed-header'>
                <h2>Home</h2>
            </div>
            <div className='feed-tweets'>
                {tweets.length === 0 ? (
                    <div style={{ padding: "20px", textAlign: "center" }}>
                        <p>No tweets found.</p>
                    </div>
                ) : (
                    tweets.map((tweet) => (
                        <Tweet key={tweet.id} tweet={tweet} currentUserId={userId} />
                    ))
                )}
            </div>
        </main>
    );
};
export default Feed;
