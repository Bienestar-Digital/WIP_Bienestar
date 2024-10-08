import React, { useState } from 'react';
import Header from '../../layout/header/header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'
import './login.css';
import Footer from '../../layout/footer/footer';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import ImageModalPrevent from "../../assets/images/assignment_late.png"
import ImageLogo from "../../assets/images/escudo2_unal.png"

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState([]);
    const [rolName , setRolName] = useState("");
    const [titulo, setTitulo] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const [bodyMessage, setBodyMessage] = useState("");
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const loginData = { username, password };
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            doCall();
        }

        setValidated(true);
    };    
    

    const doCall = async () => {
        const loginData = { username, password };

        try {
            const response = await fetch('http://localhost:8080/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                // Si el servidor responde con un error (como 401, 404, etc.)
                if (response.status === 401) {
                    //alert('Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.');
                    setTitulo("Credenciales incorrectas");
                    setBodyMessage("Por favor, Intente nuevamente.");
                    setShow(true);
                    setTimeout(() => {
                        setShow(false);
                        window.location.reload();
                    }, 2500);
                } else {
                    //alert('Error al iniciar sesión. Código de estado: ' + response.status);
                    setTitulo("Usuario no encontrado");
                    setBodyMessage("Por favor, Intente nuevamente.");
                    setShow(true);
                    setTimeout(() => {
                        setShow(false);
                        window.location.reload();
                    }, 2500);
                }
                return;
            }

            const data = await response.json();

            if (data.token) {
                sessionStorage.setItem('token', data.token);                
                sessionStorage.setItem('userId', JSON.stringify(data.userId));
                sessionStorage.setItem('userid', data.userId);
                console.log("userid", data.userId);
                sessionStorage.setItem('userName', username); 
                console.log("data.userId", data.userId);
                getUserRole(data.userId, data.token);
                console.log('Inicio de sesión exitoso:', data);
                console.log('User:', username);
                navigate('/home');
            } else {
                alert('Error al recibir el token de autenticación.');
            }
            

        } catch (error) {
            // Si ocurre un error de red o de conexión
            console.error('Error de red o servidor no disponible:', error);
            //alert('No se puede conectar al servidor. Por favor, intente más tarde.');
            setTitulo("No se puede conectar al servidor");
            setBodyMessage("Por favor, intente más tarde.");
            setShow(true);
            setTimeout(() => {
                setShow(false);
                window.location.reload();
            }, 2500);

        }


    };
    const handleClose = () => setShow(false);



    const getUserRole = async (id, token) => {

        try {
            const response = await fetch(`http://localhost:20000/user/${id}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
  
            if (response.ok) {
              const data = await response.json();
              setRolName(data.roleName); 
              console.log("RolName", data.roleName); 
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

    }

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: "#687D2A" }}>
                        <strong>{titulo}</strong>{" "}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img
                        src={ImageModalPrevent}
                        alt="Descripción de la imagen"
                        className="img-fluid"
                        style={{ display: 'block', margin: '0 auto', maxWidth: '20%', height: 'auto' }}
                    />
                    <strong style={{ fontSize: "20px" }}>{bodyMessage}</strong>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
            <Header />
            <div className="center-container">
                <img
                    src={ImageLogo}
                    alt="Escudo Unal"
                    className="responsive-image"
                />
                <div className="form-container">
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        {/* Grupo de formulario para el nombre de usuario */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    placeholder="Usuario"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="input-with-addon"
                                />
                                {/* Texto adicional a la derecha del input */}
                                <span className="input-addon" style={{ color: "#687D2A", fontSize: "20px", fontWeight: "bold", }}>@unal.edu.co</span>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        {/* Grupo de formulario para la contraseña */}
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="input-with-addon"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid password.
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Botón de envío */}
                        <Button variant="primary" type="submit" className="full-width-button w-100">
                            Ingresar
                        </Button>
                    </Form>
                </div>
            </div>

            <Footer />

        </>



    );
};

export default Login;