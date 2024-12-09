import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css'
import Login from './pages/login/Login.jsx';
import Home from './pages/home/Home.jsx';
import CrearEvento from "./pages/Crear/CrearEvento.jsx";
import CrearUsuario from "./pages/user/UserCreate.jsx";
import TusEventos from "./pages/TusEventos/TusEventos.jsx";
import CargaAsistencia from "./pages/CargaAsistencia/CargaAsistencia.jsx";
import Layout from "./components/Layout.jsx";
import CrearSuccess from "./pages/Crear/CrearSuccess.jsx";
import CrearFailed from "./pages/Crear/CrearFailed.jsx";
import CargaSuccess from "./pages/CargaAsistencia/CargaSuccess.jsx";
import CargaFailed from "./pages/CargaAsistencia/CargaFailed.jsx";
import Perfil from "./pages/perfil/Perfil.jsx";
import RegistroPorEvento from "./pages/TusEventos/RegistrosPorEvento.jsx";
import FormUserCreate from "./pages/user/FormUserCreate.jsx";

const router = createBrowserRouter([
  {
    path: "/",
   
    children: [
      {
          path: "/",
          element: <Login />
      },
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/crear-evento",
        element: <CrearEvento />
      },
      {
        path: "/crear-usuario",
        element: <CrearUsuario />
      },
      {
        path: "/crear-usuario-form",
        element: <FormUserCreate />
      },
      {
        path: "/user-success",
        element: <CrearSuccess />
      },
      {
        path: "/user-failed",
        element: <CrearFailed />
      },
      {
        path: "/tus-eventos",
        element: <TusEventos />
      },
      {
        path: "/carga-asistencia/:eventId",
        element: <CargaAsistencia />
      },
      {
        path: "/carga-success",
        element: <CargaSuccess/>
      },
      {
        path: "/carga-failed",
        element: <CargaFailed/>
      },
      {
        path: "/perfil",
        element: <Perfil/>
      },
      {
        path: "/registro-por-evento/:eventId",
        element: <RegistroPorEvento/>
      },
      

    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />

  </React.StrictMode>
);
