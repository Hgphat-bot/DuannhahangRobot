import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegistrationPage.css';

function RegistrationPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Đang xử lý đăng ký với thông tin:", {
            username: username,
            password: password,
            confirmPassword: confirmPassword,
            email: email
    });
    if (password !== confirmPassword) {
        console.error("Mật khẩu và xác nhận mật khẩu không khớp!");
        return;
    }
    };
    return (
        <div className="registration-container">
          <h1>Đăng ký Tài khoản Mới</h1>
          <p>Vui lòng điền thông tin để tạo tài khoản.</p>
    
          <form onSubmit={handleSubmit} className="registration-form">
    
            <div className="form-group">
              <label htmlFor="username">Tên người dùng:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="password">Mật khẩu:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>    
            <button type="submit" className="submit-button">Đăng ký</button>   
          </form>
          <p className="auth-link-text">
            Bạn đã có tài khoản? <Link to="/login">Đăng nhập tại đây</Link>
          </p>
        </div>
      );
    }
    
    export default RegistrationPage;