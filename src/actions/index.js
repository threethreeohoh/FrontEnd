export const setProbability = (probability) => ({
    type: 'SET_PROBABILITY',
    payload: probability
  });
  
  export const setTimeOfDay = (timeOfDay) => ({
    type: 'SET_TIME_OF_DAY',
    payload: timeOfDay
  });
  
  export const setForecast = (forecast) => ({
    type: 'SET_FORECAST',
    payload: forecast
  });