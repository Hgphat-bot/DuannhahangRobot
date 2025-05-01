// frontend/src/components/Header.jsx

import React, { useState } from 'react'; // Import useState
import './Header.css'; // Import CSS riêng cho Header
import { Link } from 'react-router-dom'; // Import Component Link

function Header() {
  // State để quản lý trạng thái hiển thị của dropdown Tài khoản
  const [isAccountDropdownVisible, setAccountDropdownVisible] = useState(false); // Ban đầu ẩn

  // Hàm xử lý khi rê chuột vào khu vực Tài khoản
  const handleMouseEnterAccount = () => {
    setAccountDropdownVisible(true); // Hiển thị dropdown
  };

  // Hàm xử lý khi rê chuột ra khỏi khu vực Tài khoản
  const handleMouseLeaveAccount = () => {
    setAccountDropdownVisible(false); // Ẩn dropdown
  };


  return (
    <header className="site-header"> {/* Container Header chính */}
      <div className="header-logo"> {/* Khu vực Logo */}
        {/* Sử dụng thẻ <img> cho logo */}
        {/* Đảm bảo file ảnh logo (ví dụ: logo.jpg) ở thư mục public */}
        {/* Thay đổi "logo.jpg" nếu tên file ảnh của bạn khác */}
        <img src="/logo.jpg" alt="Logo Nhà hàng ABC" className="logo-img" />
      </div>

      {/* Nhóm các mục Nav và Actions lại để căn chỉnh sang phải */}
      {/* Sử dụng lớp header-right-group để áp dụng Flexbox cho nhóm này */}
      <div className="header-right-group">
        <nav className="header-nav"> {/* Khu vực Menu Điều hướng */}
          <ul> {/* Danh sách các mục Menu */}
            {/* Sử dụng Component <Link> với thuộc tính 'to' trỏ đến Route */}
            <li><Link to="/">Trang chủ</Link></li> {/* <-- Link về trang gốc "/" (Dashboard) */}
            <li><Link to="/about">Giới thiệu</Link></li> {/* <-- Link đến trang Giới thiệu (/about) */}
            <li><Link to="/menu">Menu</Link></li>     {/* <-- Link đến trang Lựa chọn Menu (/menu) */}
            <li><Link to="/dat-ban">Đặt bàn</Link></li> {/* <-- Link đến trang Đặt bàn (/dat-ban) */}
            <li><Link to="/chatbot">Chatbot</Link></li> {/* <-- Link đến trang Chatbot (/chatbot) */}
             {/* Nếu có Link Liên hệ, tạo Route và Link tương tự */}
             {/* <li><Link to="/lien-he">Liên hệ</Link></li> */}
          </ul>
        </nav>

        {/* KHU VỰC CHO CÁC ICON HOẶC NÚT ACTIONS */}
        {/* Style trong Header.css */}
        <div className="header-actions">
            {/* Placeholder Tìm kiếm */}
            {/* Sử dụng thẻ a đơn giản hoặc Component Link nếu dẫn đến trang tìm kiếm */}
            <a href="#" className="action-icon">🔍</a>

            {/* CONTAINER CHO BIỂU TƯỢNG TÀI KHOẢN VÀ DROPDOWN */}
            {/* Style trong Header.css, gắn sự kiện rê chuột */}
            <div
              className="account-dropdown-container"
              onMouseEnter={handleMouseEnterAccount}
              onMouseLeave={handleMouseLeaveAccount}
            >
                {/* Biểu tượng Tài khoản */}
                {/* Style trong Header.css (kế thừa từ action-icon) */}
                <a href="#" className="action-icon account-icon">👤</a>

                {/* Menu thả xuống (Dropdown) */}
                {/* Sử dụng Conditional Rendering: chỉ hiển thị nếu isAccountDropdownVisible là true */}
                {isAccountDropdownVisible && (
                    <div className="account-dropdown-menu"> {/* Style trong Header.css */}
                        {/* Link đến trang Đăng nhập */}
                        <Link to="/login">Đăng nhập</Link> {/* <-- Link đến /login */}
                        {/* Link đến trang Đăng ký */}
                        <Link to="/register">Đăng ký</Link> {/* <-- Link đến /register */}
                    </div>
                )}
            </div> {/* Kết thúc .account-dropdown-container */}

            {/* Các icon/button khác nếu có (ví dụ: giỏ hàng) */}
            {/* <a href="#" className="action-icon">🛒</a> */}
            {/* Link đến trang Giỏ hàng (nếu muốn icon giỏ hàng ở header) */}
            {/* <Link to="/cart" className="action-icon">🛒</Link> */}
        </div> {/* Kết thúc .header-actions */}
      </div> {/* Kết thúc .header-right-group */}
    </header>
  );
}

export default Header; // Export Component Header