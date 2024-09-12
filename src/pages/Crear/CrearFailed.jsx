import React from 'react'
import { FiUserX } from "react-icons/fi";

function CrearFailed() {
  return (
    <div className='userProcess' id='error'>
      <FiUserX />
      <h1>Ha ocurrido un error, por favor inténtelo nuevamente.</h1>
      <button className='buttonP'>Intentelo de nuevo</button>
      <a href="">Salir</a>
    </div>
  )
}

export default CrearFailed
