import { useEffect, useState } from "react";
import "./Perfil.css"; // Importa el archivo CSS
import Modal from "react-bootstrap/Modal";
import SideMenu from "../../components/SideMenu";

const Perfil = () => {
  const [userData, setUserData] = useState(null);
  const [username, setusername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");
  const [titulo, setTitulo] = useState("");
  const [bodyMessage, setBodyMessage] = useState("");
  const [show, setShow] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const validateForm = (newoldPassword, confirmoldPassword = "") => {
    const newErrors = {};
    // Validaciones para la nueva contraseña
    if (newoldPassword.length < 8) {
      newErrors.newPassword =
        "La nueva contraseña debe tener al menos 8 caracteres.";
    } else if (!/[A-Z]/.test(newoldPassword)) {
      newErrors.newPassword =
        "La contraseña debe tener al menos una letra mayúscula.";
    } else if (!/[a-z]/.test(newoldPassword)) {
      newErrors.newPassword =
        "La contraseña debe tener al menos una letra minúscula.";
    } else if (!/[0-9]/.test(newoldPassword)) {
      newErrors.newPassword = "La contraseña debe tener al menos un número.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(newoldPassword)) {
      newErrors.newPassword =
        "La contraseña debe tener al menos un carácter especial.";
    }

    // Validación para la confirmación de contraseña
    if (newoldPassword !== confirmoldPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
    evaluatePasswordStrength(newoldPassword);
  };

  const evaluatePasswordStrength = (password) => {
    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      setPasswordStrength("Fuerte");
    } else if (password.length >= 8) {
      setPasswordStrength("Media");
    } else {
      setPasswordStrength("Débil");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ username, oldPassword, newPassword }));
    if (isFormValid) {
      try {
        const response = await fetch(
          "http://localhost:8080/user/change-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, oldPassword, newPassword }),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          setTitulo("Error al cambiar la contraseña");

          if (data.response === "old password do not match") {
            setBodyMessage("La contraseña actual es incorrecta");
          } else if (
            data.response ===
            "new password cannot be the same as an old password"
          ) {
            setBodyMessage(
              "La nueva contraseña no puede ser igual a la contraseña antigua"
            );
          }
          setShow(true);
          setTimeout(() => {
            setShow(false);
            window.location.reload();
          }, 3500);
          return;
        } else {
          console.log("Contraseña cambiada con éxito");
          setTitulo("");
          setBodyMessage("Contraseña cambiada con éxito");
          setShow(true);
          setTimeout(() => {
            setShow(false);
            window.location.reload();
          }, 3500);
        }
      } catch (error) {
        console.log("Error al cambiar la contraseña", error);
        setTitulo("No se puede conectar al servidor");
        setBodyMessage("Por favor, intente más tarde.");
        setShow(true);
        setTimeout(() => {
          setShow(false);
          window.location.reload();
        }, 2500);
      }
    }
  };

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("userData"));

    setUserData(storedData);
    setusername(storedData.username);
    console.log(storedData);
  }, []);

  const handleClose = () => setShow(false);

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
            style={{
              display: "block",
              margin: "0 auto",
              maxWidth: "20%",
              height: "auto",
            }}
          />
          <strong style={{ fontSize: "20px" }}>{bodyMessage}</strong>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <SideMenu userData={"userData"} />
      <span className="col-2"></span>
      <div className="col-10">
        <div className="containers">
          <h1 className="title">Tu Perfil</h1>
          {userData ? (
            <div className="profile-info">
              <div className="profile-row">
                <p className="label">
                  <strong>Nombre:</strong>
                </p>
                <p className="value">{userData.username}</p>
              </div>
              <div className="profile-row">
                <p className="label">
                  <strong>Correo:</strong>
                </p>
                <p className="value">{userData.email}</p>
              </div>
              <div className="profile-row">
                <p className="label">
                  <strong>Rol:</strong>
                </p>
                <p className="value">{userData.roleName}</p>
              </div>
              <div className="profile-row">
                <p className="label">
                  <strong>División:</strong>
                </p>
                <p className="value">{userData.division}</p>
              </div>
            </div>
          ) : (
            <p>
              No hay datos de usuario disponibles. Por favor, inicia sesión.
            </p>
          )}

          <form onSubmit={handleSubmit} className="change-password-form">
            <h2>Cambio de contraseña</h2>
            <div className="form-groupP">
              <label htmlFor="current-password">Contraseña actual</label>
              <input
                type="password"
                id="current-password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-groupP">
              <label htmlFor="new-password">Nueva contraseña</label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  validateForm(e.target.value);
                }}
                required
              />
              {errors.newPassword && (
                <p className="error-message">{errors.newPassword}</p>
              )}
              <div
                className={`password-strength ${passwordStrength.toLowerCase()}`}
              >
                Seguridad de la contraseña: {passwordStrength}
              </div>
            </div>

            <div className="form-groupP">
              <label htmlFor="confirm-password">
                Confirmar nueva contraseña
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validateForm(newPassword, e.target.value);
                }}
                required
              />
              {errors.confirmPassword && (
                <p className="error-message">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className="submit-button"
            >
              Cambiar contraseña
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
