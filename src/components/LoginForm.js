import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './LoginForm.css';
import { UserContext } from '../UserContext';

const LoginForm = () => {
  const { setUsername } = useContext(UserContext);
  const [username, setUsernameLocal] = useState('');
  const [password, setPassword] = useState('');

  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://43.201.100.198:8081/login', formData);
      if (response) {
        alert('로그인에 성공했습니다!');
        setUsername(username); // Context에 username 설정 및 localStorage 저장
        window.location.reload(); // 로그인 성공 후 새로고침
      } else {
        alert('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요.');
      }
    } catch (error) {
      console.error('로그인 중 오류가 발생했습니다!', error);
      alert('로그인에 실패했습니다!');
    }
  };

  return (
    <div className="login-form">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="이메일"
          className="login-input"
          value={username}
          onChange={(e) => setUsernameLocal(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-submit">로그인</button>
      </form>
      <p className="signup-text">아직 회원이 아니신가요? 
        <Link to="/signup">회원가입</Link>
      </p>
    </div>
  );
};

export default LoginForm;
