import React from "react";
import { useState } from "react";
import "./CargaAsistencia.css";
import Modal from "react-bootstrap/Modal";
import ModalComponent from '../../components/ModalComponent';
import SideMenu from '../../components/SideMenu'
import { useNavigate, useParams } from "react-router-dom"

function CargaAsistencia() {

  const token = sessionStorage.getItem('token'); 
  //const { eventId } = useParams();
  const eventId = sessionStorage.getItem('eventId'); 
  console.log("eventId", eventId);
  const eventName = sessionStorage.getItem('eventName'); 
  console.log("eventId", eventName);


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
  

  const handleCloseModal = () => setShowModal(false);

  // Single
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Token', token);
    console.log('idType', tipoId);
    if (!token) {
      console.error("Token no disponible. No tienes acceso.");
      return;
    }

    const eventData = {
      //idType: tipoId.trim(),
      idNumber: valueID.trim(),
      fullName: nombre.trim(),
      //email: mail.trim(),
      eventId: eventId
    };

    console.log('Datos ingresados:', {
      //idType: eventData.idType,
      idNumber: eventData.idNumber,
      fullName: eventData.fullName,
      //email: eventData.email,
      eventId: eventData.eventId
    });

    //if (!eventData.idType || !eventData.idNumber || !eventData.fullName || !eventData.email) { 
      //setShowModal(true);
      //return;
    //}

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
    }
  };





  // Bulk
  const handleSubmitBulk = async (e) => {
    e.preventDefault();

    if (!file) {
        setShowModalBulk(true); // Muestra el modal de error si no hay archivo
        return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
        try {
            const jsonData = JSON.parse(event.target.result); // Convierte el contenido del archivo a objeto JSON

            // Prepara el token y la URL para la carga
            const token = sessionStorage.getItem('token');
            const url = "http://localhost:20000/attendee/loads"; // Cambia esto a la URL que necesites

            // Itera sobre cada asistente y envía los datos
            for (const attendee of jsonData) {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        idType: "DNI", // Ajusta según tus necesidades
                        idNumber: attendee.idNumber,
                        fullName: attendee.fullName,
                        email: `${attendee.fullName.toLowerCase().replace(/ /g, '.')}@unal.edu.co`, // Genera un correo
                        eventId: eventId // Usa el eventId adecuado
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Error al cargar la asistencia para ${attendee.fullName}`);
                }
            }

            handleCloseSuccessBulk(); // Muestra modal de éxito
        } catch (error) {
            console.error("Error en la carga del archivo:", error);
            handleCloseFailedBulk(); // Muestra modal de error
        }
    };

    reader.readAsText(file); // Lee el archivo como texto
};

const [file, setFile] = useState(null); // Estado para almacenar el archivo

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
        <h1>Evento {eventId}</h1>
        <div>
          <button className="buttonP" onClick={handleShowBulk}>Carga por código</button>
          <button className="buttonS" onClick={handleShow}>
            Carga manual
          </button>
        </div>
        <div className="logoUnal">
          <img src="/src/assets/images/Logounal.png" alt="" />
        </div>
      </div>

      <Modal show={cargaManual} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title className="modalTitle">
            Cargar asistencia al evento: {eventId}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" className="manualForm" onSubmit={handleSubmit}>
            {/* <div className="row">
              <label className="col-4" htmlFor="tipoId">
                Tipo de ID
              </label>
              <select className="col-5" name="tipoId" id="tipoId" value="tipoId" onChange={(e) => setTipoId(e.target.value)}>
                <option value="">Selecciona un tipo de ID</option>
                <option value="DNI">DNI</option>
                <option value="TIUN">TIUN</option>
              </select>
            </div> */}
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
            {/* <div className="row">
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
            </div> */}
            
          
            <Modal.Footer style={{ width: '100%' }}>
              <button type="submit" className="buttonP buttonModal">
                Guardar
              </button>
              <button  type="button" className="buttonS buttonModal" onClick={handleCloseFailed}>
                Cancelar
              </button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      <ModalComponent className="z-3" show={showModal} handleClose={handleCloseModal} titulo="Error" bodyMessage={'Por favor, rellena todos los campos.'} />




      <Modal show={cargaBulk} onHide={handleCloseBulk}>
        <Modal.Header >
          <Modal.Title className="modalTitle">
            Cargar asistencia al evento: {eventId}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" className="manualForm" onSubmit={handleSubmitBulk}>

            <div className="form-group">
              <label htmlFor="fileInput">Selecciona el archivo JSON:</label>
              <input type="file" 
              className="formArchivo" id="fileInput" accept=".json" onChange={handleFileChange} required />
            </div>
          
            <Modal.Footer style={{ width: '100%' }}>
              <button type="submit" className="buttonP buttonModal">
                Guardar
              </button>
              <button  type="button" className="buttonS buttonModal" onClick={handleCloseFailed}>
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
