import React, { Fragment, useContext, useState } from "react";
import { Dialog } from "@headlessui/react";
import "../../styles/authentication.css";
import { AiOutlineClose } from "react-icons/ai";
import { AuthContext } from "../../context/auth-context";
import axios from "axios";

const signUpFormInitialState = {
  name: "",
  email: "",
  password: "",
  profile_pic: "",
};

export const SignUpForm = (props) => {
  const { closeModal } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [signUpForm, setSignUpForm] = useState(signUpFormInitialState);
  const { setUser } = useContext(AuthContext);

  const handleChange = (event) => {
    setSignUpForm({
      ...signUpForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignUp = () => {
    if (
      signUpForm.email === "" ||
      signUpForm.password === "" ||
      signUpForm.name === ""
    ) {
      alert("Faltan campos por llenar");
    } else {
      axios
        .post("http://localhost:3001/register", {
          name: signUpForm.name,
          email: signUpForm.email,
          password: signUpForm.password,
          profile_pic: signUpForm.profile_pic,
        })
        .then((res) => {
          setUser(res.data);
          setSignUpForm(signUpFormInitialState);
          closeModal();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div className="auth-dialog-content">
      <p className="login-form-item">
        <b>NOMBRE</b>
      </p>
      <input
        className="auth-form-input"
        placeholder="Ingresa tu nombre"
        onChange={handleChange}
        name="name"
        value={signUpForm.name}
      />
      <p className="auth-form-item">
        <b>EMAIL</b>
      </p>
      <input
        className="auth-form-input"
        placeholder="nombre@email.com"
        onChange={handleChange}
        name="email"
        value={signUpForm.email}
      />
      <p className="auth-form-item">
        <b>CONTRASEÑA</b>
      </p>
      <input
        className="auth-form-input"
        placeholder="Crea una contraseña"
        onChange={handleChange}
        name="password"
        value={signUpForm.password}
      />
      <button id="auth-submit-button" onClick={handleSignUp}>
        <b>Crear Cuenta</b>
      </button>
    </div>
  );
};
