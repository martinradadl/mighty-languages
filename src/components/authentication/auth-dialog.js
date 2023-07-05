import React, { Fragment, useContext, useState } from "react";
import { Dialog } from "@headlessui/react";
import "../../styles/authentication.css";
import { AiOutlineClose } from "react-icons/ai";
import { AuthContext } from "../../context/auth-context";
import axios from "axios";
import { LoginForm } from "./login-dialog";
import { SignUpForm } from "./sign-up-dialog";

export const AuthDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState("login");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function swapActiveView() {
    activeView === "login" ? setActiveView("sign-up") : setActiveView("login");
  }

  return (
    <Fragment>
      <button type="button" id="login-form-button" onClick={openModal}>
        <b>Iniciar Sesión</b>
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
          <Dialog.Title className="auth-form-title">Bienvenido</Dialog.Title>
          {activeView === "login" ? (
            <LoginForm closeModal={closeModal} />
          ) : (
            <SignUpForm closeModal={closeModal} />
          )}
          <p id="swap-auth" onClick={swapActiveView}>
            {activeView === "login"
              ? "¿No tienes cuenta? Regístrate"
              : "¿Ya tienes cuenta? Inicia Sesión"}
          </p>{" "}
        </Dialog.Panel>
      </Dialog>
    </Fragment>
  );
};
