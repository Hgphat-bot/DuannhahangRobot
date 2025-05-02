// frontend/src/components/FoodMenuPage.jsx

import React, { useState } from 'react'; // Chỉ giữ useState nếu dùng cho searchQuery
// Import Link nếu cần
import { Link } from 'react-router-dom'; // Đảm bảo Link cũng được import nếu dùng
import './FoodMenuPage.css';
// <-- IMPORT HOOK useCart -->
import { useCart } from '../CartContext.jsx'; // Import hook useCart từ file Context. Đảm bảo đường dẫn đúng.


function FoodMenuPage() {
  // <-- CÁC ĐỊNH NGHĨA CỤC BỘ LIÊN QUAN ĐẾN GIỎ HÀNG/ITEM/SLIDER ĐÃ XÓA KHỎI FILE NÀY -->
  // Chúng được quản lý bởi Context API hoặc các Component khác


  // Sử dụng hook useCart để lấy các giá trị cần thiết từ Context
  // Lấy hàm thêm vào giỏ, mảng dữ liệu món ăn, tổng số món và hàm xóa hết giỏ
  const { handleAddToCart, menuItemsData, totalItemsInCart, handleClearCart } = useCart();


  // Lọc danh sách món ăn hiển thị (state và hàm cho tìm kiếm trên trang này)
  const [searchQuery, setSearchQuery] = useState(''); // Giữ state này cho tìm kiếm trên trang này

   const handleSearchInputChange = (event) => {
      setSearchQuery(event.target.value);
   };

  // Lọc trên mảng dữ liệu món ăn lấy từ Context
  const filteredMenuItems = menuItemsData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="food-menu-container">
      <h1>Menu Gọi món Nhà hàng ABC</h1>

      {/* Chỉ báo giỏ hàng (Sử dụng totalItemsInCart từ Context) */}
      {/* Đảm bảo nó không bị chú thích nếu bạn muốn hiển thị */}
       <Link to="/cart" className="cart-indicator-link"> {/* Style trong FoodMenuPage.css */ }
           <div className="cart-indicator"> {/* Style trong FoodMenuPage.css */ }
               Giỏ hàng: {totalItemsInCart} {/* Sử dụng totalItemsInCart lấy từ useCart() */}
           </div>
       </Link>


      {/* NÚT XÓA HẾT GIỎ HÀNG (Sử dụng totalItemsInCart và handleClearCart từ Context) */}
      {/* Đảm bảo nó không bị chú thích nếu bạn muốn hiển thị */}
      {totalItemsInCart > 0 && (
           <button className="clear-cart-button" onClick={handleClearCart}>Xóa hết giỏ hàng</button>
      )}


      {/* Ô TÌM KIẾM */}
      <div className="menu-search-box">
          <input
              type="text"
              placeholder="Tìm món ăn..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="menu-search-input"
          />
      </div>


      {/* KHU VỰC HIỂN THỊ DANH SÁCH MÓN ĂN (LƯỚI) */}
      <div className="menu-items-grid">
          {/* Lặp qua danh sách MÓN ĂN ĐÃ LỌC */}
          {
            filteredMenuItems.map(item => (
              <div key={item.id} className="menu-item">
                <img src={item.image} alt={item.name} />
                <div className="menu-item-info">
                    <h3>{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                    <p className="item-price">{item.price}</p>
                    {/* GỌI HÀM handleAddToCart TỪ CONTEXT KHI BẤM NÚT */}
                    <button className="add-to-cart-button" onClick={() => handleAddToCart(item)}>Thêm vào giỏ</button> {/* Gọi hàm handleAddToCart từ Context */}
                </div>
              </div>
            ))
          }
          {/* Hiển thị thông báo nếu không tìm thấy món nào */}
           {filteredMenuItems.length === 0 && (
               <p className="no-results-message">Không tìm thấy món ăn nào khớp với tìm kiếm.</p>
           )}
      </div>
      {/* KẾT THÚC KHU VỰC HIỂN THỊ DANH SÁCH MÓN ĂN */}

      {/* ... các phần khác ... */}
    </div>
  );
}

export default FoodMenuPage;