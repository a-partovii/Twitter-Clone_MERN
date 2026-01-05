// src/components/Avatar.jsx
import React from 'react';

// ۱. این تابع اسم کاربر را می‌گیرد و یک کد رنگ hex تولید می‌کند
const stringToColor = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

const Avatar = ({ src, name, size = "40px" }) => {
  // اگر اسم نبود، پیش‌فرض 'User' بگذار
  const userName = name || "User";
  const bgColor = stringToColor(userName);
  const initial = userName.charAt(0).toUpperCase();

  // استایل مشترک
  const commonStyle = {
    width: size,
    height: size,
    borderRadius: "50%",
    objectFit: "cover",
    cursor: "pointer",
  };

  // حالت ۱: اگر عکس دارد، عکس را نشان بده
  if (src) {
    return <img src={src} alt={name} style={commonStyle} />;
  }

  // حالت ۲: اگر عکس ندارد، دایره رنگی با حرف اول اسم بساز
  return (
    <div style={{
      ...commonStyle,
      backgroundColor: bgColor,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: parseInt(size) / 2 + "px", // سایز فونت نصف سایز دایره
      textShadow: "0 1px 2px rgba(0,0,0,0.3)" // سایه متن برای خوانایی بهتر
    }}>
      {initial}
    </div>
  );
};

export default Avatar;