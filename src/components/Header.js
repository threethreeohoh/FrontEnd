import React from 'react';
import LoginButton from './LoginButton';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="login-button"><LoginButton /></div>
      <h1 className="title">제주도 강수량 예측</h1>
    </header>
  );
};

export default Header;
