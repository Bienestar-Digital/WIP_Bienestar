import React, { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import ModalComponent from "../../components/ModalComponent";
import "./CrearEvento.css";

function CrearEvento() {
  const token = sessionStorage.getItem("token");

  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error("Token no disponible. No tienes acceso.");
      return;
    }

    const dateString = e.target.fechaI.value;
    const isoDate = `${dateString}T00:00:00`;

    const eventData = {
      eventName: e.target.nombre.value,
      eventDescription: e.target.descripcion.value,
      startDate: isoDate,
      responsibleUserId: 1,
      createdAt: new Date().toISOString(),
    };

    if (
      !eventData.eventName ||
      !eventData.eventDescription ||
      !eventData.startDate ||
      !eventData.responsibleUserId
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
      <span className="col-2"></span>
      <div className="col-9 homeDiv">
        <h1>Nuevo Evento</h1>

        <form className="formCrear" action="" onSubmit={handleSubmit}>
          <div className="row formInput">
            <label className="col-4" htmlFor="nombre">
              Nombre
            </label>
            <input type="text" className="col-8" name="nombre" id="nombre" />
          </div>
          <div className="row formInput">
            <label className="col-4" htmlFor="descripcion">
              Descripción
            </label>
            <textarea
              className="col-8"
              name="descripcion"
              id=""
              rows={5}
            ></textarea>
          </div>
          <div className="row formInput">
            <label className="col-4" htmlFor="fechaI">
              Fecha inicial
            </label>
            <input type="date" className="col-8" name="fechaI" id="fechaI" />
          </div>
          <div className="row formInput">
            <label className="col-4" htmlFor="fechaF">
              Fecha final
            </label>
            <input type="date" className="col-8" name="fechaF" id="fechaF" />
          </div>
          {/* <div className='row formInput' >
                    <label className='col-4' htmlFor="responsable">Responsable</label>
                    <input type="text" className='col-8'  name="responsable" id="responsable" value={username} readOnly disabled={true} />
                </div> */}
          <div className="row formInput">
            <label className="col-4" htmlFor="responsable">
              Responsable
            </label>
            <input
              type="text"
              className="col-8"
              name="responsable"
              id="responsable"
            />
          </div>
          <button className="buttonP" id="crearBtn">
            Crear evento
          </button>
        </form>
        <div className="logoUnal">
          <img src="/src/assets/images/Logounal.png" alt="" />
        </div>
      </div>
      <ModalComponent
        show={showModal}
        handleClose={handleCloseModal}
        titulo="Error"
        bodyMessage={"Por favor, rellena todos los campos."}
      />
      <ModalComponent
        show={isSuccess}
        handleClose={handleIsSuccess}
        titulo="Evento Creado"
        bodyMessage={"Evento creado exitosamente."}
      />
    </div>
  );
}

export default CrearEvento;
