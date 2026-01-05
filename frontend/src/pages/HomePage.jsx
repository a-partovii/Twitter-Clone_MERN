import React from 'react';
import RightSidebar from '../components/RightSidebar';
import LeftSidebar from '../components/LeftSidebar';
import Feed from '../components/Feed';

function HomePage() {
  return (
    <div style={{ 
      display: 'flex', 
      maxWidth: '1400px', 
      margin: '0 auto',
      minHeight: '100vh',
      position: 'relative',
      backgroundColor: '#FFFFFF'
    }}>
      
      {/* سایدبار چپ */}
      <div style={{ 
        width: '275px', 
        height: '100vh',  // تمام ارتفاع viewport
        overflowY: 'auto', // ← اسکرول جداگانه
        position: 'sticky', 
        top: 0,
        alignSelf: 'flex-start'
      }}>
        <LeftSidebar />
      </div>

      {/* خط چپ */}
      <div style={{
        position: 'absolute',
        left: '274px',
        top: 0, bottom: 0,
        width: '2px',
        backgroundColor: '#EFF3F4'
      }} />

      {/* فید وسط - اسکرول اول */}
      <div style={{ 
        flex: 1, 
        maxWidth: '600px',
        minHeight: '100vh',
        marginLeft: '2px',
        overflowY: 'auto' // اسکرول مستقل
      }}>
        <Feed />
      </div>

      {/* خط راست */}
      <div style={{ 
        position: 'absolute',
        left: 'calc(275px + 2px + 600px + 2px)', 
        top: 0, bottom: 0,
        width: '2px',
        backgroundColor: '#EFF3F4'
      }} />

      {/* سایدبار راست */}
      <div style={{ 
        width: '350px',
        height: '100vh',  // تمام ارتفاع viewport
        overflowY: 'auto', // ← اسکرول جداگانه
        position: 'sticky', 
        top: 0,
        marginLeft: '1px',
        alignSelf: 'flex-start'
      }}>
        <RightSidebar />
      </div>

    </div>
  );
}

export default HomePage;
