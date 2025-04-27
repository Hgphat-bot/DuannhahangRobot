// frontend/src/components/FoodMenuPage.jsx

import React from 'react';
// Import Link nếu cần link từ trang này đi (ví dụ: về trang chủ)
// import { Link } from 'react-router-dom';
// Import CSS cho trang FoodMenuPage (sẽ tạo ở Bước 4)
import './FoodMenuPage.css'; // <-- Sẽ tạo file CSS này ở Bước 4

function FoodMenuPage() {
  // <-- DÁN MẢNG DỮ LIỆU MÓN ĂN MẪU TẠI ĐÂY -->
  const menuItems = [
    { id: 1, name: "Bò úc áp chảo", description: "Món bò đặc biệt của nhà hàng.", image: "/Boucapchao.jpg" },
    { id: 2, name: "Nghêu hấp sả", description: "Nghêu tươi ngon hấp cùng sả.", image: "/Ngheuhapxa.jpg" },
    { id: 3, name: "Sườn non nướng", description: "Sườn nướng thơm lừng.", image: "/Suonnonnuong.jpg" },
    { id: 4, name: "Chân ngỗng sốt điệp", description: "Món ăn độc đáo.", image: "/Channgongsodiep.jpg" },
    // ... các món khác ...
  ];


  return (
    <div className="food-menu-container"> {/* <-- Container chính cho trang hiển thị lưới món ăn */}
      <h1>Menu Món ăn Nhà hàng</h1> {/* Tiêu đề riêng cho trang này */}

      {/* KHU VỰC HIỂN THỊ DANH SÁCH MÓN ĂN (LƯỚI) */}
      {/* <-- DÁN PHẦN CODE NÀY TỪ MENU PAGE CŨ VÀO ĐÂY --> */}
      <div className="menu-items-grid"> {/* Style trong FoodMenuPage.css */}
          {
            menuItems.map(item => (
              <div key={item.id} className="menu-item"> {/* Style trong FoodMenuPage.css */}
                <img src={item.image} alt={item.name} /> {/* Style trong FoodMenuPage.css */}
                <div className="menu-item-info"> {/* Style trong FoodMenuPage.css */}
                    <h3>{item.name}</h3> {/* Style trong FoodMenuPage.css */}
                    <p className="item-description">{item.description}</p> {/* Style trong FoodMenuPage.css */}
                    <p className="item-price">{item.price}</p> {/* Style trong FoodMenuPage.css */}
                </div>
              </div>
            ))
          }
      </div>
      {/* KẾT THÚC KHU VỰC HIỂN THỊ DANH SÁCH MÓN ĂN */}

      {/* Có thể thêm phân trang, lọc, hoặc các chức năng khác */}
    </div>
  );
}

export default FoodMenuPage; // Xuất Component