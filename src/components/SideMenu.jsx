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
  const [selectedMenu, setSelectedMenu] = useState(null);  // Estado para el menú seleccionado

  useEffect(() => {
    const role = sessionStorage.getItem('rolname');
    setRole(role);
  }, []);

  const handleClick = (menu, path) => {
    setSelectedMenu(menu);
    navigate(path);
  };

  return (
    <div className="col-2 sideMenu">
      <nav>
        <ul>
          <IoIosMenu />
          Menú
        </ul>
        <ul 
          className="borderSec" 
          onClick={() => handleClick('home', '/home')}
          style={{
            backgroundColor: selectedMenu === 'home' ? '#94B43B' : 'transparent',
            color: selectedMenu === 'home' ? 'white' : 'black'
          }}
        >
          <MdHomeFilled />
          Home
        </ul>
        {(role === "admin") && (
          <ul 
            className="borderSec" 
            onClick={() => handleClick('usuarios', '/crearUsuario')}
            style={{
              backgroundColor: selectedMenu === 'usuarios' ? '#94B43B' : 'transparent',
              color: selectedMenu === 'usuarios' ? 'white' : 'black'
            }}
          >
            <HiMiniUsers />
            Usuarios
          </ul>
        )}
        <ul 
          className="borderSec" 
          onClick={() => handleClick('eventos', '/tusEventos')}
          style={{
            backgroundColor: selectedMenu === 'eventos' ? '#94B43B' : 'transparent',
            color: selectedMenu === 'eventos' ? 'white' : 'black'
          }}
        >
          <LuUserCheck />
          Eventos
        </ul>
      </nav>
      <nav>
        <ul 
          className="borderSec" 
          onClick={() => handleClick('perfil', '/perfil')}
          style={{
            backgroundColor: selectedMenu === 'perfil' ? '#94B43B' : 'transparent',
            color: selectedMenu === 'perfil' ? 'white' : 'black'
          }}
        >
          <FaRegUserCircle />
          Perfil
        </ul>
        <ul 
          className="borderSec" 
          onClick={() => {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('userId');
            navigate('/');
          }}
        >
          Cerrar sesión
        </ul>
      </nav>
    </div>
  );
}

export default SideMenu;