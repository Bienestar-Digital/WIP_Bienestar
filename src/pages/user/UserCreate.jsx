import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import SideMenu from '../../components/SideMenu';
import Modal from "react-bootstrap/Modal";
import './UserCreate.css';
import ImageModalSuccess from "../../assets/images/createdUser.svg";
import ImageModalFailded from "../../assets/images/CreateUserFailed.svg";
import Pager from '../home/Pager';
//import ImageModalSuccess from "../../assets/images/assignment_turned_in.png";
//import ImageModalFailed from "../../assets/images/assignment_late.png" TODO: Check with Natalia
import Desactivar from "../../assets/images/Desactivar.png";

function UserCreate() {
    const [validated, setValidated] = useState(false);
    const [bodyMessage, setBodyMessage] = useState("");
    const [show, setShow] = useState(false);
    const [showUserStatus, setShowUserStatus] = useState(false);
    const [showAddUser, setShowAddUser] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [tableData, setTableData] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentUserstatus, setCurrentUserStatus] = useState(0);
    const [division, setDivision] = useState("");
    const [imagenModal, setImagenModal] = useState("");
    const [userData, setUserData] = useState();
    const [imageModal, setImageModal] = useState("");
    const [color, setColor] = useState("");
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

    const registerUser = async (event) => {
        event.preventDefault(); // Evitar la recarga de la página por defecto

        const form = event.currentTarget;
        const formData = new FormData(form);
        const data = {
            username: formData.get('username'),
            fullName: formData.get('username'),
            email: formData.get('email'),
            roleName: formData.get('roleName'),
            division: formData.get('division'),
            password: formData.get('password'),
            userStatus: "ACTIVE",
            createdBy: userData.id

        };

        try {
            const response = await fetch('http://localhost:8080/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                if (response.status === 401) {
                    setTitulo("Creacion De Usuario");
                    setImageModal(ImageModalFailded);
                    setBodyMessage("Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.");
                    setColor("#AA0C00");

                }
                if (response.status === 409) {
                    setTitulo("Creacion De Usuario");
                    setImageModal(ImageModalFailded);
                    setBodyMessage("El usuario ya existe. Por favor, Intente nuevamente.");
                    setColor("#AA0C00");
                }
                else {
                    setTitulo("Creacion De Usuario");
                    setImageModal(ImageModalFailded);
                    setBodyMessage("Ha ocurrido un error. Por favor, Intente nuevamente.");
                    setColor("#AA0C00");
                }
                setShow(true);
                /* setTimeout(() => {
                    setShow(false);
                    window.location.reload();
                }, 2500); */
                return;
            }

            // Si la respuesta es exitosa
            // Aquí puedes manejar el caso exitoso, por ejemplo:
            // alert("Usuario registrado con éxito");
            setTitulo("Creacion de Usuario");
            setImageModal(ImageModalSuccess);
            setBodyMessage("Usuario creado correctamente.");
            setColor("#687D2A");
            setShow(true);
            /* setTimeout(() => {
                setShow(false);
                window.location.reload();
            }, 2500); */
        } catch (error) {
            // Aquí manejamos los errores de red, como si el servidor está caído
            setTitulo("Creacion De Usuario");
            setBodyMessage("Ha ocurrido un error. Por favor, Intente nuevamente.");
            setImageModal(ImageModalFailded);
            setColor("#AA0C00");
            setShow(true);
            /* setTimeout(() => {
                setShow(false);
            }, 2500); */
        }
    };




    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            registerUser(event); // Llama a registerUser si la validación es exitosa
        }
        setValidated(true);
    };

    const handlePageChange = (page) => {
        //setCurrentPage(page);
    };



    const handleClose = () => { setShow(false); window.location.reload(); }

    const handleUserStatusChange = (index) => {
        setTitulo("Cambio de Estado de Usuario");
        //setImageModal(ImageModalSuccess);
        setBodyMessage("¿Seguro que desea cambiar el estado de usuario.?");
        setColor("#687D2A");
        setCurrentUserStatus(index);
        setShowUserStatus(true);

    };


    const handleConfirm = async () => {
        const token = sessionStorage.getItem('token');
    
        if (!token) {
            console.error("El token no está disponible.");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:20000/user/${currentUserstatus}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                // Manejar la respuesta exitosa
                setTitulo("Estado de Usuario");
                setImageModal(ImageModalSuccess);
                setBodyMessage("Estado de usuario cambiado correctamente.");
                setColor("#687D2A");
                setShow(true);
            } else if (response.status === 401) {
                // Token inválido, se elimina de sessionStorage
                sessionStorage.removeItem('token');
                setTitulo("Error de autenticación");
                setImageModal(ImageModalError);
                setBodyMessage("Su sesión ha expirado. Por favor, inicie sesión nuevamente.");
                setColor("#ff0000");
                setShow(true);
            } else {
                // Manejo de otros errores HTTP
                const errorData = await response.json();
                console.error("Error en la respuesta del servidor:", errorData);
                setTitulo("Error");
                setImageModal(ImageModalError);
                setBodyMessage("No se pudo cambiar el estado del usuario. Intente nuevamente.");
                setColor("#ff0000");
                setShow(true);
            }
        } catch (error) {
            console.error("Error al realizar la solicitud:", error.message);
            setTitulo("Error de red");
            setImageModal(ImageModalError);
            setBodyMessage("No se pudo establecer conexión con el servidor.");
            setColor("#ff0000");
            setShow(true);
        }
    };   



    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const storedIdUser = JSON.parse(sessionStorage.getItem('userId')); // Obtener userId del sessionStorage
        console.log(storedIdUser);

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
                        console.log(data)
                        setTableData(data.createdUsers);
                        setUserData(data);
                        sessionStorage.setItem('userData', JSON.stringify(data));
                        sessionStorage.setItem('rolname', data.roleName);
                    } else if (response.status === 401) {
                        sessionStorage.removeItem('token');
                    } else {
                        throw new Error('No existe el usuario.');
                    }
                } catch (error) {
                    throw new Error('No existe el usuario.');
                }
            };
            fetchUser(); // Llama a la función fetchUser
        } else {

        }

    }, []);





        /* useEffect(() => {
            const storedData = JSON.parse(sessionStorage.getItem('userData'));
            setUserData(storedData);
            setTableData(storedData.createdUsers)
            console.log(storedData);
        }, []); */

        return (
            <>
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title style={{}}>
                            <strong>{titulo}</strong>{" "}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ textAlign: "center" }}>
                        <img
                            src={imageModal}
                            alt="Descripción de la imagen"
                            className="img-fluid"
                            style={{ display: "block", margin: "0 auto", maxWidth: "20%", height: "auto", color: "#687D2A" }}
                        />
                        <strong style={{ fontSize: "20px", color }}>{bodyMessage}</strong>
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </Modal>

                <Modal show={showUserStatus} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <strong>{titulo}</strong>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ textAlign: "center" }}>
                        <strong style={{ fontSize: "20px", color }}>{bodyMessage}</strong>
                    </Modal.Body>
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
                </Modal>


                <Modal show={showAddUser} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ color: "#687D2A" }}>
                            <strong>Nuevo Usuario</strong>{" "}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ textAlign: "center" }}>
                        <div className="form-alin">
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                {/* Nombre */}
                                <Row className="mb-3 align-items-center">
                                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                                        <Form.Label>Nombre</Form.Label>
                                    </Form.Group>
                                    <Form.Group as={Col} md="8">
                                        <Form.Control
                                            required
                                            name="username" // Añadir name
                                            type="text"
                                            placeholder="Nombre"
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un nombre.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                {/* Username */}
                                <Row className="mb-3 align-items-center">
                                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                        <Form.Label>Correo</Form.Label>
                                    </Form.Group>
                                    <Form.Group as={Col} md="8">
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                            <Form.Control
                                                type="email"
                                                name="email" // Añadir name
                                                placeholder="Correo"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Por favor ingrese un correo.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                </Row>

                                {/* Rol */}
                                <Row className="mb-3 align-items-center">
                                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                                        <Form.Label>Rol</Form.Label>
                                    </Form.Group>
                                    <Form.Group as={Col} md="8">
                                        <Form.Control
                                            type="text"
                                            name="roleName"
                                            value="Profesional" // Valor por defecto
                                            readOnly // Campo de solo lectura
                                            className="text-muted custom-readonly" // Clase para aplicar el fondo gris claro
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un rol.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>


                                <Row className="mb-3 align-items-center">
                                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                                        <Form.Label>Cedula</Form.Label>
                                    </Form.Group>
                                    <Form.Group as={Col} md="8">
                                        <Form.Control
                                            type="text"
                                            name="password" // Añadir name
                                            placeholder="Cedula"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese una contraseña.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                {/* Division */}
                                <Row className="mb-3 align-items-center">
                                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                                        <Form.Label>División</Form.Label>
                                    </Form.Group>
                                    <Form.Group as={Col} md="8">
                                        <Form.Select
                                            name="division"
                                            aria-label="Default select example"
                                            required
                                            isInvalid={division === ""} // Esto muestra el feedback si no es válido
                                            onChange={(e) => setDivision(e.target.value)} // Asume que tienes un estado para 'division'
                                        >
                                            <option value="">Selecciona una Opción</option>
                                            <option value="Bienestar">Bienestar</option>
                                            <option value="Tesorería">Tesorería</option>
                                            <option value="Otro">Otro</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Por favor selecciona una división.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <div className="text-center">
                                    <Button type="submit">Crear Usuario</Button>
                                </div>
                            </Form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </Modal>


                <div className="row">
                    <SideMenu />
                    <div className="col-10 mx-auto homeDivP">
                        <div>
                            <div className="d-flex justify-content-end  pb-4" style={{ width: '70%', margin: 'auto' }}>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-auto"
                                    onClick={() => setShowAddUser(true)}
                                >
                                    Agregar Manualmente
                                </Button>
                            </div>

                            <table style={{ width: '70%', margin: 'auto' }}>
                                <tbody>
                                    {currentItems.length > 0 ? (
                                        currentItems.map((data, index) => (
                                            <tr key={index}>
                                                <td style={{ textAlign: 'left', padding: '8px' }}>{data.id}</td>
                                                <td style={{ textAlign: 'left', padding: '8px' }}>{data.fullName}</td>
                                                <td style={{ textAlign: 'left', padding: '8px' }}>{data.userStatus}</td>
                                                <td style={{ textAlign: 'left', padding: '8px' }}>
                                                    <img
                                                        src={Desactivar}
                                                        alt="Desactivar"
                                                        style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                                                        onClick={() => handleUserStatusChange(data.id)}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" style={{ textAlign: 'left', padding: '8px',}}>No tiene usuarios registrados a su cargo.</td>
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


                    </div>
                </div>
            </>
        );
    }

    export default UserCreate;

