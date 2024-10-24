/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { MdHomeFilled } from "react-icons/md";
import { HiMiniUsers } from "react-icons/hi2";
import { LuUserCheck } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import "./SideMenu.css";
import { useNavigate } from "react-router-dom";

function SideMenu({ userData }) {
const navigate = useNavigate(); 
const [role, setRole] = useState(null);


useEffect(() => {
    const role = sessionStorage.getItem('rolname');
    setRole(role);
}, []); 



  return (
    <div className="col-2 sideMenu">
      <nav>
        <ul>
          <IoIosMenu />
          Menú
        </ul>
        <ul className="borderSec" onClick={()=>{  navigate('/home');}}>
          <MdHomeFilled />
          Home
        </ul>
        {(userData.roleName === 'admin' || role == "admin") && (
        <ul className="borderSec"  onClick={()=>{  navigate('/crearUsuario');}}>
          <HiMiniUsers />
          Usuarios
        </ul>)}     
        <ul className="borderSec" onClick={()=>{  navigate('/tusEventos');}}>
          <LuUserCheck />
          Eventos
        </ul>
      </nav>
      <nav>
        <ul className="borderSec"  onClick={()=>{  navigate('/perfil');}}>
          <FaRegUserCircle />
          Perfil
        </ul>
        <ul>Cerrar sesión</ul>
      </nav>
    </div>
  );
}

export default SideMenu;
