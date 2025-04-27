// frontend/src/components/CartPage.jsx

import React from 'react';
import './CartPage.css';
// <-- IMPORT HOOK useCart -->
import { useCart } from '../CartContext'; // Import hook useCart từ file Context
// import Link nếu cần link từ trang này đi (ví dụ: về trang chủ)
// import { Link } from 'react-router-dom';


function CartPage() {
  // <-- SỬ DỤNG HOOK useCart ĐỂ LẤY STATE GIỎ HÀNG VÀ HÀM -->
  const { cart, totalItemsInCart, handleRemoveItem, handleUpdateQuantity, getItemById } = useCart(); // Lấy giỏ hàng và các hàm từ Context

  // Chuyển object cart thành mảng các item để dễ render
  const itemsInCart = Object.keys(cart).map(itemId => {
      const item = getItemById(parseInt(itemId, 10)); // Lấy thông tin item gốc từ id
      const quantity = cart[itemId]; // Lấy số lượng từ state cart
      return { ...item, quantity }; // Tạo object mới kết hợp thông tin item và số lượng
  });


  return (
    <div className="cart-page-container">
      <h1>Giỏ hàng của bạn</h1>

      {/* HIỂN THỊ DANH SÁCH CÁC MÓN TRONG GIỎ HÀNG */}
      {totalItemsInCart === 0 ? ( // Kiểm tra nếu giỏ hàng rỗng
          <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
          <div className="cart-items-list"> {/* Style trong CartPage.css */}
              {
                itemsInCart.map(item => (
                  <div key={item.id} className="cart-item"> {/* Style trong CartPage.css */}
                    {/* Có thể hiển thị ảnh món ăn */}
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-info"> {/* Style trong CartPage.css */}
                      <h3>{item.name}</h3>
                      <p className="cart-item-price">{item.price}</p> {/* Giá của 1 item */}
                    </div>
                    <div className="cart-item-quantity"> {/* Style cho số lượng */}
                        {/* Input hoặc nút điều chỉnh số lượng */}
                         Số lượng: {item.quantity}
                         <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                         <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                    </div>
                    {/* Nút xóa item (sẽ dùng handleRemoveItem) */}
                    <button className="remove-item-button" onClick={() => handleRemoveItem(item.id)}>Xóa</button> {/* <-- Nút Xóa */}
                  </div>
                ))
              }
          </div>
      )}

      {/* Có thể hiển thị tổng tiền */}
      {/* {totalItemsInCart > 0 && (
          <div className="cart-summary">
              <h3>Tổng tiền: [Tính tổng tiền]</h3>
              <button className="checkout-button">Thanh toán</button>
          </div>
      )} */}

      {/* Có thể thêm nút xóa hết giỏ hàng */}
      {/* {totalItemsInCart > 0 && (
          <button className="clear-cart-button" onClick={handleClearCart}>Xóa hết giỏ hàng</button>
      )} */}


    </div>
  );
}

export default CartPage;