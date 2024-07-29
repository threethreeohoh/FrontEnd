import React from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  return (
    <div className="login-form">
      <h2>로그인</h2>
      <input type="text" placeholder="이메일" className="login-input" />
      <input type="password" placeholder="비밀번호" className="login-input" />
      <button className="login-submit">로그인</button>
      <p className="signup-text">아직 회원이 아니신가요? 
        <Link to="/signup">회원가입</Link>
      </p>
    </div>
  );
};

export default LoginForm;
