import React, { useState, useEffect } from 'react';
import CurrentProbability from './CurrentProbability';
import ThreeDayForecast from './ThreeDayForecast';
import MapImage from './MapImage';
import './InfiniteScroll.css';

const componentsList = [
  CurrentProbability,
  ThreeDayForecast,
  MapImage
];

const InfiniteScroll = () => {
  const [components, setComponents] = useState([0, 1, 2]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      setComponents(prevComponents => [
        ...prevComponents,
        prevComponents.length % componentsList.length
      ]);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-container">
      {components.map((componentIndex, index) => {
        const Component = componentsList[componentIndex];
        return (
          <div key={index} className="scroll-component">
            <Component />
          </div>
        );
      })}
    </div>
  );
};

export default InfiniteScroll;
