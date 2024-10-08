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
  const [selectedMenu, setSelectedMenu] = useState(''); // Estado para el menú seleccionado
  const [nextPath, setNextPath] = useState(null);

  useEffect(() => {
    const role = sessionStorage.getItem('rolname');
    setRole(role);
  }, []);

  useEffect(() => {
    if (nextPath) {
      navigate(nextPath); // Navega una vez que el estado del menú ha sido actualizado
    }
  }, [nextPath, navigate]);

  const handleMenuClick = (menu, path) => {
    setSelectedMenu(menu); // Cambiar el menú seleccionado
    navigate(path);        // Navegar después de cambiar el estado
  };

  return (
    <div className="col-2 sideMenu">
      <nav>
        <ul>
          <IoIosMenu />
          Menú
        </ul>
        <ul 
          className={`borderSec ${selectedMenu === 'home' ? 'selectedMenu' : ''}`} 
          onClick={() => handleMenuClick('home', '/home')}
        >
          <MdHomeFilled />
          Home
        </ul>
        {role === "admin" && (
          <ul 
            className={`borderSec ${selectedMenu === 'usuarios' ? 'selectedMenu' : ''}`} 
            onClick={() => handleMenuClick('usuarios', '/crearUsuario')}
          >
            <HiMiniUsers />
            Usuarios
          </ul>
        )}
        <ul 
          className={`borderSec ${selectedMenu === 'eventos' ? 'selectedMenu' : ''}`} 
          onClick={() => handleMenuClick('eventos', '/tusEventos')}
        >
          <LuUserCheck />
          Eventos
        </ul>
      </nav>
      <nav>
        <ul 
          className={`borderSec ${selectedMenu === 'perfil' ? 'selectedMenu' : ''}`} 
          onClick={() => handleMenuClick('perfil', '/perfil')}
        >
          <FaRegUserCircle />
          Perfil
        </ul>
        <ul 
          className={`borderSec ${selectedMenu === 'logout' ? 'selectedMenu' : ''}`} 
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

/* function SideMenu({ userData }) {
  const navigate = useNavigate(); 
  const [role, setRole] = useState(null);
  const [activeMenu, setActiveMenu] = useState('home');

  useEffect(() => {
      const role = sessionStorage.getItem('rolname');
      setRole(role);
  }, []);

  const handleNavigation = (menu) => {
    setActiveMenu(menu);
    navigateToPage(menu);
  };

  const navigateToPage = (menu) => {
    if (menu === 'home') navigate('/home');
    else if (menu === 'usuarios') navigate('/crearUsuario');
    else if (menu === 'eventos') navigate('/tusEventos');
    else if (menu === 'perfil') navigate('/perfil');
  };

  const getButtonStyle = (menu) => ({
    backgroundColor: activeMenu === menu ? 'blue' : '',
    color: activeMenu === menu ? 'white' : '',
  });

    return (
      <div className="col-2 sideMenu">
      <nav>
        <button className="menuButton">
          <IoIosMenu />
          Menú
        </button>
        <button 
          className="menuButton" 
          onClick={() => handleNavigation('home')} 
          style={getButtonStyle('home')}
        >
          <MdHomeFilled /> Home
        </button>
        {role === "admin" && (
          <button 
            className="menuButton" 
            onClick={() => handleNavigation('usuarios')} 
            style={getButtonStyle('usuarios')}
          >
            <HiMiniUsers /> Usuarios
          </button>
        )}
        <button 
          className="menuButton" 
          onClick={() => handleNavigation('eventos')} 
          style={getButtonStyle('eventos')}
        >
          <LuUserCheck />
          Eventos
        </button>
      </nav>
      <nav>
        <button 
          className="menuButton" 
          onClick={() => handleNavigation('perfil')} 
          style={getButtonStyle('perfil')}
        >
          <FaRegUserCircle />
          Perfil
        </button>
        <button 
          className="menuButton" 
          onClick={() => { 
            sessionStorage.removeItem('token'); 
            sessionStorage.removeItem('userId');  
            navigate('/'); 
          }}
        >
          Cerrar sesión
        </button>
      </nav>
    </div>
    );
}

export default SideMenu; */