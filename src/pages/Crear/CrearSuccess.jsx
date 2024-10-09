import React from "react";
import { FiUserCheck } from "react-icons/fi";
import SideMenu from "../../components/SideMenu";
import "./CrearEvento.css";

function CrearSuccess() {
  return (
    <div className="row">
      <SideMenu />
      <div className="col-10 homeDiv userProcess" id="success">
        <FiUserCheck className="successIcon" />
        <h1>El usuario se ha creado correctamente</h1>
        <button className="buttonP">Salir</button>
      </div>
      <div className="logoUnal">
          <img src="/src/assets/images/Logounal.png" alt="" />
        </div>
    </div>
  );
}

export default CrearSuccess;
