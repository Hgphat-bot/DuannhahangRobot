// frontend/src/App.jsx

// <-- ĐẢM BẢO CÓ CẢ 3 IMPORTS NÀY -->
import React, { useState, useEffect } from 'react'; // Import useState và useEffect
import './App.css'; // Import CSS cho Component App
import Header from './components/Header'; // Import Component Header
import { Link } from 'react-router-dom'; // Import Link


function App() {
  // State cho slider Menu Nổi bật: Lưu trữ chỉ số của item đang hiển thị
  const [currentHighlightIndex, setCurrentHighlightIndex] = useState(0);

  // Danh sách các món nổi bật (dữ liệu cho slider)
  // THAY THẾ ĐƯỜNG DẪN ẢNH MẪU BẰNG ĐƯỜNG DẪN THỰC TẾ CỦA BẠN TRONG THƯ MỤC public
  // Đảm bảo đường dẫn BẮT ĐẦU BẰNG DẤU '/'
  const highlightItems = [
    { id: 1, name: "Bò úc áp chảo", description: "Món bò đặc biệt của nhà hàng.", image: "/Boucapchao.jpg" },
    { id: 2, name: "Nghêu hấp sả", description: "Nghêu tươi ngon hấp cùng sả.", image: "/Ngheuhapxa.jpg" },
    { id: 3, name: "Sườn non nướng", description: "Sườn nướng thơm lừng.", image: "/Suonnonnuong.jpg" },
    { id: 4, name: "Chân ngỗng sốt điệp", description: "Món ăn độc đáo.", image: "/Channgongsodiep.jpg" },
    // Thêm các món nổi bật khác vào đây
  ];

  // Hàm xử lý bấm nút "Trước" (Điều hướng thủ công)
  const handlePrevHighlight = () => {
    setCurrentHighlightIndex(prevIndex =>
      prevIndex === 0 ? highlightItems.length - 1 : prevIndex - 1
    );
  };

  // Hàm xử lý bấm nút "Sau" (Điều hướng thủ công)
  const handleNextHighlight = () => {
    setCurrentHighlightIndex(prevIndex =>
      prevIndex === highlightItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Hàm xử lý bấm vào chấm tròn pagination (Điều hướng thủ công)
  const handleDotClick = (index) => {
    setCurrentHighlightIndex(index);
  };

  // HOOK useEffect CHO TỰ ĐỘNG TRƯỢT (Automatic Sliding)
  // Sẽ thiết lập interval khi Component được render lần đầu hoặc khi số lượng item thay đổi
  // Sẽ dừng interval khi Component bị unmount
  useEffect(() => {
      // Thiết lập interval để tự động chuyển ảnh sau mỗi 4 giây (4000ms)
      const intervalId = setInterval(() => {
          // Cập nhật state chỉ số ảnh bằng cách sử dụng functional update (an toàn hơn)
          setCurrentHighlightIndex(prevIndex =>
             prevIndex === highlightItems.length - 1 ? 0 : prevIndex + 1
          );
      }, 4000); // Thời gian chờ giữa các lần chuyển (đơn vị: mili giây)

      // Hàm cleanup: Dừng interval khi Component bị unmount
      return () => clearInterval(intervalId);
  }, [highlightItems.length]); // Dependency array: Chỉ chạy lại useEffect khi số lượng item thay đổi


  return (
    <> {/* Fragment bao ngoài để trả về nhiều hơn một phần tử */}

      {/* HEADER - Luôn hiển thị vì Component App được render trong Layout */}
      <Header />

      {/* KHU VỰC NỘI DUNG CHÍNH - Được căn giữa và giới hạn chiều rộng bằng CSS .main-content */}
      <div className="main-content">

        {/* HERO SECTION - Phần nổi bật đầu trang */}
        <div className="hero-section"> {/* Style trong App.css */}
          <div className="hero-content"> {/* Style trong App.css */}
            <h1>Chào mừng đến với Nhà hàng ABC!</h1>
            <p>Trải nghiệm ẩm thực độc đáo kết hợp công nghệ phục vụ hiện đại.</p>
            {/* Nút Call to Action */}
            <Link to="/menu" className="hero-button">Khám phá Menu</Link> {/* Style trong App.css */}
          </div>
        </div>
        {/* KẾT THÚC HERO SECTION */}


        {/* Section 1: Giới thiệu Menu Nổi bật - CÓ SLIDER TỰ ĐỘNG VÀ PAGINATION */}
        {/* ĐẢM BẢO TOÀN BỘ KHỐI DƯỚI ĐÂY ĐƯỢC SAO CHÉP VÀ DÁN CHÍNH XÁC */}
        <div className="content-section menu-highlights-section"> {/* Style trong App.css */}
            <h2>Menu Nổi bật</h2> {/* Style trong App.css */}
            <p>Khám phá những món ăn đặc sắc được yêu thích nhất của chúng tôi.</p> {/* Style trong App.css */}

            {/* CONTAINER BAO SLIDER - KHUNG NHÌN HIỂN THỊ 1 ITEM */}
            <div className="highlight-slider-container"> {/* Style trong App.css */}

                {/* WRAPPER CHỨA TẤT CẢ ITEM - BỊ TRƯỢT NGANG */}
                {/* style={{ transform: `translateX(-${currentHighlightIndex * 100}%)` }} Được thêm inline */}
                <div className="highlight-slider-wrapper"
                     style={{ transform: `translateX(-${currentHighlightIndex * 100}%)` }}>
                    {
                      highlightItems.map((item) => (
                        <div key={item.id} className="highlight-slider-item">
                             <img src={item.image} alt={item.name} />
                             <div className="highlight-item-info">
                                 <h3>{item.name}</h3>
                                 <p>{item.description}</p>
                             </div>
                        </div>
                      ))
                    }
                </div>
                {highlightItems.length > 1 && (
                     <> {/* Fragment để bao 2 nút nếu điều kiện đúng */}
                        <button onClick={handlePrevHighlight} className="slider-button prev-button">❮</button> {/* Style trong App.css */}
                        <button onClick={handleNextHighlight} className="slider-button next-button">❯</button> {/* Style trong App.css */}
                     </> /* <-- Đóng Fragment */
                )} {/* <-- Đóng conditional rendering */ }


            </div> {/* Kết thúc highlight-slider-container */}

            {/* KHU VỰC PAGINATION DOTS */}
            {/* Sử dụng Conditional Rendering nếu không muốn chấm tròn hiển thị khi chỉ có 1 item */}
            {highlightItems.length > 1 && ( /* <-- Mở conditional rendering nếu muốn */
                <div className="slider-pagination"> {/* Style trong App.css */}
                    {/* Vòng lặp map qua mảng item để tạo các chấm tròn */}
                    {
                      highlightItems.map((_, index) => (
                        <span
                            key={index}
                            className={`pagination-dot ${index === currentHighlightIndex ? 'active' : ''}`}
                            onClick={() => handleDotClick(index)}
                        ></span>
                      ))
                    }
                </div>
            )}


            {/* Nút xem toàn bộ menu bên dưới slider */}
            <Link to="/menu" className="section-button">Xem Toàn Bộ Menu</Link> {/* Style trong App.css */}
        </div>
        {/* KẾT THÚC SECTION SLIDER */}


        {/* SECTION 2: Giới thiệu Chức năng Đặt Bàn */}
         <div className="content-section reservation-promo-section"> {/* Style trong App.css */}
            <h2>Đặt Bàn Dễ Dàng</h2>
            <p>Đặt trước để đảm bảo có chỗ ngồi tốt nhất cho trải nghiệm của bạn.</p>
            <Link to="/dat-ban" className="section-button">Đặt Bàn Ngay</Link> {/* Style trong App.css */}
        </div>

        {/* SECTION 3: Giới thiệu về Chatbot/Công nghệ phục vụ */}
         <div className="content-section chatbot-promo-section"> {/* Style trong App.css */}
             <div className="section-content-layout layout-reverse"> {/* Style trong App.css */}
                 <div className="section-text"> {/* Style trong App.css */}
                    <h2>Chatbot AI</h2> {/* Style trong App.css */}
                    <p>Chatbot của chúng tôi sẵn sàng trả lời mọi câu hỏi về nhà hàng và hỗ trợ bạn.</p> {/* Style trong App.css */}
                    <Link to="/chatbot" className="section-button">Trò chuyện Ngay</Link> {/* Style trong App.css */}
                 </div>
                  <div className="section-image"> {/* Style trong App.css */}
                    <img src="/path/to/chatbot-image.jpg" alt="Chatbot" /> {/* Style trong App.css, THAY ĐƯỜNG DẪN ẢNH MẪU */}
                 </div>
             </div>
        </div>

        {/* CÁC SECTION NỘI DUNG KHÁC (nếu có) */}

      </div> {/* Kết thúc .main-content */}

      {/* FOOTER (nếu có) */}
      {/* <footer className="app-footer">...</footer> */}

    </>
  );
}

export default App; // Export Component App