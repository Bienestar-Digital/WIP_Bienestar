/* eslint-disable react/prop-types */
import React from "react";
import { Modal } from "react-bootstrap";

const CustomModal = ({
  show,
  onHide,
  titulo,
  imageModal,
  bodyMessage,
  color,
  errorModal,
  onHideReload,
  buttonLabel = "Salir",
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <strong>{titulo}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: "center" }}>
        <img
          src={imageModal}
          alt="Descripción de la imagen"
          className="img-fluid"
          style={{
            display: "block",
            margin: "0 auto",
            maxWidth: "20%",
            height: "auto",
            color: "#687D2A",
            paddingBottom: "30px",
          }}
        />
        <strong
          style={{
            fontSize: "20px",
            color,
            margin: "30px",
          }}
        >
          {bodyMessage}
        </strong>
      </Modal.Body>
      <Modal.Footer>
        {errorModal && (
          
          <button
            style={{
              backgroundColor: "#687D2A",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              width: "100%",
              height: "45px",
              fontSize: "large",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={onHideReload}
          >
            Intentar de nuevo
          </button>
        
        )

        
        }
        <button
          style={{
            backgroundColor: errorModal ? "#fff":"#687D2A",
            color: errorModal ? "#687D2A":"#fff",
            border: "none",
            padding: "10px 20px",
            width: "100%",
            height: "45px",
            fontSize: "large",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={onHide}
        >
          {buttonLabel}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
