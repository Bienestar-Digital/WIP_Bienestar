import React from "react";
import { FiUserCheck } from "react-icons/fi";
import SideMenu from "../../components/SideMenu";
import "./CrearEvento.css";

function CrearSuccess() {
  return (
    <div className="row">
      <SideMenu />
      <span className="col-2"></span>
      <div className="col-10 homeDiv userProcess" id="success">
        <FiUserCheck className="successIcon" />
        <h1>El usuario se ha creado correctamente</h1>
        <div className="d-flex flex-column justify-content-center buttonsEvents">
          <button className="buttonE">Salir</button>
        </div>
      </div>
      {/* <div className="logoUnal">
          <img src="/src/assets/images/Logounal.png" alt="" />
        </div> */}
    </div>
  );
}

export default CrearSuccess;
