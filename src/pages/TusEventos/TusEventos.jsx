import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import SideMenu from '../../components/SideMenu';
import Pager from "../home/Pager";
import './TusEventos.css';

function TusEventos() {

  const userId = sessionStorage.getItem("userid");

  const [userData, setUserData] = useState({ name: '', lastLogin: '' });
  const [tableData, setTableData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const token = sessionStorage.getItem('token'); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem('token'); 
      try {
        const response = await fetch(`http://localhost:20000/user/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTableData(data.events)
          setUserData(data)
        } else if (response.status === 401) {
          sessionStorage.removeItem('token');
          navigate('/');
        } else {
          throw new Error('No existe el usuario.');
        }
      } catch (error) {
        throw new Error('No existe el usuario.');
      } finally {
        //setLoading(false); // Cambia el estado de carga
      }
    };

    if (token) {
      fetchUser();
    } else {
      navigate('/');
    }
  }, [token, navigate]);

  const handleClickCargarAsistencia = (eventId, eventName) => {
    sessionStorage.setItem('eventId', eventId);
    sessionStorage.setItem('eventName', eventName);
    navigate(`/carga-asistencia/${eventId}`);
  };

  const handleClickRegistroPorEvento = (eventId, eventName) => {
    sessionStorage.setItem('eventId', eventId);
    sessionStorage.setItem('eventName', eventName);
    navigate(`/registro-por-evento/${eventId}`);
  };

  const normalizeDate = (date) => {
    const normalizedDate = new Date(date);
    normalizedDate.setUTCHours(0, 0, 0, 0); // Establecer horas, minutos, segundos y milisegundos a 0
    return normalizedDate;
  };

  const calculateDaysRemaining = (finalDate) => {
    const today = normalizeDate(new Date());
    const eventEndDate = normalizeDate(new Date(finalDate));
    const diffTime = eventEndDate - today;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 0 ? 0 : diffDays;
  };

  const renderEventStatus = (event) => {
    const today = new Date();
    const eventStartDate = normalizeDate(new Date(event.startDate));
    const eventEndDate = new Date(event.finalDate);
    
    // Si el evento aún no ha comenzado, simplemente mostrar "Evento abierto"
    if (today < eventStartDate) {
      /* return <span style={{ color: 'green' }}>Evento abierto</span>; */
      event.isClosed = false;
      return <span style={{ color: 'green' }}>Evento abierto</span>;
    }

    const isSameDay = today.getTime() === eventEndDate.getTime();
    const daysRemaining = calculateDaysRemaining(event.finalDate);

    if (isSameDay) {
      /* return <span style={{ color: 'orange' }}>El evento se cerrará hoy a la medianoche.</span>; */
      event.isClosed = false;
      return <span style={{ color: 'orange' }}>El evento se cerrará hoy a la medianoche.</span>;
    }

    if (daysRemaining === 0 || event.state === "Cerrado") {
      event.isClosed = true;
      sessionStorage.setItem(`event_${event.eventId}_closed`, 'true');
      return <span style={{ color: 'red' }}>Evento cerrado</span>;
    } else if (daysRemaining <= 3 && daysRemaining > 1) {
      event.isClosed = false;
      return <span style={{ color: 'orange' }}>El evento se cerrará en {daysRemaining} día(s)</span>;
    } else if (daysRemaining === 1) {
      event.isClosed = false;
      return <span style={{ color: 'orange' }}>El evento se cerrará mañana.</span>;
    } else {
      event.isClosed = false;
      return <span style={{ color: 'green' }}>Evento abierto</span>;
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleClickCrearEvento = () => {
    navigate('/crear-evento');
  };



  return (
    <div className='row'>
      <SideMenu />
      <span className="col-2"></span>
        <div className='col-10 homeDiv'>
          <div className="header">
            <h1>Tus eventos</h1>
          </div>

          <div className="crearNuevoEvento">
            <button className="buttonNE px-5" onClick={handleClickCrearEvento}>
              Nuevo evento
            </button>
          </div>
          
            <div className='eventsContainer'>
              {currentItems.length > 0 ? (
                currentItems.map((event) => (
                  <div key={event.eventId} className='eventCard'>
                    <h3>
                      {event.eventName}
                      <span className="tooltip px-3">{event.eventDescription}</span>
                    </h3>
                    <span>{new Date(event.startDate).toLocaleDateString()} - {new Date(event.finalDate).toLocaleDateString()}</span>
                    {renderEventStatus(event)}
                    
                    <Link 
                      className='registro' 
                      onClick={() => handleClickRegistroPorEvento(event.eventId, event.eventName)}
                    >
                      Ver registros
                    </Link>
                    <button 
                      className='buttonP px-4' 
                      onClick={() => handleClickCargarAsistencia(event.eventId, event.eventName)}
                      disabled={event.isClosed}
                      style={{
                        backgroundColor: event.isClosed ? 'lightgray' : '', 
                        color: event.isClosed ? 'gray' : '', 
                        cursor: event.isClosed ? 'not-allowed' : 'pointer' 
                      }}
                    >
                      Registrar asistencia
                    </button>
                  </div>
                ))
              ) : (
                <p>No hay eventos disponibles.</p>
              )}
            </div>


            <nav className="paginationNav">
            <Pager
            totalItems={tableData.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            />
            </nav>
        </div>
    </div>
  )
}

export default TusEventos
