import React from 'react';
import { useDispatch } from 'react-redux';
import { setTimeOfDay } from '../actions';
import './DatetimeRadioButton.css';

const DatetimeRadioButton = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const timeOfDay = event.target.value;
    dispatch(setTimeOfDay(timeOfDay));
  };

  return (
    <div className="radio-button-group">
      <label>
        <input
          type="radio"
          name="timeOfDay"
          value="dawn"
          onChange={handleChange}
        /> 새벽
      </label>
      <label>
        <input
          type="radio"
          name="timeOfDay"
          value="daytime"
          onChange={handleChange}
        /> 낮
      </label>
      <label>
        <input
          type="radio"
          name="timeOfDay"
          value="sunset"
          onChange={handleChange}
        /> 저녁
      </label>
      <label>
        <input
          type="radio"
          name="timeOfDay"
          value="nighttime"
          onChange={handleChange}
        /> 밤
      </label>
    </div>
  );
};

export default DatetimeRadioButton;
