import React, { useState } from 'react';
// Styles
import "./Header.css";

import icnServEmail from '/src/assets/images/icnServEmail.png';
import icnServSia from '/src/assets/images/icnServSia.png';
import icnServbienestar from '/src/assets/images/icnServbienestar.png';
import icnServLibrary from '/src/assets/images/icnServLibrary.png';
import icnServCall from '/src/assets/images/icnServCall.png';
import icnServidentidad from '/src/assets/images/icnServidentidad.png';

function SideNavBar () {
  const openNav = () => {
    const sidebar = document.getElementById("services");
    const main = document.getElementById("main");
    const checkbox = document.getElementById("sidebar-toggle");
    sidebar.style.width = "260px";
    main.style.marginLeft = "260px";
    checkbox.style.right = "260px";
  };

  const closeNav = () => {
    const sidebar = document.getElementById("services");
    const main = document.getElementById("main");
    const checkbox = document.getElementById("sidebar-toggle");
    sidebar.style.width = "0px";
    main.style.marginLeft= "0px";
    checkbox.style.right = "0px";
  };

  const [isChecked, setIsChecked] = useState(false);

  const toggleNav = () => {
    setIsChecked(!isChecked);

    if (isChecked) {
      closeNav();
    } else {
      openNav();
    }
  };

  return (
    <div id="main">
      <input type="checkbox" className="btn-flotante input p-0" id="sidebar-toggle" checked={isChecked} onChange={toggleNav} />
      <div id="services" className="services">
        <ul className="list-unstyled d-flex flex-column">
          <button className="btn btn-menu-services" type="button">
            <li className="nav-item">
              <a className="nav-link color-a" href="http://correo.unal.edu.co/" target="_blank">
                <img className="item-services" src={icnServEmail} width="32" height="32" alt="Correo Electrónico" />
                Correo Electrónico
              </a>
            </li>
          </button>
          <button className="btn btn-menu-services" type="button">
            <li className="nav-item">
              <a className="nav-link color-a" href="http://dninfoa.unal.edu.co/" target="_blank">
                  <img className="item-services" src={icnServSia} width="32" height="32" alt="Sistema de Información Académica" />
                  DNINFOA-SIA
              </a>
            </li>
          </button>
          <button className="btn btn-menu-services" type="button">
            <li className="nav-item">
              <a className="nav-link color-a" href="http://sinsu.unal.edu.co/" target="_blank">
                <img className="item-services" src={icnServbienestar} width="32" height="32" alt="sinsu" />
                SINSU
              </a>
            </li>
          </button>
          <button className="btn btn-menu-services" type="button">
            <li className="nav-item">
              <a className="nav-link color-a" href="http://bibliotecas.unal.edu.co/" target="_blank">
                <img className="item-services" src={icnServLibrary} width="32" height="32" alt="Biblioteca" />
                Bibliotecas
              </a>
            </li>
          </button>
          <button className="btn btn-menu-services" type="button">
            <li className="nav-item">
              <a className="nav-link color-a" href="http://personal.unal.edu.co/" target="_blank">
                <img className="item-services" src={icnServCall} width="32" height="32" alt="Convocatorias" />
                Convocatorias
              </a>
            </li>
          </button>
          <button className="btn btn-menu-services" type="button">
            <li className="nav-item">
              <a className="nav-link color-a" href="http://identidad.unal.edu.co/" target="_blank">
                <img className="item-services" src={icnServidentidad} width="32" height="32" alt="identidad" />
                Identidad U.N.
              </a>
            </li>
          </button>
        </ul>
      </div>
    </div>
  );
}

export default SideNavBar;