import React from "react";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import "./CargaAsistencia.css";
import Modal from "react-bootstrap/Modal";
import ModalComponent from '../../components/ModalComponent';
import SideMenu from '../../components/SideMenu'
import { useNavigate, useParams } from "react-router-dom";
import ImageModalPrevent from "../../assets/images/assignment_late.png"

function CargaManual() {

  const token = sessionStorage.getItem('token'); 
  const eventId = sessionStorage.getItem('eventId'); 
  const [showModal, setShowModal] = useState(false);
  const [valueID, setValueID] = useState("");
  const [mail, setMail] = useState('');
  const [nombre, setNombre] = useState('');
  const [tipoId, setTipoId] = useState("CC");
  const navigate = useNavigate();

  const handleChangeID = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setValueID(newValue);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  //Single
  const handleCloseSuccess = () => {
    navigate('/carga-success')
  };

  const handleCloseFailed = () => {
    navigate('/carga-failed')
  };

  // Single
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      throw new Error("Token no disponible. No tienes acceso.");
      return;
    }

    if (!tipoId || !valueID.trim() || !nombre.trim() || !mail.trim()) {
      setShowModal(true);
      return; // No se continúa si faltan datos
    }

    const eventData = {
      idType: tipoId.trim(),
      idNumber: valueID.trim(),
      fullName: nombre.trim(),
      email: mail.trim(),
      eventId: eventId
    };

    try {
      const response = await fetch("http://localhost:20000/attendee/loads", {
        method: "POST",
        headers: { "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        handleCloseSuccess();
      } else {
        handleCloseFailed();
      }
    } catch (error) {
      handleCloseFailed();
    }
  };

  const handleBackCargaAsistencia = () => {
    navigate(`/carga-asistencia/${eventId}`)
  };


  return (
    <div className="row">
      <SideMenu />
      <span className="col-2"></span>
      <div className='col-10 homeDiv'>
        <div className="header">
          <h1>Nuevo registro</h1>
        </div>


        <form action="" className="formCrear" onSubmit={handleSubmit}>
            <div className="row  formInput mb-3">
              <label className="col-4" htmlFor="tipoId" style={{ fontSize: "20px", color: "black"  }}>
              Tipo de ID
              </label>
              <select className="col-5" name="tipoId" id="tipoId" onChange={(e) => setTipoId(e.target.value)}>
                <option value="CC">CC</option>
                <option value="TIUN">TIUN</option>
              </select>
            </div>
            <div className="row  formInput mb-3">
              <label className="col-4" htmlFor="id">ID
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
            <div className="row  formInput mb-3">
              <label className="col-4" htmlFor="nombre" style={{ fontSize: "20px", color: "black"  }}>
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
            <div className="row  formInput mb-3">
              <label className="col-4" htmlFor="mail" style={{ fontSize: "20px", color: "black"  }}>
              Mail
              </label>
              <input
                className="col-5"
                onChange={(e) => setMail(e.target.value)}
                type="text"
                name="mail"
                id="mail"
                style={{ textTransform: "lowercase" }}
              />
              {/* <span className="col-4">@unal.edu.co</span> */}
            </div>
        
            <div className="d-flex flex-column justify-content-center buttonsEvents">
                <button type="submit" className="buttonE mb-2">
                Guardar
                </button>
            </div>
        </form>
        <div className='formCrear'>
            <button  type="button" className="buttonSE" onClick={handleBackCargaAsistencia}>
            Cancelar
            </button>
        </div>

          

      </div>

      <ModalComponent show={showModal} handleClose={handleCloseModal} titulo="Error" imagen={ImageModalPrevent} bodyMessage={'Por favor, rellena todos los campos.' } />

    </div>
  );
}

export default CargaManual;
