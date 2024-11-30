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
const [role, setRole] = useState(sessionStorage.getItem('rolname'));
  /* console.log("userData", userData);
  console.log("role", role); */
  useEffect(() => {
    const role = sessionStorage.getItem('rolname');
    setRole(role);

  }, []);

  return (
    <>
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
          {( role == "admin") && (
          <ul className="borderSec"  onClick={()=>{  navigate('/crear-usuario');}}>
            <HiMiniUsers />
            Usuarios
          </ul>)}        
          <ul className="borderSec" onClick={()=>{  navigate('/tus-eventos');}}>
            <LuUserCheck />
            Eventos
          </ul>
        </nav>
        <nav>
          <ul className="borderSec"  onClick={()=>{  navigate('/perfil');}}>
            <FaRegUserCircle />
            Perfil
          </ul>
          <ul  className="borderSec" onClick={()=>{
            sessionStorage.removeItem('token'); 
            sessionStorage.removeItem('userId'); 
            sessionStorage.clear(); // Limpia todos los datos de sessionStorage
            navigate('/')  }} >Cerrar sesión</ul>
        </nav>
      </div>
    </>

  );
}

export default SideMenu;