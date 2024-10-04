import React from 'react';
import ImageModal from "../assets/images/escudo2_unal.png";

const ModalComponent = ({ show, handleClose, titulo, bodyMessage }) => {
  const modalStyle = show ? { display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' } : { display: 'none' };

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" style={{ color: "#687D2A" }}>
                <strong>{titulo}</strong>{" "}
            </h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <img
                src={ImageModal}
                alt="Descripción de la imagen"
                className="img-fluid"
                style={{ display: 'block', margin: '0 auto', maxWidth: '20%', height: 'auto' }}
            />
            <strong style={{ fontSize: "20px" }}>{bodyMessage}</strong>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;