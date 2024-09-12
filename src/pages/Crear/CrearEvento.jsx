import React from 'react'
import SideMenu from '../../components/SideMenu'
import './CrearEvento.css'

function CrearEvento() {

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = "eyJhbGciOiJSUzI1NiJ9.eyJkaXZpc2lvbiI6IkJpZW5lc3RhciIsInN1YiI6IlByb2JhbmRvMTIiLCJyb2xlIjoiYWRtaW4iLCJpc3MiOiJtcy1hdXRoIiwiZXhwIjoxNzI1NTY5NzQ2LCJpYXQiOjE3MjU1NjYxNDZ9.pzddp_5knEFo4Sks6aFvxRHok6EFMrSAAJGeQMRENYXrwxk-JQp0tSxkQ0W-QsouObpYJT5pW6BiVRdgyxA37gdYL12YyMPa1CpF8Zxq_Ue0n7kfTE_GIRyfdF53gPKWeNJpRUNth8kqhRiwCquVMuMYkD_lfFFdzXiAZ6uq0mBhQTmtkIH2TTCjhP6laenF_luMNRwDvK4X3EbzFPkTlPmITFY5OXareQ-P0-8Ta_YbFD-B8PoGYmRA3cRcrT9HY9fuxk3KtW7fyTqE0IIZEM70zeFk920wHvupt2rIaqwcYk7m-gzDaz2_d-dKVDpg4KddCbvgZC9y1sg2PRvv1w";
        if (!token) {
        console.error("Token no disponible. No tienes acceso.");
        return;
        }

        const dateString = e.target.fechaI.value;
        console.log("Valor del campo de fecha:", dateString);
        const isoDate = `${dateString}T00:00:00`;
        console.log("Fecha en formato ISO:", isoDate)

        const eventData = {
          eventName: e.target.nombre.value,
          eventDescription: e.target.descripcion.value,
          startDate: isoDate,
          responsibleUserId: e.target.responsable.value,
          createdAt: new Date().toISOString(),
        };
    
        try {
          const response = await fetch("http://localhost:20000/event/create", {
            method: "POST",
            headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` },
            body: JSON.stringify(eventData),
          });
          response.ok ? console.log("Evento creado", await response.json()) : console.error("Error");

        } catch (error) {
          console.error("Error en la petición:", error);
        }
      };

  return (
    <div className='row'>
        
        <div className='homeDiv'>
            <h1>Nuevo Evento</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className='row formInput' >
                    <label className='col-3' htmlFor="nombre">Nombre</label>
                    <input type="text" className='col-7' name="nombre" id="nombre"/>
                </div>
                <div className='row formInput' >
                    <label className='col-3' htmlFor="descripcion">Descripción</label>
                    <textarea className='col-7'  name="descripcion" id="" rows={5}></textarea>
                </div>
                <div className='row formInput' >
                    <label className='col-3' htmlFor="fechaI">Fecha inicial</label>
                    <input type="date" className='col-7'  name="fechaI" id="fechaI"/>
                </div>
                <div className='row formInput' >
                    <label className='col-3' htmlFor="fechaF">Fecha final</label>
                    <input type="date" className='col-7'  name="fechaF" id="fechaF"/>
                </div>
                <div className='row formInput' >
                    <label className='col-3' htmlFor="responsable">Responsable</label>
                    <input type="text" className='col-7'  name="responsable" id="responsable"/>
                </div>
                <div className='row formInput' >
                    <label className='col-3' htmlFor="estudiantes">Estudiantes</label>
                    <button className='col-7 attached' >Adjuntar archivo</button>
                </div>
                <button className='buttonP' id='crearBtn'>
                Crear evento
                </button>
            </form>
        </div>
      
    </div>
  )
}

export default CrearEvento
