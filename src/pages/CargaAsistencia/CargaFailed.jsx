import React from 'react'
import { IoWarningOutline } from "react-icons/io5";

function CargaFailed() {
  return (
    <div className='userProcess' id='error'>
      <IoWarningOutline />
      <h1>Ha ocurrido un error, por favor inténtalo nuevamente.</h1>
      <button className='buttonP'>Intentelo de nuevo</button>
      <a href="">Salir</a>
    </div>
  )
}

export default CargaFailed
