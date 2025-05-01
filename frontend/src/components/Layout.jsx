// frontend/src/components/Layout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import Header from './Header'; // Import Component Header
// import Footer component nếu có
// import Footer from './Footer';

// Bạn có thể tạo và import file CSS riêng cho Layout sau nếu muốn:
// import './Layout.css';

function Layout() {
  return (
    <> {/* Sử dụng Fragment để bao ngoài */}
      {/* HEADER - Luôn hiển thị ở trên cùng của layout này */}
      <Header />

      {/* Outlet là nơi nội dung của Route con sẽ được render */}
      {/* Ví dụ: nếu Route "/" (Dashboard) khớp, Component App sẽ render ở đây */}
      {/* Các Component con (như App) sẽ tự quản lý nội dung chính của chúng */}
      {/* Có thể bọc Outlet trong div để thêm padding/margin cho nội dung chung nếu cần */}
      {/* <div className="page-content"> */} {/* Style trong App.css hoặc file khác */}
         <Outlet /> {/* <--- ĐÂY LÀ VỊ TRÍ HIỂN THỊ NỘI DUNG ROUTE CON */}
      {/* </div> */}


      {/* FOOTER sẽ hiển thị ở dưới cùng (nếu có) */}
      {/* <Footer /> */}
    </>
  );
}

export default Layout; // Xuất Component Layout