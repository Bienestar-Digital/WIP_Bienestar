import React from "react";
import { useState } from "react";
import "./CargaAsistencia.css";
import Modal from "react-bootstrap/Modal";
import ModalComponent from '../../components/ModalComponent';
import SideMenu from '../../components/SideMenu'
import { useNavigate, useParams } from "react-router-dom";
import ImageModalPrevent from "../../assets/images/assignment_late.png"

function CargaAsistencia() {

  const token = sessionStorage.getItem('token'); 
  const eventId = sessionStorage.getItem('eventId'); 
  console.log("eventId", eventId);
  const eventName = sessionStorage.getItem('eventName'); 
  console.log("eventName", eventName);


  const [cargaManual, setCargaManual] = React.useState(false);
  const [cargaBulk, setCargaBulk] = React.useState(false);
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

  const handleCloseModal = () => setShowModal(false);

  //Single
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

  //Bulk
  const handleCloseSuccessBulk = () => {
    setCargaBulk(false)
    navigate('/cargaSuccess')
  };

  const handleCloseFailedBulk = () => {
    setCargaBulk(false)
    navigate('/cargaFailed')
  };

  const handleCloseBulk = () => setCargaBulk(false);
  const handleShowBulk = () => setCargaBulk(true);
  


  // Single
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Token', token);
    console.log('idType', tipoId);
    if (!token) {
      console.error("Token no disponible. No tienes acceso.");
      return;
    }

    if (!tipoId || !valueID.trim() || !nombre.trim() || !mail.trim()) {
      console.error("Todos los campos son obligatorios.");
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

    console.log('Datos ingresados:', eventData);

    try {
      const response = await fetch("http://localhost:20000/attendee/loads", {
        method: "POST",
        headers: { "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        console.log("Asistencia cargada con éxito.", await response.json());
        handleCloseSuccess();
      } else {
        console.error("Error al cargar la asistencia.");
        handleCloseFailed();
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      handleCloseFailed();
    }
  };




  // Bulk
  const handleSubmitBulk = async (e) => {
    e.preventDefault();

    const bulkData = e.target.querySelector("textarea").value.trim();
    
    if (!bulkData) {
      console.error("El área de texto está vacía.");
      setShowModal(true);
      return;
    }

    const eventId = sessionStorage.getItem('eventId');


    const formattedData = bulkData.split("\n").map(attendeeLine => {
        const parts = attendeeLine.split(";");
        if (parts.length === 2) {
            return `${parts[0].trim()};${parts[1].trim()};${eventId}`;
        }
        return attendeeLine;
    }).join("\n");

    console.log('Datos ingresados:', formattedData);

    try {
        const token = sessionStorage.getItem("token");

        const response = await fetch("http://localhost:20000/attendee/bulk", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
                "Authorization": `Bearer ${token}`,
            },
            body: formattedData,
        });

        if (response.ok) {
            console.log("Asistencia cargada con éxito.", await response.text());
            handleCloseSuccessBulk();
        } else {
            console.error("Error al cargar la asistencia.");
            handleCloseFailedBulk();
        }
    } catch (error) {
        console.error("Error en la petición:", error);
        handleCloseFailedBulk();
    }
  };


const [file, setFile] = useState(null);

const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
        setFile(uploadedFile);
    }
};
  

  return (
    <div className="row">
      <SideMenu />
      <span className="col-2"></span>
      <div className='col-10 homeDiv cargaAsis'>
        <h1>Evento {eventId}: {eventName}</h1>
        <div>
          <button className="buttonP" onClick={handleShowBulk}>Carga por lectora</button>
          <button className="buttonS" onClick={handleShow}>
            Carga manual
          </button>
        </div>
        <div className="logoUnal">
          <img src="/src/assets/images/Logounal.png" alt="" />
        </div>
      </div>

      <ModalComponent show={showModal} handleClose={handleCloseModal} titulo="Error" imagen={ImageModalPrevent} bodyMessage={'Por favor, rellena todos los campos.' } />

      <Modal show={cargaManual} onHide={handleClose} centered>
        <Modal.Header >
          <Modal.Title style={{ color: "#687D2A" }}>
            <strong>Cargar asistencia al evento {eventId}: {eventName} </strong>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" className="manualForm" onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-4" htmlFor="tipoId" style={{ fontSize: "20px", color: "black"  }}>
              Tipo de ID
              </label>
              <select className="col-5" name="tipoId" id="tipoId" onChange={(e) => setTipoId(e.target.value)}>
                <option value="CC">CC</option>
                <option value="TIUN">TIUN</option>
              </select>
            </div>
            <div className="row mb-3">
              <label className="col-4" htmlFor="id">
              <strong style={{ fontSize: "20px", color: "black"  }}>ID</strong>
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
            <div className="row mb-3">
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
            <div className="row mb-3">
              <label className="col-4" htmlFor="mail" style={{ fontSize: "20px", color: "black"  }}>
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
              <button type="submit" className="buttonP buttonModal">
                Guardar
              </button>
              <button  type="button" className="buttonS buttonModal" onClick={handleClose}>
                Cancelar
              </button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      




      <Modal show={cargaBulk} onHide={handleCloseBulk} centered>
        <Modal.Header >
          <Modal.Title style={{ color: "#687D2A" }}>
            <strong>Cargar asistencia al evento {eventId}: {eventName}</strong>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" className="manualForm" onSubmit={handleSubmitBulk}>

            {/* <div className="form-group">
              <label htmlFor="fileInput">Selecciona el archivo JSON:</label>

              <input type="file" id="fileInput" accept=".json" onChange={handleFileChange} required />
            </div> */}
            <span className="input-group-text" style={{ whiteSpace: "normal" }}>
              <strong style={{ fontSize: "20px" }}>Utiliza el lector de códigos para registrar la asistencia:
              </strong>
            </span>
            <div className="input">
              <textarea className="form-control large-textarea" aria-label="With textarea"></textarea>
            </div>
          
            <Modal.Footer style={{ width: '100%' }}>
              <button type="submit" className="buttonP buttonModal">
                Guardar
              </button>
              <button  type="button" className="buttonS buttonModal" onClick={handleCloseBulk}>
                Cancelar
              </button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

    </div>
  );
}

export default CargaAsistencia;
