import React from 'react';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <div className="main-content">
        <div className='title-box'>
          <h2>Chào mừng đến với Ứng dụng Nhà hàng của tôi!</h2>
        </div>
        <div className='description-box'>
          <p>Nơi đứng đầu về phục vụ bằng công nghệ</p>
        </div>
      </div>
    </>
  );
}

export default App;