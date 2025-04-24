import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    console.log('Đang xử lý đăng nhập...');
    navigate('/');
  };

  return (
    <div className="login-container">
      <h2>Đăng nhập Hệ thống Nhà hàng</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Tên đăng nhập:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div>
          <label htmlFor="password">Mật khẩu:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit" className="submit-button">Đăng nhập</button>
      </form>

      <p className="auth-link-text">Bạn chưa có tài khoản? <Link to="/register">Đăng ký tại đây</Link></p>
    </div>
  );
}

export default LoginPage;