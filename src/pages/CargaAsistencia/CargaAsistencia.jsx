import React from "react";
import { useState } from "react";
import "./CargaAsistencia.css";
import Modal from "react-bootstrap/Modal";
import ModalComponent from '../../components/ModalComponent';
import { useNavigate } from "react-router-dom"

function CargaAsistencia() {

  const token = sessionStorage.getItem('token'); 

  const [cargaManual, setCargaManual] = React.useState(false);
  const [valueID, setValueID] = useState("");
  const [mail, setMail] = useState('');
  const [nombre, setNombre] = useState('');
  const [tipoId, setTipoId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChangeID = (e) => {
    const newValue = e.target.value;

    if (/^\d*$/.test(newValue)) {
      setValueID(newValue);
    }
  };

  const handleCloseSuccess = () => {
    setCargaManual(false)
    navigate('/cargaSuccess')
  };

  const handleCloseFailed = () => {
    setCargaManual(false)
    navigate('/cargaFailed')
  };

  const handleClose = () => setCargaManual(false);
  const handleShow = () => setCargaManual(true);

  // Single
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Token', token);
    if (!token) {
      console.error("Token no disponible. No tienes acceso.");
      return;
    }

    const eventData = {
      idType: tipoId,
      idNumber: valueID,
      fullName: nombre,
      email: mail,
      eventId: 12
    };

    if (!eventData.idType || !eventData.idNumber || !eventData.fullName || !eventData.email) {
      setShowModal(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:20000/attendee/loadSingle", {
        method: "POST",
        headers: { "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` },
        body: JSON.stringify(eventData),
      });
      if (response.ok) {
        console.log("Asistencia cargada con éxito.", await response.json());
      } else {
        console.error("Error al cargar la asistencia.");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="row">
      <div className="homeDiv cargaAsis">
        <h1>Evento 1</h1>
        <div>
          <button className="buttonP">Carga por código</button>
          <button className="buttonS" onClick={handleShow}>
            Carga manual
          </button>
        </div>
      </div>

      <Modal show={cargaManual} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title className="modalTitle">
            Cargar asistencia al evento
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" className="manualForm" onSubmit={handleSubmit}>
            <div className="row">
              <label className="col-4" htmlFor="tipoId">
                Tipo de ID
              </label>
              <select className="col-5" name="tipoId" id="tipoId" onChange={(e) => setTipoId(e.target.value)}>
                <option value="1">DNI</option>
                <option value="2">TIUN</option>
              </select>
            </div>
            <div className="row">
              <label className="col-4" htmlFor="id">
                ID
              </label>
              <input
                className="col-5"
                value={valueID}
                onChange={handleChangeID}
                type="text"
                name="id"
                id="id"
              />
            </div>
            <div className="row">
              <label className="col-4" htmlFor="nombre">
                Nombre
              </label>
              <input
                className="col-5"
                onChange={(e) => setNombre(e.target.value)}
                type="text"
                name="nombre"
                id="nombre"
                style={{ textTransform: "uppercase" }}
              />
            </div>
            <div className="row">
              <label className="col-4" htmlFor="mail">
                Mail
              </label>
              <input
                className="col-4"
                onChange={(e) => setMail(e.target.value)}
                type="text"
                name="mail"
                id="mail"
                style={{ textTransform: "lowercase" }}
              />
              <span className="col-4">@unal.edu.co</span>
            </div>
            
          
            <Modal.Footer style={{ width: '100%' }}>
              <button type="submit" className="buttonP buttonModal" onClick={handleCloseSuccess}>
                Guardar
              </button>
              <button  type="submit" className="buttonS buttonModal" onClick={handleCloseFailed}>
                Cancelar
              </button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      <ModalComponent className="z-3" show={showModal} handleClose={handleCloseModal} titulo="Error" bodyMessage={'Por favor, rellena todos los campos.'} />
    </div>
  );
}

export default CargaAsistencia;
