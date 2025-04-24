// frontend/src/App.jsx

import React from 'react';
import './App.css'; // CSS cho Component App
import Header from './components/Header'; // Import Component Header
import { Link } from 'react-router-dom'; // Import Link

function App() {
  // ...

  return (
    <>
      {/* Header full width */}
      <Header />

      {/* Khu vực nội dung chính */}
      <div className="main-content"> {/* Container chính, giới hạn chiều rộng, căn giữa (style trong App.css) */}

        {/* HERO SECTION */}
        <div className="hero-section">
          <div className="hero-content">
            <h1>Chào mừng đến với Nhà hàng ABC!</h1>
            <p>Trải nghiệm ẩm thực độc đáo kết hợp công nghệ phục vụ hiện đại.</p>
            <Link to="/menu" className="hero-button">Khám phá Menu</Link>
          </div>
        </div>
        {/* KẾT THÚC HERO SECTION */}

        {/* Các hộp nội dung ban đầu (title-box, description-box) */}
        {/* Chúng ta có thể giữ lại hoặc thay thế bằng các section mới */}
        {/* <div className="main-content-layout"> ... các hộp ... </div> */}
         {/* Tạm thời giữ lại để bạn so sánh, sau này có thể xóa hoặc di chuyển nội dung */}


        {/* THÊM CÁC SECTION NỘI DUNG MỚI VÀO ĐÂY */}

        {/* Section 1: Giới thiệu Menu Nổi bật */}
        <div className="content-section menu-highlights-section">
            <h2>Menu Nổi bật</h2>
            <p>Khám phá những món ăn đặc sắc được yêu thích nhất của chúng tôi.</p>
            {/* Thêm hình ảnh hoặc danh sách các món nổi bật tại đây */}
             <div className="section-content-layout">
                {/* Ví dụ: Placeholder cho ảnh món ăn */}
                 <div className="highlight-item">
                     <img src="/path/to/food-image1.jpg" alt="Món ăn 1" /> {/* <-- THAY THẾ ẢNH MẪU */}
                     <h3>Tên Món Ăn 1</h3>
                     <p>Mô tả ngắn về món ăn.</p>
                 </div>
                  <div className="highlight-item">
                     <img src="/path/to/food-image2.jpg" alt="Món ăn 2" /> {/* <-- THAY THẾ ẢNH MẪU */}
                     <h3>Tên Món Ăn 2</h3>
                     <p>Mô tả ngắn về món ăn.</p>
                 </div>
                 {/* Thêm nhiều món khác */}
            </div>
            <Link to="/menu" className="section-button">Xem Toàn Bộ Menu</Link> {/* Nút xem thêm */}
        </div>

        {/* Section 2: Giới thiệu Chức năng Đặt Bàn */}
         <div className="content-section reservation-promo-section">
            <h2>Đặt Bàn Dễ Dàng</h2>
            <p>Đặt trước để đảm bảo có chỗ ngồi tốt nhất cho trải nghiệm của bạn.</p>
            {/* Thêm hình ảnh hoặc biểu tượng liên quan đến đặt bàn */}
            <Link to="/dat-ban" className="section-button">Đặt Bàn Ngay</Link> {/* Nút đặt bàn */}
        </div>

        {/* Section 3: Giới thiệu về Chatbot/Công nghệ phục vụ */}
         <div className="content-section chatbot-promo-section">
             <div className="section-content-layout layout-reverse"> {/* Ví dụ layout đảo ngược: ảnh bên phải, text bên trái */}
                 <div className="section-text">
                    <h2>Chatbot AI</h2>
                    <p>Chatbot của chúng tôi sẵn sàng trả lời mọi câu hỏi về nhà hàng và hỗ trợ bạn.</p>
                    <Link to="/chatbot" className="section-button">Trò chuyện Ngay</Link>
                 </div>
                  <div className="section-image">
                    <img src="/path/to/chatbot-image.jpg" alt="Chatbot" /> {/* <-- THAY THẾ ẢNH MẪU */}
                 </div>
             </div>
        </div>


        {/* Các Component hoặc nội dung khác của trang Dashboard */}

      </div> {/* Kết thúc .main-content */}

      {/* Footer */}
      {/* <footer className="app-footer">...</footer> */}
    </>
  );
}

export default App;