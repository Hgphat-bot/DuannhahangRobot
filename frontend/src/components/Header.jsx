import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="site-header">
      <div className="header-logo">
        <img src="/logo.jpg" alt="Logo Nhà hàng ABC" className="logo-img" />
      </div>
      <div className="header-right-group">
        <nav className="header-nav">
          <ul>
            <li><Link to="/app/about">Trang chủ</Link></li>
            <li><Link to="/app/menu">Menu</Link></li>
            <li><Link to="/app/dat-ban">Đặt bàn</Link></li>
            <li><Link to="/app/chatbot">Chatbot</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;