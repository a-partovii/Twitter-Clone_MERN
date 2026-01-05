import React from "react";
import LeftSidebar from "../components/LeftSidebar";
import Feed from "../components/Feed";
import RightSidebar from "../components/RightSidebar";

function HomePage() {
  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        overflowX: 'hidden'
      }}
    >
      <div 
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: 'clamp(600px, 90vw, 1225px)', // ← responsive
          margin: '0 auto',
          height: '100vh'
        }}
      >
        {/* سایدبار چپ - responsive */}
        <header 
          style={{
            width: 'clamp(200px, 20vw, 275px)', // 200px-275px
            height: '100vh',
            position: 'sticky',
            top: 0,
            borderRight: '1px solid #EFF3F4',
            flexShrink: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollbarWidth: 'none',
            backgroundColor: '#FFFFFF'
          }}
        >
          <LeftSidebar />
        </header>

        {/* فید - responsive */}
        <main 
          style={{
            width: 'clamp(400px, 55vw, 600px)', // 400px-600px
            minWidth: 'clamp(400px, 55vw, 600px)',
            borderLeft: '1px solid #EFF3F4',
            borderRight: '1px solid #EFF3F4',
            height: '100vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            backgroundColor: '#FFFFFF'
          }}
          className="feed-container"
        >
          <Feed />
        </main>

        {/* سایدبار راست - responsive */}
        <aside 
          style={{
            width: 'clamp(250px, 25vw, 350px)', // 250px-350px
            height: '100vh',
            position: 'sticky',
            top: 0,
            paddingLeft: '20px',
            paddingRight: '16px',
            borderLeft: '1px solid #EFF3F4',
            flexShrink: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollbarWidth: 'none',
            backgroundColor: '#FFFFFF'
          }}
        >
          <RightSidebar />
          <style jsx>{`
            aside::-webkit-scrollbar { display: none; }
          `}</style>
        </aside>
      </div>
    </div>
  );
}

export default HomePage;
