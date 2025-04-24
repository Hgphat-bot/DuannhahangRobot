import React from 'react';
import './MenuPage.css';

function MenuPage() {
  return (
    <div className="menu-container">

      <div className="menu-left-column">
        <h1>Menu Chính</h1>
      </div>

      <div className="menu-right-column">

        <div className="menu-section employee-section">
          <h2>Quản lý Nhân viên</h2>
          <p>Nhấn vào đây để xem danh sách nhân viên hoặc thực hiện các thao tác quản lý.</p>
          <button>Xem Nhân viên</button>
        </div>

        <div className="menu-section food-section">
          <h2>Menu Món ăn</h2>
          <p>Nhấn vào đây để xem danh sách các món ăn của nhà hàng.</p>
          <button>Xem Món ăn</button>
        </div>

      </div>

    </div>

  );
}

export default MenuPage;