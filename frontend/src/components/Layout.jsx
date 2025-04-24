import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout() {
  return (
    <>
      <Header />
      <div className="page-content">
         <Outlet />
      </div>
    </>
  );
}

export default Layout;