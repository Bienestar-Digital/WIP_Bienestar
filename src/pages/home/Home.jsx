import React, { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import { FaPlus } from "react-icons/fa";
import { GoDownload } from "react-icons/go";
import "./Home.css";
import Pager from "./Pager";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

function Home() {
  // Estados para almacenar los datos del usuario y de la tabla
  const eventState = sessionStorage.getItem("eventState");
  const [userData, setUserData] = useState({ name: '', lastLogin: '' });
  const [tableData, setTableData] = useState([]);
  const [object, setObject] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [idUser, setIdUser] = useState(null);
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [bodyMessage, setBodyMessage] = useState("");

  const handleClose = () => setShow(false);


  const handleDownloadClick = async (eventId) => {
    const token = sessionStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:20000/event/download-event/${eventId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Incluye el token en el encabezado
          // No incluyas 'Content-Type' en GET si no es necesario, ya que estás esperando un archivo
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Verificamos si la respuesta es un archivo binario
      const contentType = response.headers.get('Content-Type');
      if (contentType && (contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || contentType.includes('application/octet-stream'))) {
        // Descargar el archivo binario
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `event_${eventId}.xlsx`); // Nombre del archivo
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url); // Limpieza de la URL creada        
      } else {
        // Si no es un archivo binario, mostrar un error con el tipo de contenido recibido
        console.error('Unexpected content type:', contentType);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };  


  useEffect(() => {        
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
            throw new Error('No existe el usuario.');
          }
        } catch (error) {
          throw new Error('No existe el usuario.');
        }
      };

      fetchUser(); // Llama a la función fetchUser
    } else {
      navigate('/'); // Redirige si no hay token o idUser
    }
  }, [token, navigate]);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClickCrearEvento = () => {
    navigate('/crearEvento');
  };

  return (
    <div className="row">
      <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: "#687D2A" }}>
                        <strong>{titulo}</strong>{" "}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img
                        src="src/assets/images/escudo2_unal.png"
                        alt="Descripción de la imagen"
                        className="img-fluid"
                        style={{ display: 'block', margin: '0 auto', maxWidth: '20%', height: 'auto' }}
                    />
                    <strong style={{ fontSize: "20px" }}>{bodyMessage}</strong>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
      <SideMenu  /> {/* Pasa userData como prop */}
      <div className="col-10 homeDivP">
        <div className="headerHome"> {/* header? */} 
          <h1 className="bienvenida">¡Bienvenido, {userData.username}!</h1>
          <span>Último ingreso: {new Date(userData.lastLogin).toLocaleDateString()}</span> {/* Formatea la fecha */}
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
                  <td>{new Date(data.startDate).toLocaleDateString()}</td>
                  {/* <td>{data.states.map((state, i) => <div key={i}>{state.stateName}</div>)}</td> */}
                  <td>{sessionStorage.getItem("eventState") || "Abierto"}</td>
                  <td>
                    {data.actions ? data.actions : <GoDownload onClick={() => handleDownloadClick(data.eventId)} />}
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
