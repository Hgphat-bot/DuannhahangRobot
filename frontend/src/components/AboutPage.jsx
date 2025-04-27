// frontend/src/components/AboutPage.jsx

import React from 'react';
// Import Link nếu bạn muốn thêm liên kết trong nội dung (ví dụ: link về trang chủ)
// import { Link } from 'react-router-dom';
import './AboutPage.css';


function AboutPage() {
  return (
    <div className="about-container">
      <h1>Chào mừng đến với Nhà hàng</h1>
      <p className="about-subtitle">Nơi hương vị truyền thống gặp gỡ công nghệ tương lai.</p>
      <div className="about-section story-section">
        <h2>Về Chúng Tôi</h2>
        <div className="section-image">
             <img src="/path/to/restaurant-story-image.jpg" alt="Hình ảnh nhà hàng" />
        </div>
        <div className="section-text">
            <p>Nhà hàng ra đời với mong muốn mang đến một trải nghiệm ẩm thực hoàn toàn mới lạ và độc đáo. Chúng tôi tin rằng sự kết hợp giữa những món ăn truyền thống đậm đà hương vị Việt và sự tiện lợi, hiện đại của công nghệ sẽ tạo nên một không gian thưởng thức khó quên cho mọi thực khách.</p>
            <p>Tại nhà hàng của chúng tôi, mỗi món ăn đều được chế biến từ những nguyên liệu tươi ngon nhất, giữ trọn hương vị bản xứ. Nhưng điều làm nên sự khác biệt chính là cách chúng tôi phục vụ - với sự hỗ trợ đắc lực từ đội ngũ công nghệ và những chú robot thân thiện của mình.</p>
        </div>
      </div>

       <div className="about-section tech-section">
           <h2>Công Nghệ và Sáng Tạo</h2>
             <div className="section-image layout-reverse">
                 <img src="/congnghe.png" alt="Công nghệ nhà hàng" />
                 <img src="/congnghe2.png" alt="Công nghệ nhà hàng" />
            </div>
            <div className="section-text">
               <p>Chúng tôi không ngừng tìm tòi và áp dụng các giải pháp công nghệ tiên tiến nhất vào quy trình vận hành của nhà hàng. Từ hệ thống quản lý thông minh, ứng dụng đặt món tiện lợi, cho đến việc tích hợp AI và robot vào khâu phục vụ, tất cả nhằm mục tiêu tối ưu hóa trải nghiệm của khách hàng và tạo ra một môi trường làm việc hiệu quả cho nhân viên.</p>
               <p>Công nghệ không chỉ giúp giảm thời gian chờ đợi, tăng độ chính xác trong phục vụ mà còn mang đến những tương tác thú vị và mới mẻ cho thực khách.</p>
            </div>
       </div>

       <div className="about-section robot-section">
           <h2>Gặp Gỡ Robot Phục Vụ</h2>
           <div className="section-image">
               <img src="/robot.png" alt="Robot phục vụ" />
               <img src="/robot2.png" alt="Robot phục vụ" />
           </div>
           <div className="section-text">
              <p>Điểm nhấn độc đáo tại Nhà hàng chính là sự góp mặt của đội ngũ robot phục vụ thông minh. Những người bạn máy này không chỉ giúp vận chuyển món ăn và đồ uống đến tận bàn một cách nhanh chóng và chính xác mà còn có khả năng tương tác cơ bản với khách hàng, tạo nên không khí vui vẻ và hiện đại.</p>
              <p>Robot hoạt động liền mạch với nhân viên con người của chúng tôi, đảm bảo rằng bạn luôn nhận được sự phục vụ chu đáo và hiệu quả nhất. Trải nghiệm được một chú robot mang món ăn đến bàn chắc chắn sẽ là một kỷ niệm đáng nhớ!</p>
           </div>
       </div>
    </div>
  );
}

export default AboutPage;