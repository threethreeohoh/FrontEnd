import React, { useState, useContext } from 'react';
import Modal from './Modal';
import './LoginButton.css';
import { UserContext } from '../UserContext';
import LogoutForm from './LogoutForm'; // 이름 수정
import axios from 'axios';

const LoginButton = () => {
  const { username, setUsername } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutFormOpen, setIsLogoutFormOpen] = useState(false); // 변수명 수정

  const openLoginModal = () => {
    setIsModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsModalOpen(false);
  };

  const openLogoutForm = () => { // 함수명 수정
    setIsLogoutFormOpen(true);
  };

  const closeLogoutForm = () => { // 함수명 수정
    setIsLogoutFormOpen(false);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://43.201.100.198:8081/logout', {}, {
        headers: {
          'Authorization': token,
        },
      });

      localStorage.removeItem('token');
      setUsername('');
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      {username ? (
        <>
          <button className="login-button" onClick={openLogoutForm}>로그아웃</button>
          {isLogoutFormOpen && <LogoutForm onConfirm={handleLogout} onCancel={closeLogoutForm} />} {/* 수정 */}
        </>
      ) : (
        <>
          <button className="login-button" onClick={openLoginModal}>로그인</button>
          {isModalOpen && <Modal closeModal={closeLoginModal} />}
        </>
      )}
    </>
  );
};

export default LoginButton;
