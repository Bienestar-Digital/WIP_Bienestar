import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="dark-overlay">
                    <div className="links-container">
                        <ul className="links-list">
                            <li><p className="bold-text" style={{ color: "#94B43B" }}>ATENCION AL USUARIO</p></li>
                            <li><a href="#link1">Atención En linea</a></li>
                            <li><a href="#link2">Contáctenos</a></li>
                            <li><a href="#link3">Preguntas frecuentes</a></li>
                            <li><a href="#link4">Quejas y reclamos</a></li>
                        </ul>
                        <ul className="links-list">
                            <li><p className="bold-text" style={{ color: "#94B43B" }}>ENLACES DE INTERES</p></li>
                            <li><a href="#link1">Encuesta</a></li>
                            <li><a href="#link2">Pago virtual</a></li>
                            <li><a href="#link3">Estadísticas</a></li>
                            <li><a href="#link4">Ofertas de empleo</a></li>
                        </ul>
                        <ul className="links-list">
                            <li><p className="bold-text" style={{ color: "#94B43B" }}>CONTROL INTERNO</p></li>
                            <li><a href="#link1">Calidad</a></li>
                            <li><a href="#link2">Control interno</a></li>
                            <li><a href="#link3">Talento humano</a></li>
                            <li><a href="#link4">Rendición de cuentas</a></li>
                        </ul>
                        <ul className="links-list">
                            <li><p className="bold-text" style={{ color: "#94B43B" }}>LEGAL</p></li>
                            <li><a href="#link1">Contratación</a></li>
                            <li><a href="#link2">Régimen legal</a></li>
                            <li><a href="#link3">Buzón de notidicaciones</a></li>

                        </ul>
                        <ul className="links-list">
                            <li><p className="bold-text" style={{ color: "#94B43B" }}>ENTIDADES RELACIONADAS</p></li>
                            <li><a href="#link1">Contaduría General de la Nación</a></li>
                            <li><a href="#link2">Gobíerno en Linea</a></li>
                            <li><a href="#link3">Ministerio de Educación Nacional</a></li>
                        </ul>
                    </div>
                    <hr />

                    <div className="links-container2">
                        <ul className="links-list2">
                            <li><a href="#link1">Directorio Telefonico y Electronico</a></li>
                            <li><a href="#link2">Mapa del Sitio</a></li>
                            <li><a href="#link3">Accesibilidad</a></li>
                            <li><a href="#link4">Directiorio de Redes Sociales Institucionales</a></li>
                            <li><a href="#link5"><img src="https://agenciadenoticias.unal.edu.co/typo3conf/ext/unal_skin_default/Resources/Public/images/logg_agencia.png" alt="logounal" style={{ width: "7vw", padding: "0px" }}/></a></li>
                            <li><a href="#link5"><img src="https://agenciadenoticias.unal.edu.co/typo3conf/ext/unal_skin_default/Resources/Public/images/logg_agencia.png" alt="logounal" style={{ width: "7vw", padding: "0px" }}/></a></li>
                            
                            <li><a href="#link5">#SomosUnal</a></li>
                        </ul>
                    </div>
                    <ul className="social-icons">
                        <li><h4 style={{ color: "#94B43B" }}>Redes Sociales de Nivel Nacional</h4></li>
                        <li><a href="https://www.facebook.com" target="_blank" title="Facebook"><i className="fab fa-facebook-f"></i></a></li>
                        <li><a href="https://www.twitter.com" target="_blank" title="Twitter"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="https://www.instagram.com" target="_blank" title="Instagram"><i className="fab fa-instagram"></i></a></li>
                        <li><a href="https://www.linkedin.com" target="_blank" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a></li>
                        <li><a href="https://www.youtube.com" target="_blank" title="YouTube"><i className="fab fa-youtube"></i></a></li>
                        <li><a href="https://www.tiktok.com" target="_blank" title="tiktok"><i className="fab fa-tiktok"></i></a></li>
                    </ul>


                </div> {/* Capa oscura */}

            </div>

            <div className="footer-container2">
                <div className="links-container-info">
                    <ul className="links-info">
                    <li><p className="bold-text">Universidad Nacional de Colombia</p></li>
                        <li><p>Direccion Carrera 45 No. 26-85 - Edificio Uriel Gutierrez</p></li>
                        <li><p>Bogota D.C. Colombia</p></li>
                        <li><p>Horario de Atención Lunes a Viernes 8:00am a 12:00m</p></li>
                        <li><p>y 2:00pm a 7:00pm</p></li>
                    </ul>
                    <div className="vertical-line"></div>
                    <ul className="links-info">
                    <li><p className="bold-text">Contacto Pagina Web</p></li>
                        <li><p>Teléfono (+57 1) 316 5000 ext 18340</p></li>
                        <li><p>Conmutador General: 501 316 5000 </p></li>
                        <li><p>Linea Gratuita Nacional 01 8000 912 597</p></li>
                        <li><p>Correo Conmutador _bog@unal.edu.co</p></li>
                    </ul>
                    <div className="vertical-line"></div>
                    <ul className="links-info">
                    <li><p className="bold-text">Acerca del Sitio</p></li>
                        <li><p>@Copyright 2024</p></li>
                        <li><p>Algunos Derechos Reservados</p></li>
                        <li><p>Actualizacion: 23/08/2024 </p></li>
                        
                    </ul>
                </div>
            </div>


        </footer>
    );
};

export default Footer;