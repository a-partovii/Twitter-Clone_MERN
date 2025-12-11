import { useState, useMemo } from "react";
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';  // FaHome یک آیکون خانه از Font Awesome است
import { sampleUsers } from "../../../../database/SampleData.js";
import "./SideBar.css";

const RightSidebar = ({ userId = "a-partovii" }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const user = useMemo(
    () => sampleUsers.find((u) => u.user_id === userId),
    [userId]
  );

  if (!user) {
    return <aside className="right-sidebar">کاربر پیدا نشد</aside>;
  }

  const bannerSrc = user.profileBanner || "/empty-pfp.png";
  const avatarSrc = user.profileAvatar || "/empty-pfp.png";

  const closeMobile = () => setIsMobileOpen(false);

  const content = (
    <>
      {/* sidebar header با ارتفاع 15px */}
      <div className="sidebar-header">
        <button className="back-button" onClick={closeMobile}>
          <FaArrowLeft />
        </button>
        <button className="edit-profile-button">Edit profile</button>
        <button className="edit-profile-button">Settings</button>
      </div>

      {/* بنر که به دیواره‌های طرفین می‌چسبه */}
      <div className="profile-header">
        <div className="profile-banner">
          <img src={bannerSrc} />
        </div>

        {/* آواتار که نصفش روی بنر و نصفش بیرون است - دکمه Edit profile کنارش */}
        <div className="profile-top-row">
          <img className="avatar-picture" src={avatarSrc} alt={user.name} />
        </div>
      </div>

      {/* محتوای پروفایل با padding عادی */}
      <div className="right-sidebar-content">
        <div className="profile-details">
          {/* نام و آیدی وسط زیر بنر */}
          <div className="profile-name-section">
            <h3 className="profile-name">{user.name}</h3>
            {user.verified &&
             <span className="verified-badge-large"><sub><FaCheckCircle /></sub></span>}
          </div>

          <div className="profile-username">@{user.user_id}</div>
          <div className="profile-bio">{user.bio}</div>
          <div className="profile-meta">Joined {user.joinedDate}</div>
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
        onClick={() => setIsMobileOpen(true)}
      >
        پروفایل
      </button>

      {isMobileOpen && (
        <div className="sidebar-overlay" onClick={closeMobile}></div>
      )}

      <aside className={`right-sidebar ${isMobileOpen ? "is-open" : ""}`}>
        {content}
      </aside>
    </>
  );
};

export default RightSidebar;