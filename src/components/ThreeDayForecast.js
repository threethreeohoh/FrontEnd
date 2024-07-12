import React from 'react';
import './ThreeDayForecast.css';

const getDate = (daysToAdd) => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
};

const Day1 = ({ forecast }) => (
  <div className="day-box">
    <h2>{getDate(1)}</h2>
    <p>{forecast?.[0]?.precipitation ?? 'N/A'} %</p>
  </div>
);

const Day2 = ({ forecast }) => (
  <div className="day-box">
    <h2>{getDate(2)}</h2>
    <p>{forecast?.[1]?.precipitation ?? 'N/A'} %</p>
  </div>
);

const Day3 = ({ forecast }) => (
  <div className="day-box">
    <h2>{getDate(3)}</h2>
    <p>{forecast?.[2]?.precipitation ?? 'N/A'} %</p>
  </div>
);

const ThreeDayForecast = ({ forecast }) => {
  if (!forecast || forecast.length < 3) {
    return <div>데이터가 부족합니다</div>;
  }

  return (
    <div className="forecast-container">
      <Day1 forecast={forecast} />
      <Day2 forecast={forecast} />
      <Day3 forecast={forecast} />
    </div>
  );
};

export default ThreeDayForecast;
