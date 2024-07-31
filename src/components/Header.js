import React, { useContext } from 'react';
import LoginButton from './LoginButton';
import './Header.css';
import { UserContext } from '../UserContext';

const Header = () => {
  const { username } = useContext(UserContext);

  return (
    <header className="header">
      <div className="login-button"><LoginButton /></div>
      <h1 className="title">제주도 강수량 예측</h1>
      {username && <div className="username-display">환영합니다, {username}님</div>}
    </header>
  );
};

export default Header;
