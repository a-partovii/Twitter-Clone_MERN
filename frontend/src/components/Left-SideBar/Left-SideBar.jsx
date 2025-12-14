import { useState, useMemo } from "react";
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';  
import { sampleUsers } from "../../../../database/SampleData.js";
import "./SideBar.css";

const LeftSidebar = ({ userId = "a-partovii" }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const user = useMemo(
    () => sampleUsers.find((u) => u.user_id === userId),
    [userId]
  );

  if (!user) {
    return <aside className="right-sidebar">User not found!!</aside>;
  }
  const closeMobile = () => setIsMobileOpen(false);

  const content = (
    <>
      <div className="sidebar-header">
        <button className="back-button" onClick={closeMobile}>
          <FaArrowLeft />
        </button>
        <button className="edit-profile-button">Settings</button>
        <button className="edit-profile-button">Edit Profile</button>
      </div>

      <div className="profile-header">
        <div className="profile-banner">
          <img src={user.profileBanner} />
        </div>

        <div className="profile-top-row">
          <img className="avatar-picture" src={user.profileAvatar} alt={user.name} />
        </div>
      </div>

      <div className="right-sidebar-content">
        <div className="profile-details">
          <div className="profile-name-section">
            <div className="profile-name-row">
              <h3 className="profile-name">{user.name}</h3>
              {user.verified &&
               <span className="verified-badge-large"><sub><FaCheckCircle /></sub></span>}
            </div>
            <div className="profile-username">@{user.user_id}</div>
          </div>
          <fieldset>
            <legend>Bio</legend>
              <div className="profile-bio">{user.bio}</div>
              <br />
              <div className="profile-meta">Joined {user.joinedDate}</div>
          </fieldset>

          <div className="profile-stats">
            <span>
              <strong>{user.followingCount}</strong> Following
            </span>
            <span>
              <strong>{user.followersCount}</strong> Followers
            </span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <button
        className="open-sidebar-button"
        onClick={() => setIsMobileOpen(true)}> OPEN </button>

      {isMobileOpen && (
        <div className="sidebar-overlay" onClick={closeMobile}></div>
      )}

      <aside className={`right-sidebar ${isMobileOpen ? "is-open" : ""}`}>
        {content}
      </aside>
    </>
  );
};

export default LeftSidebar;