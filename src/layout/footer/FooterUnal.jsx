//Styles
import "./FooterUnal.css";
//Images
import logoOrgullo from '/src/assets/images/log_orgullo.png';
import logoOrgulloBlack from '/src/assets/images/log_orgullo_black.png';
import logoGobierno from '/src/assets/images/log_gobiern.png';
import logoAgencia from '/src/assets/images/log_agenc.png';
import logoAgenciaBlack from '/src/assets/images/log_agenc_black.png';
import logoContraloria from '/src/assets/images/log_contra.png';

function FooterUnal() {
  return (
    <footer className="footer col">
      <div className="row">
        <div className="col-sm-4 col-md-3 row gobiernoLinea">
          <a
            className="col-lg-6 pr-lg-0 pl-lg-0 pr-lg-0 pl-lg-0"
            href="http://www.legal.unal.edu.co"
            target="_top"
          >
            Régimen Legal
          </a>
          <a
            className="col-lg-6 pr-lg-0 pl-lg-0"
            href="http://www.unal.edu.co/dnp"
            target="_top"
          >
            Talento humano
          </a>
          <a
            className="col-lg-6 pr-lg-0 pl-lg-0"
            href="http://contratacion.unal.edu.co/"
            target="_top"
          >
            Contratación
          </a>
          <a
            className="col-lg-6 pr-lg-0 pl-lg-0"
            href="http://www.unal.edu.co/dnp/"
            target="_top"
          >
            Ofertas de empleo
          </a>
          <a
            className="col-lg-6 pr-lg-0 pl-lg-0"
            href="http://launalcuenta.unal.edu.co/"
            target="_top"
          >
            Rendición de cuentas
          </a>
          <a
            className="col-lg-6 pr-lg-0 pl-lg-0"
            href="http://docentes.unal.edu.co/concurso-profesoral/"
            target="_top"
          >
            Concurso docente
          </a>
          <a
            className="col-lg-6 pr-lg-0 pl-lg-0"
            href="http://www.pagovirtual.unal.edu.co/"
            target="_top"
          >
            Pago Virtual
          </a>
          <a
            className="col-lg-6 pr-lg-0 pl-lg-0"
            href="http://www.unal.edu.co/control_interno/index.html"
            target="_top"
          >
            Control interno
          </a>
          <a
            className="col-lg-6 pr-lg-0 pl-lg-0"
            href="http://siga.unal.edu.co/"
            target="_top"
          >
            Calidad
          </a>
          <a
            className="col-lg-6 pr-lg-0 pl-lg-0"
            href="http://unal.edu.co/buzon-de-notificaciones/"
            target="_self"
          >
            Buzón de notificaciones
          </a>
        </div>
        <div className="col-sm-4 col-md-3 row gobiernoLinea">
          <a
            className="col-lg-6 pr-lg-0 pl-lg-0"
            href="http://correo.unal.edu.co"
            target="_top"
          >
            Correo institucional
          </a>
          <a className="col-lg-6 pr-lg-0 pl-lg-0" href="mapa_sitio.php">
            Mapa del sitio
          </a>
          <a
            className="col-lg-6 pr-lg-0 pl-lg-0"
            href="http://redessociales.unal.edu.co"
            target="_top"
          >
            Redes Sociales
          </a>
          <a
            className="col-lg-6 pr-lg-0 pl-lg-0"
            href="http://unal.edu.co/faq/"
          >
            FAQ
          </a>
          <a
            className="col-lg-6 pr-lg-0 pl-lg-0"
            href="http://unal.edu.co/quejas-y-reclamos/"
            target="_self"
          >
            Quejas y reclamos
          </a>
          <a
            className="col-lg-6 pr-lg-0 pl-lg-0"
            href="http://unal.edu.co/atencion-en-linea/"
            target="_self"
          >
            Atención en línea
          </a>
          <a
            className="col-lg-6 pr-lg-0 pl-lg-0"
            href="http://unal.edu.co/encuesta/"
            target="_self"
          >
            Encuesta
          </a>
          <a className="col-lg-6 pr-lg-0 pl-lg-0" href="contacto.php">
            Contáctenos
          </a>
          <a
            className="col-lg-6 pr-lg-0 pl-lg-0"
            href="http://www.onp.unal.edu.co"
            target="_top"
          >
            Estadísticas
          </a>
          <a
            className="col-lg-6 pr-lg-0 pl-lg-0"
            href="http://unal.edu.co/menu-inferior-2/glosario/"
          >
            Glosario
          </a>
        </div>
        <div className="col-sm-4 col-md-4 pr-lg-0 pl-lg-0 pr-sm-0 pl-sm-0 row footer-info">
            <p className="col-sm-12 col-md-12 col-lg-6 contacto">
                <b>Contacto página web:</b><br /> www.bienestar.bogota.unal.edu.co<br /> Unidad Camilo Torres Bloque
                B7<br />
                Calle 44 No 45-67<br /> Bogotá D.C., Colombia<br /> (+57 1) 316 5000 Ext. 10668 - 10669
            </p>
            <p className="col-sm-12 col-md-12 col-lg-6 text-lg-right derechos">
                © Copyright 2023<br /> Algunos derechos reservados.<br />
                <a title="Comuníquese con el administrador de este sitio web"
                    href="mailto:dirbie_bog@unal.edu.co">dirbie_bog@unal.edu.co</a><br />
                <a href="http://unal.edu.co/acerca-de-este-sitio-web/">Acerca de este sitio web</a><br /> Actualización:
                10/07/2023
            </p>
        </div>
        <div className="col-sm-12 col-md-2 col-lg-2 row mt-sm-3 mt-md-0 logos">
            <div className="col-sm-6 col-md-12 col-lg-6  no-padding">

                <a className="col-sm-3 col-md-12 col-lg-12" href="http://www.orgulloun.unal.edu.co">
                    <img className="lightMode" alt="Orgullo UN" src={logoOrgullo} width="78" height="21" />
                    <img className="d-none darkMode" alt="Orgullo UN" src={logoOrgulloBlack} width="94"
                        height="37" />
                </a>

                <a className="col-sm-3 col-md-12 col-lg-12 imgAgencia"
                    href="http://www.agenciadenoticias.unal.edu.co/inicio.html">
                    <img className="lightMode" alt="Agencia de noticias" src={logoAgencia} width="94"
                        height="25" />
                    <img className="d-none darkMode" alt="Agencia de noticias" src={logoAgenciaBlack}
                        width="94" height="37" />
                </a>
            </div>
            <div className="col-sm-6 col-md-12 col-lg-6  no-padding">
                <a className="col-sm-3 col-md-12 col-lg-12"
                    href="https://www.sivirtual.gov.co/memoficha-entidad/-/entidad/T0356">
                    <img alt="Trámites en línea" src={logoGobierno} width="67" height="51" />
                </a>

                <a className="col-sm-3 col-md-12 col-lg-12" href="http://www.contaduria.gov.co/">
                    <img alt="Contaduría general de la republica" src={logoContraloria} width="67"
                        height="51" />
                </a>
            </div>
        </div>
      </div>
      
      
    </footer>
  );
}

export default FooterUnal;