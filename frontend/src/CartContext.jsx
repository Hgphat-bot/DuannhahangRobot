import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();
const menuItemsData = [
  { id: 1, name: "Bò úc áp chảo", description: "Món bò đặc biệt của nhà hàng.", price: "85.000 VNĐ", image: "/Boucapchao.jpg", category: "Phở" },
  { id: 2, name: "Nghêu hấp sả", description: "Nghêu tươi ngon hấp cùng sả.", price: "75.000 VNĐ", image: "/Ngheuhapxa.jpg", category: "Bún" },
  { id: 3, name: "Sườn non nướng", description: "Sườn nướng thơm lừng.", price: "50.000 VNĐ", image: "/nem-ran.jpg", category: "Món khai vị" },
  { id: 4, name: "Chỏi Cuốn Tôm Thịt", description: "Gỏi cuốn tươi mát.", price: "60.000 VNĐ", image: "/goi-cuon.jpg", category: "Món khai vị" },
  // ... copy toàn bộ mảng dữ liệu món ăn vào đây ...
];

const getItemById = (id) => {
    return menuItemsData.find(item => item.id === id);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const handleAddToCart = (item) => {
    setCart(prevCart => {
      const itemId = item.id;
      const newCart = { ...prevCart };
      newCart[itemId] = (newCart[itemId] || 0) + 1;
      console.log("Giỏ hàng cập nhật (Thêm):", newCart);
      return newCart;
    });
  };

  const handleRemoveItem = (itemId) => {
      setCart(prevCart => {
          const newCart = { ...prevCart };
          delete newCart[itemId];
          console.log("Giỏ hàng cập nhật (Xóa):", newCart);
          return newCart;
      });
  };

  const handleUpdateQuantity = (itemId, quantity) => {
      setCart(prevCart => {
          const newCart = { ...prevCart };
          if (quantity <= 0) {
              delete newCart[itemId];
          } else {
              newCart[itemId] = quantity;
          }
           console.log("Giỏ hàng cập nhật (Update):", newCart);
          return newCart;
      });
  };

   const handleClearCart = () => {
      setCart({});
      console.log("Giỏ hàng đã xóa hết.");
   };

  const totalItemsInCart = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);


  return (
    <CartContext.Provider value={{
      cart,
      totalItemsInCart,
      handleAddToCart,
      handleRemoveItem,
      handleUpdateQuantity,
      handleClearCart,
      getItemById,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
    const Context = useContext(CartContext);
    if (!Context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return Context;
};