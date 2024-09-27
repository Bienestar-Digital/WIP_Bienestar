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
        path: "/crearEvento",
        element: <CrearEvento />
      },
      {
        path: "/crearUsuario",
        element: <CrearUsuario />
      },
      {
        path: "/userSuccess",
        element: <CrearSuccess />
      },
      {
        path: "/userFailed",
        element: <CrearFailed />
      },
      {
        path: "/tusEventos",
        element: <TusEventos />
      },
      {
        path: "/cargaAsistencia/:eventId",
        element: <CargaAsistencia />
      },
      {
        path: "/cargaSuccess",
        element: <CargaSuccess/>
      },
      {
        path: "/cargaFailed",
        element: <CargaFailed/>
      },
      {
        path: "/perfil",
        element: <Perfil/>
      },
      {
        path: "/registroPorEvento/:eventId",
        element: <RegistroPorEvento/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />

  </React.StrictMode>
);
