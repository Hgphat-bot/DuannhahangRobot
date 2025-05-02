// frontend/src/components/CartPage.jsx

import React from 'react';
import './CartPage.css';
import { useCart } from '../CartContext'; // Import hook useCart
// import Link nếu cần link từ trang này đi
// import { Link } from 'react-router-dom';


function CartPage() {
  // Lấy giỏ hàng và các hàm xử lý từ Context
  const { cart, totalItemsInCart, handleRemoveItem, handleUpdateQuantity, getItemById, handleClearCart } = useCart(); // <-- Đảm bảo lấy handleClearCart

  // Chuyển object cart thành mảng các item để dễ render
  const itemsInCart = Object.keys(cart).map(itemId => {
      const item = getItemById(parseInt(itemId, 10)); // Lấy thông tin item gốc từ id
      const quantity = cart[itemId]; // Lấy số lượng từ state cart
      // *** QUAN TRỌNG: TRẢ VỀ OBJECT CÓ ĐỦ THÔNG TIN MÓN ĂN ***
      // Để backend có thể lấy tên và giá
      return { id: item.id, name: item.name, price: parseFloat(item.price), quantity: quantity }; // Trả về object với id, tên, giá, số lượng
  });

  // <-- THÊM HÀM XỬ LÝ KHI BẤM NÚT "ĐẶT HÀNG" -->
  const handlePlaceOrder = async () => { // Thêm 'async' vì dùng fetch
      if (totalItemsInCart === 0) {
          console.log("Giỏ hàng trống, không thể đặt hàng.");
          return;
      }

      // Chuẩn bị dữ liệu giỏ hàng để gửi đến backend
      // Object cart hiện tại là {itemId: quantity}, cần thêm tên và giá
      // Tạo object mới với cấu trúc { itemId: {quantity: x, name: "...", price: y}, ... }
      const orderData = {};
      itemsInCart.forEach(item => {
          orderData[item.id] = {
              quantity: item.quantity,
              name: item.name,
              price: item.price // Đảm bảo price là số nếu cần tính tổng sau này
          };
      });


      console.log("Gửi dữ liệu đơn hàng:", orderData);

      try {
        const response = await fetch('http://localhost:3001/api/orders', { // <-- URL CỦA ENDPOINT BACKEND ĐẶT ĐỒ ĂN
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cart: orderData }), // <-- GỬI OBJECT CÓ KEY LÀ 'cart'
        });

        const result = await response.json();

        if (response.ok) {
          console.log("Đặt hàng thành công:", result);
          // Hiển thị thông báo thành công cho người dùng (tùy chọn)
          // Xóa hết giỏ hàng sau khi đặt thành công (tùy chọn)
          handleClearCart();

        } else {
          console.error('Lỗi từ backend:', result.message || response.statusText);
          // Hiển thị thông báo lỗi cho người dùng (tùy chọn)
        }

      } catch (error) {
        console.error('Lỗi khi gửi request đặt hàng:', error);
        // Hiển thị thông báo lỗi (tùy chọn)
      }
  };


  return (
    <div className="cart-page-container">
      <h1>Giỏ hàng của bạn</h1>

      {totalItemsInCart === 0 ? (
          <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
          <div className="cart-items-list">
              {
                itemsInCart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-info">
                      <h3>{item.name}</h3>
                      <p className="cart-item-price">{item.price}</p>
                    </div>
                    <div className="cart-item-quantity">
                         Số lượng: {item.quantity}
                         {/* Nút điều chỉnh số lượng */}
                         <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                         <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                    </div>
                    {/* Nút Xóa */}
                    <button className="remove-item-button" onClick={() => handleRemoveItem(item.id)}>Xóa</button>
                  </div>
                ))
              }
          </div>
      )}

      {/* NÚT ĐẶT HÀNG */}
      {totalItemsInCart > 0 && ( /* Chỉ hiển thị nút khi có món trong giỏ */
          <div className="cart-summary">
              {/* Có thể thêm tính tổng tiền tại đây */}
              {/* <h3>Tổng tiền: [Tính tổng tiền]</h3> */}
              <button className="checkout-button" onClick={handlePlaceOrder}>Đặt hàng</button> {/* <-- Nút Đặt hàng */}
          </div>
      )}

      {/* Nút Xóa hết giỏ hàng (tùy chọn, có thể đặt trong cart-summary hoặc riêng) */}
      {/* {totalItemsInCart > 0 && (
          <button className="clear-cart-button" onClick={handleClearCart}>Xóa hết giỏ hàng</button>
      )} */}


    </div>
  );
}

export default CartPage;