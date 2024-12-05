import { BsFillCaretDownFill } from "react-icons/bs";
import { MdLocationOn, MdMenu } from "react-icons/md";
//Styles
import "./HeaderUnal.css";
//Images
import escudoUnal from "/src/assets/images/escudoUnal.png";
import sealColombia from "/src/assets/images/header/sealColombia.png";

//Components
import GoogleAnalytics from "./Header.component";
import Buscador from "./Header2.component";
import { Link } from "react-router-dom";
import SideNavBar from "./SideNavBar";

function HeaderUnal() {
  return (
    <>
      <div className="headerP text-white">
        <SideNavBar />
        <nav className="navbar navbar-one navbar-expand-md justify-content-end">
          <div className="text-right text-white">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="btn-navbar-one-1 p-0" type="button">
                  <li className="nav-item">
                    <a
                      className="nav-link link-navbar-one"
                      href="http://aspirantes.unal.edu.co/"
                      target="_top"
                    >
                      Aspirantes
                    </a>
                  </li>
                </li>
                <li className="btn-navbar-one-2 p-0" type="button">
                  <li className="nav-item">
                    <a
                      className="nav-link link-navbar-one"
                      href="http://estudiantes.unal.edu.co/"
                      target="_top"
                    >
                      Estudiantes
                    </a>
                  </li>
                </li>
                <li className="btn-navbar-one-3 p-0" type="button">
                  <li className="nav-item">
                    <a
                      className="nav-link link-navbar-one"
                      href="http://egresados.unal.edu.co/"
                      target="_top"
                    >
                      Egresados
                    </a>
                  </li>
                </li>
                <li className="btn-navbar-one-4 p-0" type="button">
                  <li className="nav-item">
                    <a
                      className="nav-link link-navbar-one"
                      href="http://docentes.unal.edu.co/"
                      target="_top"
                    >
                      Docentes
                    </a>
                  </li>
                </li>
                <li className="btn-navbar-one-5 p-0" type="button">
                  <li className="nav-item">
                    <a
                      className="nav-link link-navbar-one"
                      href="http://administrativos.unal.edu.co/"
                      target="_top"
                    >
                      Administrativos
                    </a>
                  </li>
                </li>

                <li className="nav-item navbar-one-social">
                  <a
                    className="change-fli"
                    href="https://www.facebook.com/Bienestar-Bogotá-Unal-1091112600929190/?fref=ts"
                    target="_blank"
                    rel="noreferrer"
                    title="Página oficial en Facebook"
                  >
                    <img
                      className="change-fli"
                      src="/src/assets/images/header/facebook-gray.png"
                    />
                    <img
                      className="change-fli"
                      src="/src/assets/images/header/facebook.png"
                    />
                  </a>
                </li>
                <li className="nav-item navbar-one-social">
                  <a
                    className="change-fli"
                    href="https://twitter.com/bienestarbogota?lang=es"
                    target="_blank"
                    rel="noreferrer"
                    title="Cuenta oficial en Twitter"
                  >
                    <img
                      className="change-fli"
                      src="/src/assets/images/header/twitter-bird-gray.png"
                    />
                    <img
                      className="change-fli"
                      src="/src/assets/images/header/twitter-bird.png"
                    />
                  </a>
                </li>
                <li className="nav-item navbar-one-social">
                  <a
                    className="change-fli"
                    href="https://www.youtube.com/user/bienestarbogotaun"
                    target="_blank"
                    rel="noreferrer"
                    title="Canal oficial de Youtube"
                  >
                    <img
                      className="change-fli"
                      src="/src/assets/images/header/youtube-gray.png"
                    />
                    <img
                      className="change-fli"
                      src="/src/assets/images/header/youtube.png"
                    />
                  </a>
                </li>
                <li className="nav-item navbar-one-social">
                  <a
                    className="change-fli"
                    href="https://www.flickr.com/photos/bienestarbogotaun/sets/"
                    target="_blank"
                    rel="noreferrer"
                    title="Flickr"
                  >
                    <img
                      className="change-fli"
                      src="/src/assets/images/header/Flickr-gray.png"
                    />
                    <img
                      className="change-fli"
                      src="/src/assets/images/header/Flickr.png"
                    />
                  </a>
                </li>
                <li className="btn-group nav-item">
      <input type="checkbox" id="navbarDropdownMenuLinklanguages-toggle" />
      <label
        className="btn dropdown-toggle btn-menu text-white"
        htmlFor="navbarDropdownMenuLinklanguages-toggle"
      >
        ES&nbsp;<span>&#9662;</span>
      </label>
      <ul
        className="dropdown-menu dropdown-menu-right menu text-right"
        aria-labelledby="navbarDropdownMenuLinklanguages"
      >
        <li>
          <a className="dropdown-item" href="#">
            ES (Español)
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            EN (Inglés)
          </a>
        </li>
      </ul>
    </li>
              </ul>
            </div>
          </div>
        </nav>

        <nav className="navbar navbar-two navbar-expand-md text-white">
          <GoogleAnalytics />
          <Buscador />

          <span className="navbar-brand container-logo float-left">
            <Link to="https://unal.edu.co/">
              <img
                className="background-image"
                src="/src/assets/images/header/sealBck.png"
              />
              <img className="overlay-image" src={escudoUnal} />
            </Link>
          </span>

          <span className="seal float-right">
            <img
              className="visible-print"
              alt="Escudo de la República de Colombia"
              src={sealColombia}
              width="66px"
              height="66px"
            />
          </span>

          {/* <div className="buscador float-right">
                        <div id="gsc-i-id1" className="gcse-searchbox-only" data-resultsurl={"http://unal.edu.co/resultados-de-la-busqueda/"} data-newwindow="true" contentEditable={true}  >
                        </div>
                    </div> */}

          <div className="d-flex flex-column text-left ppal-navbar">
            <div className="d-flex">
              <div className="flex-fill site-url">
                <Link className="navbar-brand text-left text-white" to="#">
                  <MdLocationOn />
                  &nbsp;bienestar.bogota.unal.edu.co
                </Link>
              </div>

              <div className="flex-fill">
                <div
                  id="gsc-i-id"
                  className="gcse-searchbox-only"
                  data-resultsurl={
                    "http://unal.edu.co/resultados-de-la-busqueda/"
                  }
                  data-newwindow="true"
                  contentEditable={true}
                ></div>
              </div>
            </div>

            <button
              className="navbar-toggler collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <MdMenu />
            </button>
            <div
              className="collapse navbar-collapse ppal-navbar-mobile"
              id="navbarNavDropdown"
            >
              <ul className="navbar-nav">
                <div className="site-url" id="title-mobile">
                  <Link className="navbar-brand text-left text-white" to="/">
                    <MdLocationOn />
                    &nbsp;bienestar.bogota.unal.edu.co
                  </Link>
                </div>
                <div id="buscador-mobile">
                  <div
                    id="gsc-i-id2"
                    className="gcse-searchbox-only"
                    data-resultsurl={
                      "http://unal.edu.co/resultados-de-la-busqueda/"
                    }
                    data-newwindow="true"
                    contentEditable={true}
                  ></div>
                </div>
                <li className="btn-group nav-item">
                  <input type="checkbox" id="navbarDropdownMenuLink1-toggle" />
                  <label
                    className="btn dropdown-toggle btn-menu text-white"
                    htmlFor="navbarDropdownMenuLink1-toggle"
                  >
                    BIENESTAR&nbsp;
                    <BsFillCaretDownFill className="menu-arrowDown" size={10} />
                  </label>
                  <ul className="dropdown-menu dropdown-menu-left menu text-left">
                    <li>
                      <a
                        className="dropdown-item"
                        target="_self"
                        href="http://www.bienestar.bogota.unal.edu.co/bienestar.php?sec=1#panel_bienestar"
                      >
                        ¿Quiénes somos?
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        target="_self"
                        href="http://www.bienestar.bogota.unal.edu.co/bienestar.php?sec=3#panel_bienestar"
                      >
                        Estructura
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        target="_self"
                        href="http://www.bienestar.bogota.unal.edu.co/bienestar.php?sec=5#panel_bienestar"
                      >
                        Normatividad
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        target="_self"
                        href="http://www.bienestar.bogota.unal.edu.co/bienestar.php?sec=4#panel_bienestar"
                      >
                        Directorio
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="btn-group nav-item">
                  <input type="checkbox" id="navbarDropdownMenuLink2-toggle" />
                  <label
                    className="btn dropdown-toggle btn-menu text-white"
                    htmlFor="navbarDropdownMenuLink2-toggle"
                  >
                    ÁREAS&nbsp;
                    <BsFillCaretDownFill className="menu-arrowDown" size={10} />
                  </label>
                  <ul className="dropdown-menu dropdown-menu-left menu text-left">
                    <li>
                      <a
                        className="dropdown-item"
                        target="_self"
                        href="http://www.bienestar.bogota.unal.edu.co/acompanamiento.php"
                      >
                        Acompañamiento Integral
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        target="_self"
                        href="http://www.bienestar.bogota.unal.edu.co/cultura.php"
                      >
                        Cultura
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        target="_self"
                        href="http://www.bienestar.bogota.unal.edu.co/deportes.php"
                      >
                        Actividad Física y Deporte
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        target="_self"
                        href="http://www.bienestar.bogota.unal.edu.co/gestion.php"
                      >
                        Gestión y Fomento
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        target="_self"
                        href="http://www.bienestar.bogota.unal.edu.co/salud.php"
                      >
                        Salud
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="btn-group nav-item">
                  <input type="checkbox" id="navbarDropdownMenuLink3-toggle" />

                  <label
                    className="btn dropdown-toggle btn-menu text-white"
                    htmlFor="navbarDropdownMenuLink3-toggle"
                  >
                    OTROS PROGRAMAS&nbsp;
                    <BsFillCaretDownFill className="menu-arrowDown" size={10} />
                  </label>

                  <ul
                    className="dropdown-menu dropdown-menu-left menu text-left"
                    aria-labelledby="navbarDropdownMenuLink3"
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        target="_self"
                        href="http://www.bienestar.bogota.unal.edu.co/jardin.php"
                      >
                        Jardín Infantil
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        target="_self"
                        href="http://www.bienestar.bogota.unal.edu.co/iparm.php"
                      >
                        Colegio IPARM
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        target="_self"
                        href="http://www.bienestar.bogota.unal.edu.co/capellania.php"
                      >
                        Capellanía
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        target="_self"
                        href="http://www.bienestar.bogota.unal.edu.co/bien_doc_admin.php"
                      >
                        Docentes y Administrativos
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        target="_self"
                        href="http://www.egresadosbogota.unal.edu.co/"
                      >
                        Egresados
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="btn-group nav-item">
                  <input type="checkbox" id="navbarDropdownMenuLink4-toggle" />

                  <label
                    className="btn dropdown-toggle btn-menu text-white"
                    htmlFor="navbarDropdownMenuLink4-toggle"
                  >
                    NOVEDADES&nbsp;
                    <BsFillCaretDownFill className="menu-arrowDown" size={10} />
                  </label>

                  <ul
                    className="dropdown-menu dropdown-menu-left menu text-left"
                    aria-labelledby="navbarDropdownMenuLink4"
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        target="_self"
                        href="http://www.bienestar.bogota.unal.edu.co/noticias.php"
                      >
                        Noticias
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        target="_self"
                        href="http://www.bienestar.bogota.unal.edu.co/eventos.php"
                      >
                        Eventos
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="btn-group nav-item">
                  <li className="btn btn-menu" type="button">
                    <a
                      className="dropdown-item px-0 mx-0"
                      href="http://www.bienestar.bogota.unal.edu.co/convocatorias.php"
                    >
                      CONVOCATORIAS
                    </a>
                  </li>
                </li>
                <li className="btn-group nav-item">
                  <li className="btn btn-menu" type="button">
                    <a
                      className="dropdown-item px-0 mx-0"
                      href="http://www.bienestar.bogota.unal.edu.co/enplural_boletin.php"
                    >
                      Boletín En Plural
                    </a>
                  </li>
                </li>

                <li className="btn-group nav-item">
                  <input type="checkbox" id="navbarDropdownMenuLink5-toggle" />
                  <label
                    className="btn dropdown-toggle btn-menu text-white"
                    htmlFor="navbarDropdownMenuLink5-toggle"
                  >
                    SEDES&nbsp;
                    <BsFillCaretDownFill className="menu-arrowDown" size={10} />
                  </label>
                  <ul
                    className="dropdown-menu dropdown-menu-left menu text-left"
                    aria-labelledby="navbarDropdownMenuLink5"
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        href="http://www.imani.unal.edu.co/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Amazonia
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="http://www.bogota.unal.edu.co/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Bogotá
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="http://www.caribe.unal.edu.co/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Caribe
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="http://www.delapaz.unal.edu.co/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        De La Paz
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="http://www.manizales.unal.edu.co/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Manizales
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="http://www.medellin.unal.edu.co/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Medellín
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="http://www.orinoquia.unal.edu.co/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Orinoquia
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="http://www.palmira.unal.edu.co/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Palmira
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="http://www.tumaco-pacifico.unal.edu.co/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Tumaco
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default HeaderUnal;
