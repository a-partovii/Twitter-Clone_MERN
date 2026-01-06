import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import RightSidebar from "../../components/RightSidebar/RightSidebar.jsx";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar.jsx";
import Feed from "../../components/Feed/Feed.jsx";
import "./HomePage.css";

function HomePage() {
    const { currentUser } = useAuth();
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleTweetCreated = () => {
        // Trigger refresh of Feed component
        setRefreshTrigger(prev => prev + 1);
    };

    if (!currentUser) {
        return (
            <div className='home-loading'>
                <p>Loading...</p>
            </div>
        );
    }
    return (
        <div className="app-shell">
          <LeftSidebar 
            userId={currentUser.user_id} 
            onTweetCreated={handleTweetCreated}
          />
          <Feed 
            userId={currentUser.user_id} 
            refreshTrigger={refreshTrigger}
          />
          <RightSidebar userId={currentUser.user_id} />
        </div>
      );
}

export default HomePage;
