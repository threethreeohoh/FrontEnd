const initialState = {
    probability: null,
    forecast: [],
    timeOfDay: 'daytime' // 기본 값
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PROBABILITY':
        return {
          ...state,
          probability: action.payload
        };
      case 'SET_TIME_OF_DAY':
        return {
          ...state,
          timeOfDay: action.payload
        };
      case 'SET_FORECAST':
        return {
          ...state,
          forecast: action.payload
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  