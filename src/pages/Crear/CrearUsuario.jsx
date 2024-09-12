import React from 'react'
import SideMenu from '../../components/SideMenu'

function CrearUsuario() {
  return (
    <div className='row'>
        
        <div className='homeDiv'>
            <h1>Nuevo usuario</h1>
            <form action="">
                <div className='row formInput' >
                    <label className='col-3' htmlFor="nombre">Nombre</label>
                    <input type="text" className='col-7' name="nombre" id="nombre"/>
                </div>
                <div className='row formInput' >
                    <label className='col-3' htmlFor="correo">Correo</label>
                    <input type="text" className='col-7'  name="correo" id="correo"/>
                </div>
                <div className='row formInput' >
                    <label className='col-3' htmlFor="rol">Rol</label>
                    <input type="text" className='col-7'  name="rol" id="rol"/>
                </div>
                <div className='row formInput' >
                    <label className='col-3' htmlFor="division">División</label>
                    <select name="division" id="division" className='col-7' >
                        <option value=""></option>
                        <option value="1">División 1</option>
                        <option value="2">División 2</option>
                        <option value="3">División 3</option>
                    </select>
                </div>
                
            </form>
            <button className='buttonP' id='crearBtn'>
                Crear usuario
            </button>
        </div>
      
    </div>
  )
}

export default CrearUsuario
