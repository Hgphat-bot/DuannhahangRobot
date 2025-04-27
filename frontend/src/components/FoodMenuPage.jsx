// frontend/src/components/FoodMenuPage.jsx

import React from 'react';
// import { Link } from 'react-router-dom';
import './FoodMenuPage.css';
import { useCart } from '../CartContext';

function FoodMenuPage() {
  // <-- DÁN MẢNG DỮ LIỆU MÓN ĂN MẪU TẠI ĐÂY -->
  const menuItems = [
    { id: 1, name: "Bò úc áp chảo", description: "Món bò đặc biệt của nhà hàng.", image: "/Boucapchao.jpg" },
    { id: 2, name: "Nghêu hấp sả", description: "Nghêu tươi ngon hấp cùng sả.", image: "/Ngheuhapxa.jpg" },
    { id: 3, name: "Sườn non nướng", description: "Sườn nướng thơm lừng.", image: "/Suonnonnuong.jpg" },
    { id: 4, name: "Chân ngỗng sốt điệp", description: "Món ăn độc đáo.", image: "/Channgongsodiep.jpg" },
    // ... các món khác ...
  ];
  const { handleAddToCart } = useCart();
  return (
    <div className="food-menu-container">
      <h1>Menu Gọi món Nhà hàng</h1>
      
      {/* KHU VỰC HIỂN THỊ DANH SÁCH MÓN ĂN (LƯỚI) */}
      <div className="menu-items-grid">
          { /* ... vòng lặp map qua menuItems và các item ... */ }
          {
            menuItems.map(item => (
              <div key={item.id} className="menu-item">
                <img src={item.image} alt={item.name} />
                <div className="menu-item-info">
                    <h3>{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                    <p className="item-price">{item.price}</p>
                    <button className="add-to-cart-button" onClick={() => handleAddToCart(item)}>Thêm vào giỏ</button>
                </div>
              </div>
            ))
          }
      </div>
    </div>
  );
}

export default FoodMenuPage;