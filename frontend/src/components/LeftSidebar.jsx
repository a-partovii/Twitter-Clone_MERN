import React from 'react';
import Avatar from './Avatar';
import { FaTwitter, FaHome, FaHashtag, FaRegBell, FaEnvelope, FaBookmark, FaListAlt, FaUser, FaEllipsisH } from 'react-icons/fa';
import './LeftSidebar.css'; 

const LeftSidebar = () => {
  return (
    <div className="left-sidebar">
      {/* 1. لوگوی توییتر در بالا */}
      <div className="sidebar-logo">
        <FaTwitter />
      </div>

      {/* 2. گزینه‌های منو */}
      <div className="sidebar-menu">
        <SidebarOption active Icon={FaHome} text="Home" />
        <SidebarOption Icon={FaHashtag} text="Explore" />
        <SidebarOption Icon={FaRegBell} text="Notifications" />
        <SidebarOption Icon={FaEnvelope} text="Messages" />
        <SidebarOption Icon={FaBookmark} text="Bookmarks" />
        <SidebarOption Icon={FaListAlt} text="Lists" />
        <SidebarOption Icon={FaUser} text="Profile" />
        <SidebarOption Icon={FaEllipsisH} text="More" />
      </div>

      {/* 3. دکمه توییت */}
      <button className="sidebar-tweet-btn">Tweet</button>

      {/* 4. پروفایل کوچک پایین */}
      <div className="sidebar-profile-mini">
        <Avatar src ={null} name ="safa Developer" size="40px" />
        <div className="mini-info">
          <h4>Safa Developer</h4>
          <p>@safa_dev</p>
        </div>
        <FaEllipsisH className="mini-dots"/>
      </div>
    </div>
  );
};

// یک کامپوننت کوچک برای هر گزینه منو (تمیزتر شدن کد)
const SidebarOption = ({ active, text, Icon }) => {
  return (
    <div className={`sidebar-option ${active && 'sidebar-option-active'}`}>
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}

export default LeftSidebar;