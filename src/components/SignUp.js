import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordMatch) {
      try {
        const response = await axios.post('http://43.203.207.97:8081/join', { username, password });
        if (response.data === 'ok') {
          alert('회원 가입이 완료되었습니다!');
        }
      } catch (error) {
        console.error('회원 가입 중 오류가 발생했습니다!', error);
        alert('회원 가입에 실패했습니다!');
      }
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const confirmPasswordStyle = confirmPassword
    ? {
        borderColor: passwordMatch ? 'green' : 'red',
        borderStyle: 'solid',
      }
    : {};

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2 className="signup-title">회원 가입</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>이메일</label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label>비밀번호 확인</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              style={confirmPasswordStyle}
            />
            {!passwordMatch && confirmPassword && (
              <p className="error-message">비밀번호가 서로 다릅니다</p>
            )}
          </div>
          <div className="form-group">
            <label>이름</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button">회원 가입</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
