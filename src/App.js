import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import CurrentProbability from './components/CurrentProbability';
import ThreeDayForecast from './components/ThreeDayForecast';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const [currentProbability, setCurrentProbability] = useState(null);
  const [forecast, setForecast] = useState([]);
  const city = 'Jeju-do';
  const API_KEY = 'YOUR_API_KEY';

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=4`);
        setCurrentProbability(response.data.forecast.forecastday[0].day.daily_chance_of_rain);
        setForecast(response.data.forecast.forecastday.slice(1, 4));
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="app">
      <Header />
      <CurrentProbability probability={currentProbability} />
      <ThreeDayForecast forecast={forecast} />
      <Footer />
    </div>
  );
};

export default App;
