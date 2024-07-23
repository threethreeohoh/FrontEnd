import React from 'react';
import DatetimeRadioButton from './DatetimeRadioButton';
import LoginButton from './LoginButton';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="login-button"><LoginButton /></div>
      <h1 className="title">제주도 강수량 예측</h1>
      <div className="radio-buttons"><DatetimeRadioButton /></div>
    </header>
  );
};

export default Header;
