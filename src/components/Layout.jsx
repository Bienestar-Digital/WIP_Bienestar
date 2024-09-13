// src/components/Layout.jsx
import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import SideMenu from './SideMenu'; 

const Layout = () => {
  const showSideMenu = location.pathname !== "/";
  return (
    <div className="row">
      {showSideMenu && <SideMenu />} 
      <div className={showSideMenu ? "col-10" : "col-12"}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
