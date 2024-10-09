import React from 'react'
import { useNavigate } from 'react-router-dom';
import SideMenu from '../../components/SideMenu'
import { FaRegCheckSquare } from "react-icons/fa";

function CargaSuccess() {

  const navigate = useNavigate(); 
  const handleClickRegresar = () => {
    navigate('/cargaAsistencia/:eventId');
  };

  return (
    <div className="row">
      <SideMenu />
      <div className='col-10 homeDiv cargaToggle'>
        <div className='userProcess' id='success'>
          <FaRegCheckSquare className='successIcon' />
          <h1>Tu registro de asistencia se ha realizado correctamente</h1>
          <button className='buttonP' onClick={handleClickRegresar}>Salir</button>
        
        </div>
        <div className="logoUnal">
          <img src="/src/assets/images/Logounal.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default CargaSuccess
