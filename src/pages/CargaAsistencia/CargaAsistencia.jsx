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
      idType: tipoId.trim(),
      idNumber: valueID.trim(),
      fullName: nombre.trim(),
      email: mail.trim(),
      eventId: eventId
    };

    console.log('Datos ingresados:', {
      idType: eventData.idType,
      idNumber: eventData.idNumber,
      fullName: eventData.fullName,
      email: eventData.email,
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

    const bulkData = e.target.querySelector("textarea").value.trim(); // Obtener los datos del textarea

    // Suponiendo que ya tienes los asistentes, debes crear una lista con el eventId
    const eventId = sessionStorage.getItem('eventId'); // Obtener el eventId

    // Formatear los datos para incluir el eventId en cada línea
    const formattedData = bulkData.split("\n").map(attendeeLine => {
        const parts = attendeeLine.split(";"); // Separar la línea por ";"
        if (parts.length === 2) {
            return `${parts[0].trim()};${parts[1].trim()};${eventId}`; // Agregar el eventId al final
        }
        return attendeeLine; // Devolver la línea sin cambios si no tiene el formato esperado
    }).join("\n"); // Volver a unir las líneas

    console.log('Datos ingresados:', formattedData); // Mostrar el contenido para depuración

    try {
        const token = sessionStorage.getItem("token");

        // Hacer la solicitud POST al backend
        const response = await fetch("http://localhost:20000/attendee/bulk", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain", // Cambiar a text/plain
                "Authorization": `Bearer ${token}`,
            },
            body: formattedData, // Enviar el texto formateado
        });

        if (response.ok) {
            console.log("Asistencia cargada con éxito.", await response.text()); // Cambiar a response.text() si el servidor devuelve texto
            handleCloseSuccessBulk(); // Cambiar a la función adecuada para el éxito
        } else {
            console.error("Error al cargar la asistencia.");
            handleCloseFailedBulk(); // Cambiar a la función adecuada para el fallo
        }
    } catch (error) {
        console.error("Error en la petición:", error);
        handleCloseFailedBulk(); // Cambiar a la función adecuada para el fallo
    }

    /* if (!file) {
        setShowModalBulk(true);
        return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
        try {
            const jsonData = JSON.parse(event.target.result);

            
            const token = sessionStorage.getItem('token');
            const url = "http://localhost:20000/attendee/bulk";

            
            for (const attendee of jsonData) {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        idType: "CC",
                        idNumber: attendee.idNumber,
                        fullName: attendee.fullName,
                        email: `${attendee.fullName.toLowerCase().replace(/ /g, '.')}@unal.edu.co`,
                        eventId: eventId
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Error al cargar la asistencia para ${attendee.fullName}`);
                }
            }

            handleCloseSuccessBulk();
        } catch (error) {
            console.error("Error en la carga del archivo:", error);
            handleCloseFailedBulk();
        } */
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
      <div className='col-10 homeDiv cargaAsis'>
        <h1>Evento {eventId}</h1>
        <div>
          <button className="buttonP" onClick={handleShowBulk}>Carga por lectora</button>
          <button className="buttonS" onClick={handleShow}>
            Carga manual
          </button>
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
            <div className="row mb-3">
              <label className="col-4" htmlFor="tipoId">
                Tipo de ID
              </label>
              <select className="col-5" name="tipoId" id="tipoId" value="tipoId" onChange={(e) => setTipoId(e.target.value)}>
                <option value="">Selecciona un tipo de ID</option>
                <option value="DNI">CC</option>
                <option value="TIUN">TIUN</option>
              </select>
            </div>
            <div className="row mb-3">
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
            <div className="row mb-3">
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
            <div className="row mb-3">
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

            {/* <div className="form-group">
              <label htmlFor="fileInput">Selecciona el archivo JSON:</label>
              <input type="file" id="fileInput" accept=".json" onChange={handleFileChange} required />
            </div> */}
            <span className="input-group-text">Utiliza el lector de códigos para registrar la asistencia:</span>
            <div className="input">
              <textarea className="form-control" aria-label="With textarea"></textarea>
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
