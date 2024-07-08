import React from 'react';
import './ThreeDayForecast.css';

const ThreeDayForecast = ({ forecast }) => {
  return (
    <div className="three-day-forecast">
      <h2>3일 동안의 강수량 예측</h2>
      <div className="forecast-table">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-row" style={{ backgroundColor: getBackgroundColor(day.day.daily_chance_of_rain) }}>
            <p>{day.date}</p>
            <p>{day.day.daily_chance_of_rain}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Function to determine background color based on probability
const getBackgroundColor = (probability) => {
  if (probability >= 70) {
    return '#FF6347'; // Red for high probability
  } else if (probability >= 50) {
    return '#FFA500'; // Orange for medium probability
  } else {
    return '#32CD32'; // Green for low probability
  }
};

export default ThreeDayForecast;
