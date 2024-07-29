import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import SignUp from './components/SignUp';  // SignUp 컴포넌트 추가
import ApiError from './components/ApiError'; // ApiError 컴포넌트 추가
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignUp />} /> {/* 회원 가입 경로 추가 */}
        <Route path="/apierror" element={<ApiError />} /> {/* API Error 경로 추가 */}
      </Routes>
    </Router>
  </Provider>,
  document.getElementById('root')
);
