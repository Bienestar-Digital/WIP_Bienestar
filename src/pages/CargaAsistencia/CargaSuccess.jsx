import React from 'react'
import { useNavigate } from 'react-router-dom';

import { FaRegCheckSquare } from "react-icons/fa";

function CargaSuccess() {

  const navigate = useNavigate(); 
  const handleClickRegresar = () => {
    navigate('/cargaAsistencia');
  };

  return (
    
      <div className='userProcess' id='success'>
      <FaRegCheckSquare className='successIcon' />
      <h1>Tu registro de asistencia se ha realizado correctamente</h1>
      <button className='buttonP' onClick={handleClickRegresar}>Salir</button>
    
    </div>
  )
}

export default CargaSuccess
