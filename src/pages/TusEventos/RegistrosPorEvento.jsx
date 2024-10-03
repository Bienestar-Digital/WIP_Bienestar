import React, { useEffect, useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import SideMenu from '../../components/SideMenu';
import Pager from "../home/Pager";
import ModalComponent from '../../components/ModalComponent';
import ImageModal from "../../assets/images/escudo2_unal.png"

function RegistroPorEvento() {

    const eventId = sessionStorage.getItem('eventId'); 
    console.log("eventId", eventId);
    const eventName = sessionStorage.getItem('eventName'); 
    console.log("eventName", eventName);

    const [tableData, setTableData] = useState([]);
    const [itemsPerPage] = useState(10);
    const [selectedAttendeeId, setSelectedAttendeeId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [show, setShow] = useState(false);
    const [isEliminated, setIsEliminated] = useState(false);
    const navigate = useNavigate();

    const handleClickTusEventos = () => {
        navigate('/tusEventos');
    };


    const fetchAttendeesByEventId = async () => {
        try {
            const token = sessionStorage.getItem("token");

            const response = await fetch(`http://localhost:20000/attendee/event/${eventId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTableData(data); 
                console.log("Asistentes obtenidos", data);
            } else {
                console.error("Error al obtener los asistentes", response.statusText);
                throw new Error("Error en la respuesta del servidor");
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    };

    const handleDelete = async (attendeeId) => {
        try {    
            const token = sessionStorage.getItem("token");

            const response = await fetch(`http://localhost:20000/attendee/delete/${attendeeId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
        
            if (response.ok) {
                console.log("Asistente eliminado con éxito");
                
                // Actualizar la tabla eliminando el asistente del estado
                setTableData(prevData => prevData.filter(item => item.attendeeId !== attendeeId));
                setShow(false);
                setIsEliminated(true); 
            } else {
                setIsEliminated(false); 
                console.error("Error al eliminar el asistente", response.statusText);
                throw new Error("Error en la respuesta del servidor");
            }
        } catch (error) {
            console.error("Error en la petición de eliminación:", error);
        }
    }

    const handleShow = (attendeeId) => {
        setSelectedAttendeeId(attendeeId);
        setShow(true);
    };
    const handleClose = () => setShow(false);

    
    useEffect(() => {
        if (eventId) {
            fetchAttendeesByEventId();
        } else {
            console.error("No se ha encontrado el eventId en sessionStorage");
        }
    }, [eventId]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

    const handleIsEliminated = () => setIsEliminated(false);


    return (
        <>
            <div className='row'>
                <SideMenu />
                <div className='col-10 homeDiv'>

                    <div className="d-flex flex-column headerEvents">
                            <h1 className="bienvenida">
                                Registros del evento {eventId}: {eventName}
                            </h1>
                            <Link className='registro' onClick={handleClickTusEventos}>
                                Atrás
                            </Link>
                    </div>

                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Asistencia n°</th>
                                    <th>Identificación</th>
                                    <th>Nombre</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length > 0 ? (
                                    currentItems.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data.attendeeId}</td>
                                            <td>{data.idNumber}</td>
                                            <td>{data.fullName}</td>
                                            <td>
                                                <FaRegTrashAlt onClick={() => handleShow(data.attendeeId)} />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No hay asistentes para este evento</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <nav className="paginationNav">
                            <Pager
                            totalItems={tableData.length}
                            itemsPerPage={itemsPerPage}
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                            />
                        </nav>
                    </div>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ color: "#687D2A" }}>
                                <strong>Confirmar eliminación</strong>{" "}
                            </Modal.Title>
                        </Modal.Header>                        
                        <Modal.Body>
                            <img
                                src={ImageModal}
                                alt="Descripción de la imagen"
                                className="img-fluid"
                                style={{ display: 'block', margin: '0 auto', maxWidth: '20%', height: 'auto' }}
                            />
                            <strong style={{ fontSize: "20px" }}>
                            ¿Estás seguro de que deseas eliminar este asistente? Esta acción no se puede deshacer.
                            </strong>
                        </Modal.Body>
                        
                        <Modal.Footer>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Cancelar</button>
                            <button type="button" className="btn btn-danger"  onClick={() => handleDelete(selectedAttendeeId)}>Eliminar</button>
                        </Modal.Footer>
                    </Modal>

                    <ModalComponent show={isEliminated} handleClose={handleIsEliminated} titulo="Registro eliminado" bodyMessage={'Asistencia eliminada exitosamente.'} />

                </div>
            </div>
        </>
    )
}

export default RegistroPorEvento;