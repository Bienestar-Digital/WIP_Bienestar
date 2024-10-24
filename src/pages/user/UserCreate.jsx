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

function UserCreate() {
    const [validated, setValidated] = useState(false);
    const [bodyMessage, setBodyMessage] = useState("");
    const [show, setShow] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [division, setDivision] = useState("");
    const [userData, setUserData] = useState();
    const [imageModal, setImageModal] = useState("");
    const [color, setColor] = useState("");
    const token = "your-auth-token"; // Añade aquí tu token correctamente

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
            createdBy: userData.username

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



    const handleClose = () => { setShow(false); window.location.reload(); }


    useEffect(() => {
        const storedData = JSON.parse(sessionStorage.getItem('userData'));
        setUserData(storedData);
    }, []);

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{  }}>
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
                    <strong style={{ fontSize: "20px", color  }}>{bodyMessage}</strong>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>


            <div className="row">
                <SideMenu />
                <div className="col-8 mx-auto homeDivP">
                    <div className="header"><h1>Nuevo Usuario</h1></div>

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

                </div>
            </div>
        </>
    );
}

export default UserCreate;
