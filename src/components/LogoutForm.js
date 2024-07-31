import React from 'react';
import './LogoutForm.css';

const LogoutForm = ({ onConfirm, onCancel }) => {
  return (
    <div className="logout-form-overlay">
      <div className="logout-form">
        <h2>로그아웃</h2>
        <p>로그아웃 하시겠습니까?</p>
        <div className="logout-form-buttons">
          <button className="logout-confirm" onClick={onConfirm}>예</button>
          <button className="logout-cancel" onClick={onCancel}>아니오</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutForm;
