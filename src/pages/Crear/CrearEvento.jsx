import React, { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import ModalComponent from "../../components/ModalComponent";
import "./CrearEvento.css";
import ImageModalPrevent from "../../assets/images/assignment_late.png"
import ImageModalSuccess from "../../assets/images/assignment_turned_in.png"

function CrearEvento() {
  
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userid");
  const cleanedUserId = userId.trim();
  const parsedUserId = parseInt(parseInt(cleanedUserId));
  const userName = sessionStorage.getItem("userName");

  const [showModal, setShowModal] = useState(false);
  const [showModalFecha, setShowModalFecha] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      throw new Error("Token no disponible. No tienes acceso.");
    }

    const dateStringI = e.target.fechaI.value;
    const isoDateI = `${dateStringI}T22:00:00`;
    const dateStringF = e.target.fechaF.value;
    const isoDateF = `${dateStringF}T23:59:59`;
    const today = new Date();
    const createdAt = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}T00:00:00`;

    const parsedUserId = parseInt(userId, 10);

    const eventData = {
      eventName: e.target.nombre.value,
      eventDescription: e.target.descripcion.value,
      startDate: isoDateI,
      finalDate: isoDateF,
      responsibleUserId: parsedUserId,
      createdAt: createdAt,
      state: "Abierto"
    };

    console.log("info enviada", eventData);
    
    if (
      !eventData.eventName ||
      !eventData.eventDescription ||
      !eventData.startDate ||
      !eventData.finalDate
    ) {
      setShowModal(true);
      return;
    }

    if (eventData.finalDate < eventData.startDate) {
      setShowModalFecha(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:20000/event/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });
      if (response.ok) {
        const createdEvent = await response.json();
        setIsSuccess(true);
        sessionStorage.setItem("eventId", createdEvent.eventId);
        sessionStorage.setItem("eventName", createdEvent.eventName);
        sessionStorage.setItem("eventState", "Abierto");
        e.target.reset();
      } else {
        setIsSuccess(false);
      }
    } catch (error) {
      throw new Error('Evento no creado.');
    }
  };

  const handleCloseModal = () => setShowModal(false);
  const handleCloseModalFecha = () => setShowModalFecha(false);
  const handleIsSuccess = () => setIsSuccess(false);

  return (
    <div className="row">
      <SideMenu />

        <div className='col-10 homeDiv'> {/* homeDiv? */}
          <div className="header">
            <h1>Nuevo Evento</h1>
          </div>
          
            <form className='formCrear' action="" onSubmit={handleSubmit}>
                <div className='row formInput mb-3' >
                    <label className='col-3' htmlFor="nombre">Nombre</label>
                    <input type="text" className='col-7' name="nombre" id="nombre"/>
                </div>
                <div className='row formInput mb-3' >
                    <label className='col-3' htmlFor="descripcion">Descripción</label>
                    <textarea className='col-7'  name="descripcion" id="" rows={5}></textarea>
                </div>
                <div className='row formInput mb-3' >
                    <label className='col-3' htmlFor="fechaI">Fecha inicial</label>
                    <input type="date" className='col-7'  name="fechaI" id="fechaI" min={new Date().toISOString().split("T")[0]}/>
                </div>
                <div className='row formInput mb-3' >
                    <label className='col-3' htmlFor="fechaF">Fecha final</label>
                    <input type="date" className='col-7'  name="fechaF" id="fechaF" min={new Date().toISOString().split("T")[0]}/>
                </div>
                <div className='row formInput mb-3' >
                    <label className='col-3' htmlFor="responsable">Responsable</label>
                    <input type="text" className='col-7'  name="responsable" id="responsable" value={userName} readOnly disabled={true} />
                </div>
                {/* <div className='row formInput mb-3' >
                    <label className='col-3' htmlFor="responsable">Responsable</label>
                    <input type="text" className='col-7'  name="responsable" id="responsable" />
                </div> */}
                <div className="d-flex justify-content-center">
                  <button className='buttonP' id='crearBtn'>
                  Crear evento
                  </button>
                </div>
            </form>
          
        </div>
      <ModalComponent show={showModal} handleClose={handleCloseModal} titulo="Error" imagen={ImageModalPrevent} bodyMessage={'Por favor, rellena todos los campos.'} />
      <ModalComponent show={showModalFecha} handleClose={handleCloseModalFecha} titulo="Error en fechas" imagen={ImageModalPrevent} bodyMessage={'La fecha final no puede ser inferior a la fecha inicial.'} />
      <ModalComponent show={isSuccess} handleClose={handleIsSuccess} titulo="Evento Creado" imagen={ImageModalSuccess} bodyMessage={'Evento creado exitosamente.'} />

    </div>
  );
}

export default CrearEvento;
