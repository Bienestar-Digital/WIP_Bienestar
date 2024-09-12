import React from "react";
import { IoIosMenu } from "react-icons/io";
import { MdHomeFilled } from "react-icons/md";
import { HiMiniUsers } from "react-icons/hi2";
import { LuUserCheck } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import "./SideMenu.css";
import { useNavigate } from "react-router-dom";

function SideMenu() {
const navigate = useNavigate(); 



  return (
    <div className="col-2 sideMenu">
      <nav>
        <ul>
          <IoIosMenu />
          Menú
        </ul>
        <ul className="borderSec">
          <MdHomeFilled />
          Home
        </ul>
        <ul className="borderSec"  onClick={()=>{  navigate('/crearUsuario');}}>
          <HiMiniUsers />
          Usuarios
        </ul>
        <ul className="borderSec">
          <LuUserCheck />
          Eventos
        </ul>
      </nav>
      <nav>
        <ul className="borderSec">
          <FaRegUserCircle />
          Perfil
        </ul>
        <ul>Cerrar sesión</ul>
      </nav>
    </div>
  );
}

export default SideMenu;
