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
  console.log("id de usuario: ", userId);
  console.log("Tipo de userId:", typeof userId);
  console.log("id de usuarioparsed: ", parsedUserId);
  console.log("Tipo de userId:", typeof parsedUserId);
  console.log("nombre de usuario: ", userName);

  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error("Token no disponible. No tienes acceso.");
      return;
    }

    const dateString = e.target.fechaI.value;
    const isoDate = `${dateString}T00:00:00`;
    const today = new Date();
    const createdAt = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}T00:00:00`;

    const parsedUserId = parseInt(userId, 10);
    console.log("id de usuario después de parseInt: ", parsedUserId);

    const eventData = {
      eventName: e.target.nombre.value,
      eventDescription: e.target.descripcion.value,
      startDate: isoDate,
      responsibleUserId: parsedUserId,
      createdAt: createdAt,
      state: "Abierto"
    };

    console.log("Datos que se envían:", eventData);

    if (
      !eventData.eventName ||
      !eventData.eventDescription ||
      !eventData.startDate
    ) {
      setShowModal(true);
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
        console.log("Evento creado", createdEvent);
        sessionStorage.setItem("eventId", createdEvent.eventId);
        sessionStorage.setItem("eventName", createdEvent.eventName);
        sessionStorage.setItem("eventState", "Activo");
        e.target.reset();
      } else {
        setIsSuccess(false);
        console.error("Error al crear el evento");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  const handleCloseModal = () => setShowModal(false);
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
                    <input type="date" className='col-7'  name="fechaI" id="fechaI"/>
                </div>
                <div className='row formInput mb-3' >
                    <label className='col-3' htmlFor="fechaF">Fecha final</label>
                    <input type="date" className='col-7'  name="fechaF" id="fechaF"/>
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
      <ModalComponent show={isSuccess} handleClose={handleIsSuccess} titulo="Evento Creado" imagen={ImageModalSuccess} bodyMessage={'Evento creado exitosamente.'} />

    </div>
  );
}

export default CrearEvento;
