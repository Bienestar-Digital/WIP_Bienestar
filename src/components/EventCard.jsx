import React from 'react'
import { FaPlus } from "react-icons/fa6";

function EventCard() {
  return (
    
    <div className='eventCard'>
        <h3>Evento 1</h3>
        <span>11/12/2024 - 11/12/2025</span>
        <button className='buttonP'>
        <FaPlus />
        Cargar asistencia
        </button>
        <a href="">Ver registros</a>
    </div>
            
  )
}

export default EventCard
