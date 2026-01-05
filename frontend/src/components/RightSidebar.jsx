import React from "react";
import "./RightSidebar.css";

const trends = [
  { category: "Trending in Iran", title: "#ReactJS", tweets: "12.3K Tweets" },
  { category: "Trending in Tech", title: "#JavaScript", tweets: "98.1K Tweets" },
  { category: "Trending", title: "#100DaysOfCode", tweets: "45.6K Tweets" },
];

const suggestions = [
  { name: "Dan Abramov", username: "@dan_abramov" },
  { name: "React", username: "@reactjs" },
  { name: "Node.js", username: "@nodejs" },
];

const RightSidebar = () => {
  return (
    <aside className="right-sidebar">
      {/* Search */}
      <div className="right-search-wrapper">
        <input
          type="text"
          className="right-search-input"
          placeholder="Search Twitter"
        />
      </div>

      {/* Trends */}
      <section className="right-card">
        <h3 className="right-card-title">Trends for you</h3>
        {trends.map((item, index) => (
          <button key={index} className="trend-item">
            <span className="trend-category">{item.category}</span>
            <span className="trend-title">{item.title}</span>
            <span className="trend-tweets">{item.tweets}</span>
          </button>
        ))}
        <button className="right-card-footer">Show more</button>
      </section>

      {/* Who to follow */}
      <section className="right-card">
        <h3 className="right-card-title">Who to follow</h3>
        {suggestions.map((user, index) => (
          <div key={index} className="follow-item">
            <div className="follow-avatar">
              {user.name.charAt(0)}
            </div>
            <div className="follow-info">
              <span className="follow-name">{user.name}</span>
              <span className="follow-username">{user.username}</span>
            </div>
            <button className="follow-btn">Follow</button>
          </div>
        ))}
        <button className="right-card-footer">Show more</button>
      </section>
    </aside>
  );
};

export default RightSidebar;