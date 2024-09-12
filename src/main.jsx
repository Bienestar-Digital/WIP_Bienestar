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
import Home from './pages/home/Home.jsx';
import CrearEvento from "./pages/CrearEvento.jsx";
import CrearUsuario from "./pages/user/UserCreate.jsx";
import TusEventos from "./pages/TusEventos.jsx";
import Login from "./pages/login/Login.jsx";
import CargaAsistencia from "./pages/CargaAsistencia.jsx";

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
        path: "/tusEventos",
        element: <TusEventos />
      },
      {
        path: "/cargaAsistencia",
        element: <CargaAsistencia />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />

  </React.StrictMode>
);
