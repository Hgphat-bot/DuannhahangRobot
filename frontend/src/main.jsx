import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import LoginPage from './components/loginPage.jsx';
import AboutPage from './components/AboutPage.jsx';
import MenuPage from './components/MenuPage.jsx';
import Layout from './components/Layout.jsx';
import './index.css';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ReservationPage from './components/ReservationPage.jsx';
import ChatbotPage from './components/ChatbotPage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path:"app",
    element:<Layout />,
    children: [
      {
        path: "dashboard",
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
        path: "dat-ban",
        element: <ReservationPage />,
      },
      {
        path: "chatbot",
        element: <ChatbotPage />
      },
      {
        index: true,
        element: <App />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);