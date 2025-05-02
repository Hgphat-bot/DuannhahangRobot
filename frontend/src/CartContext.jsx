import React, { createContext, useContext } from 'react';

// 1. Tạo Context Giỏ hàng
const CartContext = createContext();

// <-- ĐẢM BẢO MẢNG DỮ LIỆU MÓN ĂN NÀY CÓ MẶT VÀ CHÍNH XÁC -->
const menuItemsData = [
  { id: 1, name: "Phở Bò Đặc Biệt", description: "Phở truyền thống với thịt bò tươi ngon và nước dùng đậm đà.", price: "85.000 VNĐ", image: "/pho-bo-dac-biet.jpg", category: "Phở" },
  { id: 2, name: "Bún Chả Hà Nội", description: "Bún chả chuẩn vị Hà Thành.", price: "75.000 VNĐ", image: "/bun-cha-hn.jpg", category: "Bún" },
  { id: 3, name: "Nem Rán", description: "Nem rán giòn rụm.", price: "50.000 VNĐ", image: "/nem-ran.jpg", category: "Món khai vị" },
  { id: 4, name: "Gỏi Cuốn Tôm Thịt", description: "Gỏi cuốn tươi mát.", price: "60.000 VNĐ", image: "/goi-cuon.jpg", category: "Món khai vị" },
  // ... đảm bảo các item khác cũng có đầy đủ thuộc tính (id, name, description, price, image)
];

// Hàm tìm item theo id
const getItemById = (id) => {
    return menuItemsData.find(item => item.id === id);
};


// 2. Tạo Component Context Provider
export const CartProvider = ({ children }) => {

  return (
    // Cung cấp state và các hàm xử lý qua Context.Provider
    <CartContext.Provider value={{
      // ... các giá trị khác ...
      getItemById, // Hàm lấy thông tin item
      menuItemsData, // <-- ĐẢM BẢO MẢNG DỮ LIỆU NÀY CÓ TRONG OBJECT VALUE
    }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};