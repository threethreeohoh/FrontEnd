import React from 'react';
import './CurrentProbability.css';

const CurrentProbability = ({ probability }) => {
  // Determine background color based on probability
  let backgroundColor;
  if (probability >= 75) {
    backgroundColor = 'red';// Red for high probability
  } else if (probability >= 50) {
    backgroundColor = 'orange'; // Orange for medium probability
  } else if (probability >= 25){
    backgroundColor = 'yellow'; // Yellow for low probability
  } else {
    backgroundColor = 'limegreen'; // Green for less probability
  }

  return (
    <div className="current-probability" style={{ backgroundColor }}>
      <h2><br></br>현재 비 올 확률</h2>
      <div className="probability-box">
        <p>{probability}%</p>
      </div>
    </div>
  );
};

export default CurrentProbability;
