import React from 'react'
import { useNavigate } from 'react-router-dom';
import SideMenu from '../../components/SideMenu'
import { IoWarningOutline } from "react-icons/io5";

function CargaFailed() {

  const navigate = useNavigate(); 
  const handleClickRegresar = () => {
    navigate('/cargaAsistencia/:eventId');
  };

  return (
    <div className="row">

      <SideMenu />
      <div className='col-10 homeDiv cargaToggle'>

        <div className='userProcess' id='error'>
          <IoWarningOutline />
          <h1 id='error'>Ha ocurrido un error, por favor inténtalo nuevamente.</h1>
          <button className='buttonP' onClick={handleClickRegresar}>Intentelo de nuevo</button>
          <a href="">Salir</a>
        </div>
        <div className="logoUnal">
          <img src="/src/assets/images/Logounal.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default CargaFailed
