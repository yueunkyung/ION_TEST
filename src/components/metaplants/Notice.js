import React, { useState, useEffect, useRef } from 'react';

function Notice({ noticeList }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false); 
  const animateRef = useRef(); 

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % noticeList.length);
      }, 3000);
    }, 4500);
    return () => clearInterval(interval);
  }, [noticeList.length]);

  useEffect(() => {
    if (animate) {
      animateRef.current = setTimeout(() => {
        setAnimate(false);
      }, 1500);
    }
    return () => clearTimeout(animateRef.current);
  }, [animate]);

  const formatDate = (date) => {
    const year = Math.floor(date / 10000);
    const month = Math.floor((date % 10000) / 100);
    const day = date % 100; 
    return `${year}년 ${month}월 ${day}일`;
  };

  const currentItem = noticeList[currentIndex];

  return (
    <section className="notice">
      <div className="notice_inner con_center">
        <div key={currentItem.id} className={`notice_item ${animate ? 'enter' : 'leave'}`}>
          <div className="cate">{currentItem.category}</div>
          <div className="label">{currentItem.label}</div>
          <div className="date">{formatDate(currentItem.date)}</div>
        </div>
      </div>
    </section>
  );
}

export default Notice;
