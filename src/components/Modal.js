import React from 'react';
import LoginForm from './LoginForm';
import './Modal.css';

const Modal = ({ closeModal }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Modal;
