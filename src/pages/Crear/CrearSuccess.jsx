import React from 'react'
import { FiUserCheck } from "react-icons/fi";
import './CrearEvento.css'

function CrearSuccess() {
  return (
    <div className='userProcess' id='success'>
      <FiUserCheck className='successIcon' />
      <h1>El usuario se ha creado correctamente</h1>
      <button className='buttonP'>Salir</button>
    </div>
  )
}

export default CrearSuccess
