import React, { useState } from 'react';
import Modal from './Modal';
import './LoginButton.css';

const LoginButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className="login-button" onClick={openModal}>로그인</button>
      {isModalOpen && <Modal closeModal={closeModal} />}
    </>
  );
};

export default LoginButton;
