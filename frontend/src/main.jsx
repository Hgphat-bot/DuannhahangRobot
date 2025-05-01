// frontend/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Component chính (Dashboard)
import LoginPage from './components/LoginPage.jsx'; // Component trang Đăng nhập
import AboutPage from './components/AboutPage.jsx'; // Component trang Giới thiệu
import MenuPage from './components/MenuPage.jsx'; // Component trang Menu (trang lựa chọn)
import Layout from './components/Layout.jsx'; // Component Layout chung (có Header)
import ChatbotPage from './components/ChatbotPage.jsx'; // Component trang Chatbot
import ReservationPage from './components/ReservationPage.jsx'; // Component trang Đặt bàn
import RegistrationPage from './components/RegistrationPage.jsx'; // <-- Đảm bảo import từ đúng file RegistrationPage.jsx
import EmployeePage from './components/EmployeePage.jsx'; // Đảm bảo import
// Đảm bảo import FoodMenuPage
import FoodMenuPage from './components/FoodMenuPage.jsx'; // <-- Đảm bảo dòng import này có mặt

// Đảm bảo import CartProvider từ file Context.jsx (đã đổi tên)
import { CartProvider } from './CartContext.jsx'; // <-- ĐẢM BẢO IMPORT TỪ FILE .jsx

import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// *** CẤU HÌNH ROUTER HIỆN TẠI ***
// - Route gốc "/" sử dụng Layout làm cha.
// - Dashboard (App) là Route con 'index' của "/".
// - Các trang khác (About, Menu, Chatbot, Đặt bàn, Nhân viên, Menu Món ăn) cũng là con của "/".
// - Trang Đăng nhập và Đăng ký ở các đường dẫn riêng (/login, /register) KHÔNG có Header.
const router = createBrowserRouter([
  {
    path: "/", // <-- Route gốc "/" - Sẽ hiển thị Layout
    element: <Layout />, // <-- Sử dụng Layout Component (có Header)
    children: [ // <-- Các Route con sẽ hiển thị bên trong Outlet của Layout
      { index: true, element: <App /> }, // Dashboard tại "/"
      { path: "about", element: <AboutPage /> }, // /about
      { path: "menu", element: <MenuPage /> },     // /menu (trang lựa chọn)
      { path: "chatbot", element: <ChatbotPage /> }, // /chatbot
      { path: "dat-ban", element: <ReservationPage /> }, // /dat-ban
      { path: "employees", element: <EmployeePage /> }, // /employees
      { path: "food-menu", element: <FoodMenuPage /> }, // /food-menu (trang lưới món ăn)
      // Thêm các Route con khác có Header ở đây
    ],
    // errorElement cho các route con của "/" nếu cần
    // errorElement: <ErrorPage />,
  },
   // CÁC ROUTE KHÔNG CÓ HEADER (độc lập với Layout gốc)
   // Các trang này sẽ hiển thị KHÔNG có Header mặc định của Layout
  {
    path: "/login", // Trang Đăng nhập ở đường dẫn /login
    element: <LoginPage />, // Render LoginPage (không có Header)
  },
  {
    path: "/register", // Trang Đăng ký ở đường dẫn /register
    element: <RegistrationPage />, // Render RegistrationPage (không có Header)
  }
  // Thêm các Route khác không có Header ở đây
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Đảm bảo CartProvider bọc RouterProvider để state giỏ hàng có thể truy cập ở mọi nơi */}
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>,
);