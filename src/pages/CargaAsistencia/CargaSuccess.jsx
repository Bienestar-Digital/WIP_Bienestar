import React from 'react'
import { useNavigate } from 'react-router-dom';
import SideMenu from '../../components/SideMenu'
import { FaRegCheckSquare } from "react-icons/fa";
import "../Crear/CrearEvento.css";

function CargaSuccess() {

  const navigate = useNavigate(); 
  const handleClickRegresar = () => {
    navigate('/carga-asistencia/:eventId');
  };

  return (
    <div className="row">

      <SideMenu />
      <span className="col-2"></span>
      <div className='col-10 homeDiv cargaToggle'>

        <div className='userProcess' id='success'>
          <FaRegCheckSquare className='successIcon' />
          <h1>Tu registro de asistencia se ha realizado correctamente</h1>
          <div className="d-flex flex-column justify-content-center buttonsEvents">
            <button className='buttonE' onClick={handleClickRegresar}>Salir</button>
          </div>
        </div>
        {/* <div className="logoUnal">
          <img src="/src/assets/images/Logounal.png" alt="" />
        </div> */}
      </div>
    </div>
  )
}

export default CargaSuccess
