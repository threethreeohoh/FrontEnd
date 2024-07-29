import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProbability, setTimeOfDay, setForecast } from './actions';
import Header from './components/Header';
import CurrentProbability from './components/CurrentProbability';
import ThreeDayForecast from './components/ThreeDayForecast';
import Footer from './components/Footer';
import MapImage from './components/MapImage';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const probability = useSelector((state) => state.probability);
  const forecast = useSelector((state) => state.forecast);
  const [distances, setDistances] = useState([]);
  const [observatoryOrder, setObservatoryOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [requestPending, setRequestPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Kakao Maps API Loading Failed");

  const previousObsCode = useRef(null);

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 7) return 'dawn';
    if (hour >= 7 && hour < 17) return 'daytime';
    if (hour >= 17 && hour < 19) return 'sunset';
    return 'nighttime';
  };

  useEffect(() => {
    dispatch(setTimeOfDay(getTimeOfDay()));
  }, [dispatch]);

  const fetchWeatherData = async (obsCode) => {
    const today = new Date().toISOString().split('T')[0];
    setLoading(true);
    setRequestPending(true); // 요청 대기 상태 설정
    try {
      if (obsCode) {
        console.log('Sending API request with obsCode:', obsCode); // 디버깅을 위해 추가
        const response = await axios.post('https://assemblytown.com/predict', { obs_code: obsCode });

        console.log('API response:', response.data); // 디버깅을 위해 추가

        // API 응답 형식 확인 및 오류 처리
        if (response.data.message) {
          console.error('API Server Error:', response.data.message); // 오류 출력 추가
          setErrorMessage("API Server Error");
          setApiError(true);
          throw new Error('API Server Error');
        }

        if (response.data && Array.isArray(response.data.data)) {
          console.log('Valid API response format'); // 추가 디버깅 출력
          console.log('API response data:', response.data.data); // 응답 데이터 출력
          const todayData = response.data.data[0];
          const forecastData = response.data.data.slice(1, 4);

          dispatch(setProbability(todayData.raining_status));
          dispatch(setForecast(forecastData));

          const updatedDistances = distances.map((distance, index) => ({
            ...distance,
            value: response.data.values ? response.data.values[index] : null
          }));
          setDistances(updatedDistances);

          localStorage.setItem('lastLoadedDate', today);
          setApiError(false);
        } else {
          console.error('Invalid API response format', response.data); // 오류 출력 추가
          setErrorMessage("Invalid API response format");
          setApiError(true);
          throw new Error('Invalid API response format');
        }
      } else {
        console.error('No obsCode available'); // 오류 출력 추가
        setErrorMessage("No obsCode available");
        setApiError(true);
        throw new Error('No obsCode available');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setApiError(true);
    } finally {
      setLoading(false);
      // 10초 동안 대기
      setTimeout(() => {
        setRequestPending(false);
      }, 10000);
    }
  };

  useEffect(() => {
    if (distances.length > 0 && !requestPending) {
      const obsCode = distances[0].namecode;
      if (previousObsCode.current !== obsCode) {
        fetchWeatherData(obsCode);
        previousObsCode.current = obsCode;
      }
    }
  }, [distances, requestPending]);

  const timeOfDay = useSelector((state) => state.timeOfDay);

  const getBackgroundColor = (timeOfDay, probability) => {
    let color;

    if (probability) {
      color = 'gray';
    } else {
      switch (timeOfDay){
        case 'dawn':
        case 'daytime':
          color = 'skyblue';
          break;
        case 'sunset':
          color = 'orange';
          break;
        case 'nighttime':
          color = 'navy';
          break;
      }
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
    <div className="app" style={{ backgroundImage: getBackgroundColor(timeOfDay, probability) }}>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <Header className="header" />
      <CurrentProbability 
        className="current-probability" 
        probability={apiError ? null : probability} 
        distances={distances} 
        dropletColor="blue" // 필요한 색상 값 전달
      />
      <h1 className="day-text">3일간의 날씨 예보</h1>
      <ThreeDayForecast 
        className="three-day-forecast" 
        forecast={apiError ? [null, null, null] : forecast} 
      />
      <MapImage 
        className="map-image" 
        setDistances={setDistances} 
        setApiError={setApiError} 
        setObservatoryOrder={setObservatoryOrder} 
      />
      <Footer className="footer" />
    </div>
  );
};

export default App;
