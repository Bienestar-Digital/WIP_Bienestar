import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { IoEyeOffSharp } from "react-icons/io5";
import SideMenu from "../../components/SideMenu";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "./UserCreate.css";
import ImageModalSuccess from "../../assets/images/createdUser.svg";

function UserCreate() {
  const [bodyMessage, setBodyMessage] = useState("");
  const [show, setShow] = useState(false);
  const [showUserStatus, setShowUserStatus] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [tableData, setTableData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUserstatus, setCurrentUserStatus] = useState(0);
  const [userData, setUserData] = useState();
  const [imageModal, setImageModal] = useState("");
  const [color, setColor] = useState("");
  const [status, setStatus] = useState(false);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);
  const navigate = useNavigate();

  const handleTimeClose = () => {
    setTimeout(() => {
        setShowUserStatus(false);
        setStatus(false);
      }, 2500);
    };
  const handleUserStatusChange = (index) => {
    setTitulo("Cambio de Estado de Usuario");
    //setImageModal(ImageModalSuccess);
    setBodyMessage("¿Seguro que desea cambiar el estado de usuario?");
    setColor("#687D2A");
    setCurrentUserStatus(index);
    setShowUserStatus(true);
  };
  const handleConfirm = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.error("El token no está disponible.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:20000/user/${currentUserstatus}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Manejar la respuesta exitosa
        setStatus(true);
        setTitulo("Estado de Usuario");
        setImageModal(ImageModalSuccess);
        setBodyMessage("Estado de usuario cambiado correctamente.");
        setColor("#687D2A");
        setShow(true);
        handleTimeClose();
      } else if (response.status === 401) {
        // Token inválido, se elimina de sessionStorage
        setStatus(true);
        sessionStorage.removeItem("token");
        setTitulo("Error de autenticación");
        setBodyMessage(
          "Su sesión ha expirado. Por favor, inicie sesión nuevamente."
        );
        setColor("#ff0000");
        setShow(true);
        handleTimeClose();
      } else {
        // Manejo de otros errores HTTP
        setStatus(true);
        const errorData = await response.json();
        console.error("Error en la respuesta del servidor:", errorData);
        setTitulo("Error");
        setBodyMessage(
          "No se pudo cambiar el estado del usuario. Intente nuevamente."
        );
        setColor("#ff0000");
        setShow(true);
        handleTimeClose();
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
      setTitulo("Error de red");
      setBodyMessage("No se pudo establecer conexión con el servidor.");
      setColor("#ff0000");
      setShow(true);
    }
  };

  const handleClose = () => {
    setShow(false);
    setShowUserStatus(false);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const storedIdUser = JSON.parse(sessionStorage.getItem("userId")); // Obtener userId del sessionStorage
    console.log(storedIdUser);

    if (token && storedIdUser) {
      // Verificar que el token y el idUser existan
      const fetchUser = async () => {
        try {
          const response = await fetch(
            `http://localhost:20000/user/${storedIdUser}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setTableData(data.createdUsers);
            setUserData(data);
            sessionStorage.setItem("userData", JSON.stringify(data));
            sessionStorage.setItem("rolname", data.roleName);
          } else if (response.status === 401) {
            sessionStorage.removeItem("token");
          } else {
            throw new Error("No existe el usuario.");
          }
        } catch (error) {
          throw new Error("No existe el usuario.");
        }
      };
      fetchUser(); // Llama a la función fetchUser
    } else {
    }
  }, []);

  return (
    <>
      <div className="row">
        <SideMenu />
        <div className="col-10 mx-auto homeDivP">
          <Modal show={showUserStatus} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>
                <strong>{titulo}</strong>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ textAlign: "center" }}>
              <strong style={{ fontSize: "20px", color }}>{bodyMessage}</strong>
            </Modal.Body>
            
                {status ? (null):(
                    <Modal.Footer>
                    <button
                style={{
                  backgroundColor: "#687D2A",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={handleConfirm}
              >
                Confirmar
              </button>
              <button
                style={{
                  backgroundColor: "#6c757d",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={handleClose}
              >
                Cancelar
              </button>
                    </Modal.Footer>


                )}
              
            
          </Modal>
          <div className="FormContainer">
            <h2>Usuarios</h2>

            {currentItems.length > 0 ? (
              <table style={{  margin: "auto" }}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Usuario</th>
                    <th>División</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((data, index) => (
                    <tr key={index}>
                      <td style={{ textAlign: "left", padding: "12px" }}>
                        {data.fullName}
                      </td>
                      <td style={{ textAlign: "left", padding: "12px" }}>
                        {data.email}
                      </td>
                      <td style={{ textAlign: "center", padding: "12px" }}>
                        {data.division}
                      </td>
                      <td style={{ textAlign: "center", padding: "12px" }}>
                        <IoEyeOffSharp
                          onClick={() => handleUserStatusChange(data.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <span>Aún no has creado mimgun usuario</span>
            )}

            <div className="ButtonContainer">
              <Button
                variant="primary"
                type="submit"
                className="w-75 mt-3"
                onClick={() => navigate("/crear-usuario-form")}
              >
                Nuevo usuario
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserCreate;
