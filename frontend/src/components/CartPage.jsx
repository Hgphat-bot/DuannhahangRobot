// frontend/src/components/CartPage.jsx

import React from 'react';
import './CartPage.css';
import { useCart } from './CartContext.jsx';

function CartPage() {
  const { cart, totalItemsInCart, handleRemoveItem, handleUpdateQuantity, getItemById } = useCart(); // handleUpdateQuantity được lấy ra ở đây

  const itemsInCart = Object.keys(cart).map(itemId => {
      const item = getItemById(parseInt(itemId, 10));
      const quantity = cart[itemId];
      return { ...item, quantity };
  });


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
                    <div className="cart-item-quantity"> {/* <-- Khu vực số lượng */}
                         Số lượng: {item.quantity} {/* Hiển thị số lượng hiện tại */}
                         {/* Nút tăng/giảm số lượng (BỎ CHÚ THÍCH 2 NÚT NÀY) */}
                         {/* Gắn onClick và gọi hàm handleUpdateQuantity */}
                         <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button> {/* <-- Nút Tăng */}
                         <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button> {/* <-- Nút Giảm */}
                    </div>
                    {/* Nút Xóa */}
                    <button className="remove-item-button" onClick={() => handleRemoveItem(item.id)}>Xóa</button>
                  </div>
                ))
              }
          </div>
      )}

      {/* ... các phần khác (tổng tiền, nút thanh toán, xóa hết) ... */}


    </div>
  );
}

export default CartPage;