import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import { Link } from 'react-router-dom';


function App() {
  const [currentHighlightIndex, setCurrentHighlightIndex] = useState(0);
  const highlightItems = [
    { id: 1, name: "Bò úc áp chảo", description: "Món bò đặc biệt của nhà hàng.", image: "/Boucapchao.jpg" },
    { id: 2, name: "Nghêu hấp sả", description: "Nghêu tươi ngon hấp cùng sả.", image: "/Ngheuhapxa.jpg" },
    { id: 3, name: "Sườn non nướng", description: "Sườn nướng thơm lừng.", image: "/Suonnonnuong.jpg" },
    { id: 4, name: "Chân ngỗng sốt điệp", description: "Món ăn độc đáo.", image: "/Channgongsodiep.jpg" },
  ];

  const handlePrevHighlight = () => {
    setCurrentHighlightIndex(prevIndex =>
      prevIndex === 0 ? highlightItems.length - 1 : prevIndex - 1
    );
  };

  const handleNextHighlight = () => {
    setCurrentHighlightIndex(prevIndex =>
      prevIndex === highlightItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentHighlightIndex(index);
  };

  useEffect(() => {
      const intervalId = setInterval(() => {
          setCurrentHighlightIndex(prevIndex =>
             prevIndex === highlightItems.length - 1 ? 0 : prevIndex + 1
          );
      }, 4000);

      return () => clearInterval(intervalId);
  }, [highlightItems.length]);


  return (
    <>
      <Header />
      <div className="main-content">
      <div className="content-section menu-highlights-section">
          <div className="highlight-slider-container">
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
                   <>
                      <button onClick={handlePrevHighlight} className="slider-button prev-button">❮</button>
                      <button onClick={handleNextHighlight} className="slider-button next-button">❯</button>
                   </>
              )}
          </div>
          {highlightItems.length > 1 && (
              <div className="slider-pagination">
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
      </div>
        <div className="hero-section">
          <div className="hero-content">
            <h1>Chào mừng đến với Nhà hàng của chúng tôi</h1>
            <p>Trải nghiệm ẩm thực độc đáo kết hợp công nghệ phục vụ hiện đại.</p>
            <Link to="/menu" className="hero-button">Khám phá Menu</Link>
          </div>
        </div>

         <div className="content-section reservation-promo-section">
            <h2>Đặt Bàn Dễ Dàng</h2>
            <p>Đặt trước để đảm bảo có chỗ ngồi tốt nhất cho trải nghiệm của bạn.</p>
            <Link to="/dat-ban" className="section-button">Đặt Bàn Ngay</Link>
        </div>

         <div className="content-section chatbot-promo-section">
             <div className="section-content-layout layout-reverse">
                 <div className="section-text">
                    <h2>Chatbot AI</h2>
                    <p>Chatbot của chúng tôi sẵn sàng trả lời mọi câu hỏi về nhà hàng và hỗ trợ bạn.</p>
                    <Link to="/chatbot" className="section-button">Trò chuyện Ngay</Link>
                 </div>
                  <div className="section-image">
                    <img src="/path/to/chatbot-image.jpg" alt="Chatbot" />
                 </div>
             </div>
        </div>

      </div>
    </>
  );
}

export default App;