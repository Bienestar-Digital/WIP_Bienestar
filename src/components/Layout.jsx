// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideMenu from './SideMenu'; 

const Layout = () => {
  return (
    <div className="row">
      <SideMenu /> 
      <div className="col-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
