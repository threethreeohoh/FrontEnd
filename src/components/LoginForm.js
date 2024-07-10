import React from 'react';
import './LoginForm.css';

const LoginForm = () => {
  return (
    <div className="login-form">
      <h2>로그인</h2>
      <input type="text" placeholder="ID" className="login-input" />
      <input type="password" placeholder="비밀번호" className="login-input" />
      <button className="login-submit">로그인</button>
      <p className="signup-text">아직 회원이 아니신가요? 회원가입</p>
    </div>
  );
};

export default LoginForm;
