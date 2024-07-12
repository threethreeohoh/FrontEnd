import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProbability, setTimeOfDay } from './actions';
import Header from './components/Header';
import CurrentProbability from './components/CurrentProbability';
import ThreeDayForecast from './components/ThreeDayForecast';
import Footer from './components/Footer';
import MapImage from './components/MapImage';
import './App.css';

const forecastData = [
  { precipitation: 5 },
  { precipitation: 10 },
  { precipitation: 15 }
];

const App = () => {
  const dispatch = useDispatch();
  const probability = useSelector((state) => state.probability);
  const timeOfDay = useSelector((state) => state.timeOfDay);
  const forecast = useSelector((state) => state.forecast);
  const city = 'Jeju-do';
  const API_KEY = 'YOUR_API_KEY';

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=4`);
        dispatch(setProbability(response.data.forecast.forecastday[0].day.daily_chance_of_rain));
        dispatch({ type: 'SET_FORECAST', payload: response.data.forecast.forecastday.slice(1, 4) });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [dispatch]);

  const getBackgroundColor = (timeOfDay, probability) => {
    let color;

    if (probability >= 75) {
      color = 'red';
    } else if (probability >= 50) {
      color = 'orange';
    } else if (probability >= 25) {
      color = 'yellow';
    } else {
      color = 'green';
    }

    switch (timeOfDay) {
      case 'dawn':
        return `linear-gradient(to bottom, ${color}, white 20%, skyblue 45%, wheat)`;
      case 'daytime':
        return `linear-gradient(to bottom, ${color}, white 20%, skyblue 45%)`;
      case 'sunset':
        return `linear-gradient(to bottom, ${color}, white 20%, orange 45%, orangered 80%)`;
      case 'nighttime':
        return `linear-gradient(to bottom, ${color}, white 20%, navy 45%, midnightblue 80%)`;
      default:
        return `linear-gradient(to bottom, green, white, white, white)`;
    }
  };

  return (
    <div className="app" style={{ backgroundImage: getBackgroundColor(timeOfDay, 50) }}>
      <Header className="header" />
      <CurrentProbability className="current-probability" probability={50} />
      <h1>3일간의 날씨 예보</h1>
      <ThreeDayForecast className="three-day-forecast" forecast={forecastData} />
      <MapImage className="map-image" />
      <Footer className="footer" />
    </div>
  );
};

export default App;
