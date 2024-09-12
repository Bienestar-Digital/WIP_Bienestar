import React from 'react'
import { FaRegCheckSquare } from "react-icons/fa";

function CargaSuccess() {
  return (
    
      <div className='userProcess' id='success'>
      <FaRegCheckSquare className='successIcon' />
      <h1>Tu registro de asistencia se ha realizado correctamente</h1>
      <button className='buttonP'>Salir</button>
    
    </div>
  )
}

export default CargaSuccess
