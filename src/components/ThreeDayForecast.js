import React, { useState } from 'react';
import ReactRain from 'react-rain-animation';
import "react-rain-animation/lib/style.css";
import './ThreeDayForecast.css';

const getDate = (daysToAdd) => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
};

const DayBox = ({ forecast, dayIndex, isHovered, onHover, onLeave }) => (
  <div
    className={`day-box ${isHovered ? 'hovered' : ''} ${!isHovered && isHovered !== null ? 'shrinked' : ''}`}
    onMouseEnter={() => onHover(dayIndex)}
    onMouseLeave={onLeave}
  >
    <h2>{getDate(dayIndex + 1)}</h2>
    <p>{forecast?.[dayIndex]?.precipitation ?? 'N/A'} %</p>
  </div>
);

const ThreeDayForecast = ({ forecast }) => {
  const [hoveredDay, setHoveredDay] = useState(null);

  if (!forecast || forecast.length < 3) {
    return <div>데이터가 부족합니다</div>;
  }

  const handleMouseEnter = (dayIndex) => {
    setHoveredDay(dayIndex);
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
  };

  return (
    <div className="forecast-container">
      {[0, 1, 2].map((dayIndex) => (
        <DayBox
          key={dayIndex}
          dayIndex={dayIndex}
          forecast={forecast}
          isHovered={hoveredDay === dayIndex}
          onHover={handleMouseEnter}
          onLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};

export default ThreeDayForecast;
