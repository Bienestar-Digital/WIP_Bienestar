import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import SideMenu from '../../components/SideMenu';
import './TusEventos.css';

function TusEventos() {

  const userId = sessionStorage.getItem("userid");

  const [userData, setUserData] = useState({ name: '', lastLogin: '' });
  const [tableData, setTableData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
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
              {tableData.length > 0 ? (
                tableData.map((event) => (
                  <div key={event.eventId} className='eventCard'>
                    <h3>{event.eventName}</h3>
                    <span>{new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</span>
                    <button 
                      className='buttonP' 
                      onClick={() => handleClickCargarAsistencia(event.eventId, event.eventName)}
                    >
                      <FaPlus />
                      Cargar asistencia
                    </button>
                    <Link 
                      className='registro' 
                      onClick={() => handleClickRegistroPorEvento(event.eventId, event.eventName)}
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
