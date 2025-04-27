import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  const [isAccountDropdownVisible, setAccountDropdownVisible] = useState(false);
  const handleMouseEnterAccount = () => {
    setAccountDropdownVisible(true);
  };
  const handleMouseLeaveAccount = () => {
    setAccountDropdownVisible(false);
  };


  return (
    <header className="site-header">
      <div className="header-logo">
        <img src="/logo.jpg" alt="Logo Nhà hàng ABC" className="logo-img" />
      </div>
      <div className="header-right-group">
        <nav className="header-nav">
          <ul>
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/about">Giới thiệu</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/dat-ban">Đặt bàn</Link></li>
            <li><Link to="/chatbot">Chatbot</Link></li>
          </ul>
        </nav>
        <div className="header-actions">
            <a href="#" className="action-icon">🔍</a>
            <div
              className="account-dropdown-container"
              onMouseEnter={handleMouseEnterAccount}
              onMouseLeave={handleMouseLeaveAccount}
            >
                <a href="#" className="action-icon account-icon">👤</a>
                {isAccountDropdownVisible && (
                    <div className="account-dropdown-menu">
                        <Link to="/login">Đăng nhập</Link>
                        <Link to="/register">Đăng ký</Link>
                    </div>
                )}
            </div>
        </div>
      </div>
    </header>
  );
}

export default Header;