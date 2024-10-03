import { useEffect, useState } from "react";
import './Perfil.css'; // Importa el archivo CSS
import SideMenu from "../../components/SideMenu";

const Perfil = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedData = JSON.parse(sessionStorage.getItem('userData'));
       
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
                                <p className="label"><strong>Nombre:</strong></p>
                                <p className="value">{userData.username}</p>
                            </div>
                            <div className="profile-row">
                                <p className="label"><strong>Correo:</strong></p>
                                <p className="value">{userData.email}</p>
                            </div>
                            <div className="profile-row">
                                <p className="label"><strong>Rol:</strong></p>
                                <p className="value">{userData.roleName}</p>
                            </div>
                            <div className="profile-row">
                                <p className="label"><strong>División:</strong></p>
                                <p className="value">{userData.division}</p>
                            </div>
                        </div>
                    ) : (
                        <p>No hay datos de usuario disponibles. Por favor, inicia sesión.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Perfil;
