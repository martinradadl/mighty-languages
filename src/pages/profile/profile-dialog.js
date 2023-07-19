import React, { Fragment, useContext, useState } from "react";
import { Dialog } from "@headlessui/react";
import "../../styles/profile/profile-dialog.css";
import { AiOutlineClose } from "react-icons/ai";
import { AuthContext } from "../../context/auth-context";

export const ProfileDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useContext(AuthContext)

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <Fragment>
      <button type="button" id="view-profile-button" onClick={openModal}>
        <b>Ver Perfil</b>
      </button>
      <Dialog className="dialog-container" open={isOpen} onClose={closeModal}>
        <Dialog.Panel className="dialog">
          <AiOutlineClose
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              height: "20px",
              width: "20px",
            }}
          />
          <div
            className="profile-img"
            style={{
              height: "80px",
              width: "80px",
              borderRadius: "50%",
              backgroundColor: "blue",
              margin: "auto",
            }}
          />
          <p className="profile-item">
            <b>Nombre: martin420</b>
          </p>
          <p className="profile-item">
            <b>Email: martin420@gmail.com</b>
          </p>
          <button id="auth-submit-button" onClick={logout}>
            <b>Cerrar Sesión</b>
          </button>
        </Dialog.Panel>
      </Dialog>
    </Fragment>
  );
};
