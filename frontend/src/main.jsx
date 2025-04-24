import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import LoginPage from './components/LoginPage.jsx';
import AboutPage from './components/AboutPage.jsx';
import MenuPage from './components/MenuPage.jsx';
import Layout from './components/Layout.jsx';
import ChatbotPage from './components/ChatbotPage.jsx';
import ReservationPage from './components/ReservationPage.jsx';
import RegistrationPage from './components/RegistrationPage.jsx';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "menu",
        element: <MenuPage />,
      },
      {
        path: "chatbot",
        element: <ChatbotPage />,
      },
      {
        path: "dat-ban",
        element: <ReservationPage />,
      },
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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);