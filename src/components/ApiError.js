import React from 'react';
import './ApiError.css';

const ApiError = ({ errorMessage }) => {
  return (
    <div className="api-error">
      <h1>API Error</h1>
      <p>{errorMessage}</p>
    </div>
  );
};

export default ApiError;
