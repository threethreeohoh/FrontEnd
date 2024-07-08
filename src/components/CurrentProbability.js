import React from 'react';
import './CurrentProbability.css';

const CurrentProbability = ({ probability }) => {
  // Determine background color based on probability
  let backgroundColor;
  if (probability >= 70) {
    backgroundColor = '#FF6347'; // Red for high probability
  } else if (probability >= 50) {
    backgroundColor = '#FFA500'; // Orange for medium probability
  } else {
    backgroundColor = '#32CD32'; // Green for low probability
  }

  return (
    <div className="current-probability" style={{ backgroundColor }}>
      <h2>현재 비 올 확률</h2>
      <div className="probability-box">
        <p>{probability}%</p>
      </div>
    </div>
  );
};

export default CurrentProbability;
