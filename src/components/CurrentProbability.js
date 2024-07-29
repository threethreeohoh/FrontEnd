import React from 'react';
import { Rain } from 'react-rainfall';
import './CurrentProbability.css';

const CurrentProbability = ({ probability, distances }) => {
  const formattedDistances = [];
  for (let i = 0; i < distances.length; i += 2) {
    if (i === 0){
      formattedDistances.push([distances[i]]);
      i--;
    } else if (i + 1 < distances.length) {
      formattedDistances.push([distances[i], distances[i + 1]]);
    } else {
      formattedDistances.push([distances[i]]);
    }
  }

  return (
    <div className="current-probability">
      <Rain 
        numDrops={probability ? 20 : 0}
        dropletColor="rgb(70, 70, 70)"
        showImpact="true"
        dropletOpacity={0.2}
      />
      <h2 className="text">현재 강수 상태</h2>
      <div className="probability-box">
        <p>{probability !== null ? (probability ? '비가 내리고 있습니다' : '비가 내리지 않습니다') : '데이터 없음'}</p>
      </div>
      {formattedDistances.length > 0 && (
        <div className="observatory-distances">
          <h2>관측소까지의 거리</h2>
          <div className="distance-grid">
            {formattedDistances.map((row, rowIndex) => (
              <div key={rowIndex} className="distance-row">
                {row.map((distance, colIndex) => (
                  <div key={colIndex} className="distance-item">
                    {distance.title} ({distance.namecode}): {distance.distance / 1000} km - {distance.value}
                    <span className="coords"> (lat: {distance.latlng.lat}, lng: {distance.latlng.lng})</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentProbability;
