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
// <-- SỬA DÒNG IMPORT NÀY -->
import RegistrationPage from './components/RegistrationPage.jsx'; // <-- ĐẢM BẢO import từ đúng file RegistrationPage.jsx
import EmployeePage from './components/EmployeePage.jsx'; // Đảm bảo import
// Đảm bảo import FoodMenuPage
import FoodMenuPage from './components/FoodMenuPage.jsx'; // Đảm bảo dòng import này có mặt

// Đảm bảo import CartProvider từ file Context.jsx
import { CartProvider } from './CartContext.jsx'; // <-- Đảm bảo dòng import này chính xác và trỏ đến .jsx file

import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// *** CẤU HÌNH ROUTER HIỆN TẠI ***
const router = createBrowserRouter([
  {
    path: "/", // Route gốc "/" - Sẽ hiển thị Layout
    element: <Layout />, // Sử dụng Layout Component (có Header)
    children: [ // Các Route con có Header
      { index: true, element: <App /> }, // Dashboard tại "/"
      { path: "/about", element: <AboutPage /> }, // /about
      { path: "/menu", element: <MenuPage /> },     // /menu (trang lựa chọn)
      { path: "/chatbot", element: <ChatbotPage /> }, // /chatbot
      { path: "/dat-ban", element: <ReservationPage /> }, // /dat-ban
      { path: "/employees", element: <EmployeePage /> }, // /employees
      // Route cho Food Menu Page
      { path: "/food-menu", element: <FoodMenuPage /> }, // /food-menu (trang lưới món ăn)
      // Thêm các Route con khác có Header ở đây
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegistrationPage />,
  }
  // Thêm các Route khác không có Header ở đây (ví dụ: trang 404 tùy chỉnh)
  // { path: "*", element: <NotFoundPage /> }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Đảm bảo CartProvider bọc RouterProvider */}
    <CartProvider> {/* Đảm bảo đã import CartProvider */}
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>,
);