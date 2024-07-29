import React, { useState } from 'react';
import ReactRain from 'react-rain-animation';
import "react-rain-animation/lib/style.css";
import './ThreeDayForecast.css';

const getDate = (daysToAdd) => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
};

const DayBox = ({ forecast, dayIndex, isHovered, onHover, onLeave }) => {
  const rainingStatus = forecast && forecast[dayIndex] && forecast[dayIndex] !== null && forecast[dayIndex].raining_status !== null
    ? (forecast[dayIndex].raining_status ? '비가 내릴 예정' : '비가 내리지 않을 예정')
    : '데이터 없음';

  return (
    <div
      className={`day-box ${isHovered ? 'hovered' : ''} ${!isHovered && isHovered !== null ? 'shrinked' : ''}`}
      onMouseEnter={() => onHover(dayIndex)}
      onMouseLeave={onLeave}
    >
      <h2>{getDate(dayIndex + 1)}</h2>
      <p>{rainingStatus}</p>
    </div>
  );
};

const ThreeDayForecast = ({ forecast }) => {
  const [hoveredDay, setHoveredDay] = useState(null);

  const defaultForecast = [
    { raining_status: null },
    { raining_status: null },
    { raining_status: null }
  ];

  const actualForecast = forecast && forecast.length >= 3 ? forecast : defaultForecast;

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
          forecast={actualForecast}
          isHovered={hoveredDay === dayIndex}
          onHover={handleMouseEnter}
          onLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};

export default ThreeDayForecast;
