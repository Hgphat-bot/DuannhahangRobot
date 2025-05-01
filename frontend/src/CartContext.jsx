// frontend/src/CartContext.jsx

import React, { createContext, useState, useContext } from 'react';

// 1. Tạo Context Giỏ hàng
const CartContext = createContext();

// Mảng dữ liệu món ăn (Copy từ App.jsx hoặc FoodMenuPage.jsx)
// Cần có mảng này để Context Provider có thể quản lý giỏ hàng và thông tin món ăn
// Tốt nhất nên quản lý dữ liệu món ăn ở một nơi chung hoặc lấy từ API
// Tạm thời copy vào đây để Context Provider có thể cung cấp hàm getItemById
const menuItemsData = [ // <-- COPY MẢNG DỮ LIỆU MÓN ĂN TỪ App.jsx HOẶC FoodMenuPage.jsx VÀO ĐÂY
  { id: 1, name: "Phở Bò Đặc Biệt", description: "Phở truyền thống với thịt bò tươi ngon và nước dùng đậm đà.", price: "85.000 VNĐ", image: "/pho-bo-dac-biet.jpg", category: "Phở" },
  { id: 2, name: "Bún Chả Hà Nội", description: "Bún chả chuẩn vị Hà Thành.", price: "75.000 VNĐ", image: "/bun-cha-hn.jpg", category: "Bún" },
  { id: 3, name: "Nem Rán", description: "Nem rán giòn rụm.", price: "50.000 VNĐ", image: "/nem-ran.jpg", category: "Món khai vị" },
  { id: 4, name: "Gỏi Cuốn Tôm Thịt", description: "Gỏi cuốn tươi mát.", price: "60.000 VNĐ", image: "/goi-cuon.jpg", category: "Món khai vị" },
  // ... copy toàn bộ mảng dữ liệu món ăn vào đây ...
];

// Hàm tìm item theo id (để Context Provider cung cấp)
const getItemById = (id) => {
    return menuItemsData.find(item => item.id === id);
};


// 2. Tạo Component Context Provider
export const CartProvider = ({ children }) => { // <-- Xuất với tên CartProvider
  // State giỏ hàng (như đã có trong App.jsx)
  const [cart, setCart] = useState({}); // { itemId: quantity, ... }

  // Hàm xử lý khi bấm nút "Thêm vào giỏ" (như đã có trong App.jsx)
  const handleAddToCart = (item) => {
    setCart(prevCart => {
      const itemId = item.id;
      const newCart = { ...prevCart };
      newCart[itemId] = (newCart[itemId] || 0) + 1;
      console.log("Giỏ hàng cập nhật (Thêm):", newCart);
      return newCart;
    });
  };

  // Hàm xử lý xóa 1 item khỏi giỏ (sẽ dùng trên trang giỏ hàng)
  const handleRemoveItem = (itemId) => {
      setCart(prevCart => {
          const newCart = { ...prevCart };
          delete newCart[itemId]; // Xóa item khỏi object cart
          console.log("Giỏ hàng cập nhật (Xóa):", newCart);
          return newCart;
      });
  };

  // Hàm xử lý cập nhật số lượng item (sẽ dùng trên trang giỏ hàng)
  const handleUpdateQuantity = (itemId, quantity) => {
      setCart(prevCart => {
          const newCart = { ...prevCart };
          if (quantity <= 0) {
              delete newCart[itemId]; // Nếu số lượng <= 0 thì xóa item
          } else {
              newCart[itemId] = quantity; // Ngược lại cập nhật số lượng
          }
           console.log("Giỏ hàng cập nhật (Update):", newCart);
          return newCart;
      });
  };

   // Hàm xử lý xóa hết giỏ hàng (như đã có trong FoodMenuPage tạm thời)
   const handleClearCart = () => {
      setCart({});
      console.log("Giỏ hàng đã xóa hết.");
   };


  // Tính tổng số lượng món trong giỏ hàng
  const totalItemsInCart = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);


  return (
    // Cung cấp state và các hàm xử lý qua Context.Provider
    // Value là object chứa tất cả những gì bạn muốn chia sẻ
    <CartContext.Provider value={{
      cart, // state giỏ hàng
      totalItemsInCart, // tổng số lượng
      handleAddToCart, // hàm thêm món
      handleRemoveItem, // hàm xóa món
      handleUpdateQuantity, // hàm cập nhật số lượng
      handleClearCart, // hàm xóa hết
      getItemById, // hàm lấy thông tin món ăn theo id
      // Bạn có thể thêm toàn bộ mảng menuItemsData nếu cần
      // menuItemsData,
    }}>
      {children} {/* Render tất cả Component con được bọc */}
    </CartContext.Provider>
  );
};

// 3. Tạo Custom Hook để sử dụng Context dễ dàng hơn
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => { // <-- Xuất hook useCart
  const context = useContext(CartContext);
  if (!context) {
    // Kiểm tra xem hook có được sử dụng bên trong Provider không
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};