import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import SideMenu from '../../components/SideMenu';
import Pager from "../home/Pager";

function RegistroPorEvento() {

    const eventId = sessionStorage.getItem('eventId'); 
    console.log("eventId", eventId);
    const eventName = sessionStorage.getItem('eventName'); 
    console.log("eventName", eventName);

    const [tableData, setTableData] = useState([]);
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    //const { eventId } = useParams();
    const navigate = useNavigate();

    const handleClickTusEventos = () => {
        navigate('/tusEventos');
    };

    const fetchAttendeesByEventId = async () => {
        try {
            const token = sessionStorage.getItem("token");  // O de donde obtienes el token

            const response = await fetch(`http://localhost:20000/attendee/event/${eventId}`, {
                method: "GET",  // Método GET para obtener datos
                headers: {
                    "Content-Type": "application/json",  // Especificamos el tipo de contenido
                    "Authorization": `Bearer ${token}`   // Agregamos el token si es necesario
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

    return (
        <>
            <div className='row'>
                <SideMenu />
                <span className="col-2"></span>
                <div className='col-10 homeDiv'>

                    <div className="d-flex flex-column header">
                            <h1 className="bienvenida">
                                Registros
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
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.length > 0 ? (
                                    tableData.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data.attendeeId}</td>
                                            <td>{data.idNumber}</td>
                                            <td>{data.fullName}</td>
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
                            />
                        </nav>
                    </div>





                </div>
            </div>
        </>
    )
}

export default RegistroPorEvento;