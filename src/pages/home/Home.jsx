import React, { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import { FaPlus } from "react-icons/fa";
import { GoDownload } from "react-icons/go";
import "./Home.css";
import Pager from "./Pager";
import { useNavigate } from "react-router-dom";

function Home() {
  // Estados para almacenar los datos del usuario y de la tabla
  const [userData, setUserData] = useState({ name: '', lastLogin: '' });
  const [tableData, setTableData] = useState([]);
  const [object, setObject] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [idUser, setIdUser] = useState(null);
  const token = sessionStorage.getItem('token'); 
  const navigate = useNavigate(); 


  const handleDownloadClick = async (eventId) => {
    const token = sessionStorage.getItem('token');
    
    try {
      const response = await fetch(`http://localhost:20000/event/download-event/${eventId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Incluye el token en el encabezado
          // Añadir más headers si es necesario
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("Data fetch User:", data);
      // Manejar la respuesta como un archivo binario
      const contentType = response.headers.get('Content-Type');
      if (contentType && (contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || contentType.includes('application/octet-stream'))) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `event_${eventId}.xlsx`); // Nombre del archivo
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Unexpected content type:', contentType);
        // Manejar casos en los que el tipo de contenido no es el esperado
      }
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  

  /* useEffect(() => {
    const storedIdUser = JSON.parse(sessionStorage.getItem('userId')); // Obtener userId del sessionStorage
    setIdUser(storedIdUser); // Establecer el userId en el estado
    
    if (token && storedIdUser) { // Verificar que el token y el idUser existan
      const fetchUser = async () => {
        try {
          const response = await fetch(`http://localhost:20000/user/${storedIdUser}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            setTableData(data.events);
            setUserData(data);
            sessionStorage.setItem('userData', JSON.stringify(data));
            sessionStorage.setItem('rolname', data.roleName);
          } else if (response.status === 401) {
            sessionStorage.removeItem('token');
            navigate('/');
          } else {
            console.error('Error:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchUser(); // Llama a la función fetchUser
    } else {
      navigate('/'); // Redirige si no hay token o idUser
    }
  }, [token, navigate]); */
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClickCrearEvento = () => {
    navigate('/crearEvento');
  };

  return (
    <div className="row">
       <SideMenu userData={userData} /> {/* Pasa userData como prop */}
      <div className="col-10 homeDivP">
        <div className="headerHome">
          <h1 className="bienvenida">¡Bienvenido, {userData.username}!</h1>
          <span>Último ingreso: {userData.lastLogin}</span>
          <button className="buttonP crearHbtn" onClick={handleClickCrearEvento}>
            <FaPlus />
            Crear evento
          </button>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data, index) => (
                <tr key={index}>
                  <td>{data.eventName}</td>
                  <td>{data.startDate}</td>
                  <td>
                    {data.states.map((state, i) => (
                      <div key={i}>{state.stateName}</div>
                    ))}
                  </td>
                  <td>
                    {data.actions ? (
                      data.actions
                    ) : (
                      <GoDownload onClick={() => handleDownloadClick(data.eventId)} />
                    )}
                  </td>
                </tr>
              ))}
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
  );
}

export default Home;
