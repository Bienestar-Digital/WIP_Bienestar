import { useEffect, useState } from "react";
import "./Perfil.css"; // Importa el archivo CSS
import SideMenu from "../../components/SideMenu";

const Perfil = () => {
  const [userData, setUserData] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const validateForm = (newCurrentPassword,confirmCurrentPassword="") => {
    const newErrors = {};
    // Validaciones para la nueva contraseña
    if (newCurrentPassword.length < 8) {
      newErrors.newPassword =
        "La nueva contraseña debe tener al menos 8 caracteres.";
    } else if (!/[A-Z]/.test(newCurrentPassword)) {
      newErrors.newPassword =
        "La contraseña debe tener al menos una letra mayúscula.";
    } else if (!/[a-z]/.test(newCurrentPassword)) {
      newErrors.newPassword =
        "La contraseña debe tener al menos una letra minúscula.";
    } else if (!/[0-9]/.test(newCurrentPassword)) {
      newErrors.newPassword = "La contraseña debe tener al menos un número.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(newCurrentPassword)) {
      newErrors.newPassword =
        "La contraseña debe tener al menos un carácter especial.";
    }

    // Validación para la confirmación de contraseña
    if (newCurrentPassword !== confirmCurrentPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
    evaluatePasswordStrength(newCurrentPassword);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Formulario enviado con éxito");
    }
  };

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("userData"));

    setUserData(storedData);
  }, []);

  return (
    <div className="row">
      <SideMenu userData={"userData"} />
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
              <div className="form-group">
                <label htmlFor="current-password">Contraseña actual</label>
                <input
                  type="password"
                  id="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
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

              <div className="form-group">
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
