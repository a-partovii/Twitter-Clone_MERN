import { useState, useEffect } from "react";
import {
    FaArrowLeft,
    FaCheckCircle,
    FaPlus,
    FaEnvelope,
    FaBookmark,
    FaUser,
    FaEllipsisH,
    FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { usersAPI } from "../../utils/api.js";
import CreateTweetModal from "../CreateTweetModal/CreateTweetModal.jsx";
import "./LeftSidebar.css";

/* Menu Option-------------------- */
const SidebarOption = ({ Icon, text }) => (
    <div className='sidebar-option'>
        <Icon />
        <span>{text}</span>
    </div>
);

const LeftSidebar = ({ userId, onTweetCreated }) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const displayUserId = userId || currentUser?.user_id;

    useEffect(() => {
        const fetchUser = async () => {
            if (!displayUserId) return setLoading(false);
            try {
                const userData = await usersAPI.getById(displayUserId);
                setUser(userData);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [displayUserId]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (loading) return <aside className='Left-sidebar'>Loading...</aside>;
    if (!user) return <aside className='Left-sidebar'>User not found</aside>;

    return (
        <>
            <button className='open-sidebar-button' onClick={() => setIsMobileOpen(true)}>
                ☰
            </button>

            {isMobileOpen && (
                <div className='sidebar-overlay' onClick={() => setIsMobileOpen(false)} />
            )}

            <aside className={`Left-sidebar ${isMobileOpen ? "is-open" : ""}`}>
                {/* Header -------------------- */}
                <div className='sidebar-header'>
                    <button className='back-button' onClick={() => setIsMobileOpen(false)}>
                        <FaArrowLeft />
                    </button>
                    <button className='edit-profile-button'>Settings</button>
                    <button className='edit-profile-button'>Edit Profile</button>
                </div>

                {/* Profile-------------------- */}
                <div className='profile-header'>
                    <div className='profile-banner'>
                        <img src={user.profileBanner} alt='' />
                    </div>

                    <div className='profile-top-row'>
                        <img className='avatar-picture' src={user.profileAvatar} alt={user.name} />
                    </div>
                </div>

                <div className='sidebar-content'>
                    <div className='profile-details'>
                        <div className='profile-name-row'>
                            <h3 className='profile-name'>{user.name}</h3>
                            {user.verified && (
                                <span className='verified-badge-large'>
                                    <FaCheckCircle />
                                </span>
                            )}
                        </div>

                        <div className='profile-username'>@{user.user_id}</div>

                        {/* BIO --------- */}
                        <div className='profile-bio-container'>
                            <fieldset>
                                <legend>Bio</legend>
                                <div className='bio'>{user.bio}</div>
                                <div className='profile-meta'>Joined {user.joinedDate}</div>
                            </fieldset>
                        </div>

                        <div className='profile-stats'>
                            <span>
                                <strong>{user.followingCount}</strong> Following
                            </span>
                            <span>
                                <strong>{user.followersCount}</strong> Followers
                            </span>
                        </div>
                    </div>

                    {/* Menu -------------------- */}
                    <div className='sidebar-divider' />
                    <div className='sidebar-menu'>
                        <div
                            className='sidebar-option'
                            onClick={() => setShowCreateModal(true)}
                            style={{ cursor: "pointer" }}
                        >
                            <FaPlus />
                            <span>New Post</span>
                        </div>
                        <SidebarOption Icon={FaEnvelope} text='Messages' />
                        <SidebarOption Icon={FaUser} text='Profile' />
                        <SidebarOption Icon={FaBookmark} text='Bookmarks' />
                        <SidebarOption Icon={FaEllipsisH} text='More' />
                    </div>
                </div>

                {/* Logout Bottom-------------------- */}
                {currentUser?.user_id === user.user_id && (
                    <div className='sidebar-logout'>
                        <div className='sidebar-divider' />
                        <button className='logout-btn' onClick={handleLogout}>
                            <FaSignOutAlt />
                            Logout
                        </button>
                    </div>
                )}
            </aside>

            {/* Create Tweet Modal ----------------*/}
            {showCreateModal && (
                <CreateTweetModal
                    onClose={() => setShowCreateModal(false)}
                    userId={displayUserId}
                    onTweetCreated={(newTweet) => {
                        if (onTweetCreated) {
                            onTweetCreated(newTweet);
                        }
                        setShowCreateModal(false);
                    }}
                />
            )}
        </>
    );
};

export default LeftSidebar;
