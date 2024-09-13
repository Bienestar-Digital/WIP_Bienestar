import React from 'react'
import { useNavigate } from 'react-router-dom';

import { IoWarningOutline } from "react-icons/io5";

function CargaFailed() {

  const navigate = useNavigate(); 
  const handleClickRegresar = () => {
    navigate('/cargaAsistencia');
  };

  return (
    <div className='userProcess' id='error'>
      <IoWarningOutline />
      <h1>Ha ocurrido un error, por favor inténtalo nuevamente.</h1>
      <button className='buttonP' onClick={handleClickRegresar}>Intentelo de nuevo</button>
      <a href="">Salir</a>
    </div>
  )
}

export default CargaFailed
