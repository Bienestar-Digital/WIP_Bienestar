import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import SideMenu from '../../components/SideMenu'
import './TusEventos.css'
import EventCard from '../../components/EventCard'

function TusEventos() {

  const [userData, setUserData] = useState({ name: '', lastLogin: '' });
  const [tableData, setTableData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const token = sessionStorage.getItem('token'); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem('token'); 
      try {
        const response = await fetch(`http://localhost:20000/user/1`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Agrega el token a los headers
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTableData(data.events) // Actualiza el estado con los datos del usuario
          setUserData(data)
        } else if (response.status === 401) {
          // Token no válido o no autorizado
          sessionStorage.removeItem('token'); // Elimina el token del sessionStorage
          navigate('/'); // Redirige al usuario a la página de inicio de sesión
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        //setLoading(false); // Cambia el estado de carga
      }
    };

    if (token) {
      fetchUser();
    } else {
      navigate('/'); // Redirige si no hay token
    }
  }, [token, navigate]); // El efecto se ejecuta cuando el token cambia

  const handleClickCargarAsistencia = (eventId, eventName) => {
    sessionStorage.setItem('eventId', eventId);
    sessionStorage.setItem('eventName', eventName);
    navigate('/cargaAsistencia/${eventId}');
  };

  const handleClickRegistroPorEvento = (eventId, eventName) => {
    sessionStorage.setItem('eventId', eventId);
    sessionStorage.setItem('eventName', eventName);
    navigate('/registroPorEvento/${eventId}');
  };


  return (
    <div className='row'>
      <SideMenu />
        <div className='col-10 homeDiv'>
          <div className="headerEvents">
            <h1>Tus eventos</h1>
          </div>
            
            <div className='eventsContainer'>
              {/* Mapeamos los eventos desde tableData */}
              {tableData.length > 0 ? (
                tableData.map((event) => (
                  <div key={event.eventId} className='eventCard'>
                    <h3>{event.eventName}</h3>
                    <span>{new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</span>
                    <button 
                      className='buttonP' 
                      onClick={() => handleClickCargarAsistencia(event.eventId, event.eventName)} // Pasa el eventId aquí
                    >
                      <FaPlus />
                      Cargar asistencia
                    </button>
                    <Link 
                      className='registro' 
                      onClick={() => handleClickRegistroPorEvento(event.eventId, event.eventName)} // Pasa el eventId aquí
                    >
                      Ver registros
                    </Link>
                  </div>
                ))
              ) : (
                <p>No hay eventos disponibles.</p>
              )}
            </div>

        </div>
    </div>
  )
}

export default TusEventos
