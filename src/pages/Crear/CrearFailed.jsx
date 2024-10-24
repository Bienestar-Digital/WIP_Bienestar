import React from "react";
import { FiUserX } from "react-icons/fi";
import SideMenu from "../../components/SideMenu";

function CrearFailed() {
  return (
    <div className="row">
      <SideMenu />
      <span className="col-2"></span>
      <div className="col-10 homeDiv userProcess" id="error">
        <FiUserX />
        <h1 id="error">Ha ocurrido un error, por favor inténtelo nuevamente.</h1>
        <button className="buttonP" >Intentelo de nuevo</button>
        <a href="">Salir</a>
      </div>
      <div className="logoUnal">
          <img src="/src/assets/images/Logounal.png" alt="" />
        </div>
    </div>
  );
}

export default CrearFailed;
