import React from 'react';

const ModalComponent = ({ show, handleClose, titulo, imagen, bodyMessage }) => {
  const modalStyle = show ? { display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 10051 } : { display: 'none' };

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" style={{ color: "#687D2A" }}>
                <strong>{titulo}</strong>{" "}
            </h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <img
                src={imagen}
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