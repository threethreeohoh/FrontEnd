import React, { useState, useContext } from 'react';
import Modal from './Modal';
import './LoginButton.css';
import { UserContext } from '../UserContext';

const LoginButton = () => {
  const { username, setUsername } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    setUsername('');
    alert('로그아웃되었습니다.');
  };

  return (
    <>
      {username ? (
        <button className="login-button" onClick={handleLogout}>로그아웃</button>
      ) : (
        <button className="login-button" onClick={openModal}>로그인</button>
      )}
      {isModalOpen && <Modal closeModal={closeModal} />}
    </>
  );
};

export default LoginButton;
