import React from "react";
import { useState } from "react";
import "./CargaAsistencia.css";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom"

function CargaAsistencia() {
  const [cargaManual, setCargaManual] = React.useState(false);
  const [valueID, setValueID] = useState("");
  const navigate = useNavigate()
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
          <form action="" className="manualForm">
            <div className="row">
              <label className="col-4" htmlFor="tipoId">
                Tipo de ID
              </label>
              <select className="col-5" name="tipoId" id="tipoId">
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
                type="text"
                name="mail"
                id="mail"
                style={{ textTransform: "lowercase" }}
              />
              <span className="col-4">@unal.edu.co</span>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="buttonS buttonModal" onClick={handleCloseFailed}>
            Cancelar
          </button>
          <button className="buttonP buttonModal" onClick={handleCloseSuccess}>
            Guardar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CargaAsistencia;
