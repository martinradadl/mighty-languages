import React, { useState } from "react";
import "../../styles/authentication.css";
import { useDispatch } from "react-redux";
import usersActions from "../../redux/actions/users";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const loginFormInitialState = {
  email: "",
  password: "",
};

export const LoginForm = (props) => {
  const { closeModal } = props;
  const [loginForm, setLoginForm] = useState(loginFormInitialState);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = () => {
    if (loginForm.email === "" || loginForm.password === "") {
      Toastify({
        text: "Faltan campos por llenar",
        duration: 3000,
      }).showToast();
    } else {
      dispatch(
        usersActions.login({
          email: loginForm.email,
          password: loginForm.password,
        })
      )
        .unwrap()
        .then(() => {
          setLoginForm(loginFormInitialState);
          closeModal();
        })
        .catch((e) => {
          Toastify({
            text: e.error,
            duration: 3000,
          }).showToast();
        });
    }
  };

  return (
    <div className="auth-dialog-content">
      <p className="auth-form-item">
        <b>EMAIL</b>
      </p>
      <input
        className="auth-form-input"
        placeholder="nombre@email.com"
        onChange={handleChange}
        name="email"
        value={loginForm.email}
      />
      <p className="auth-form-item">
        <b>CONTRASEÑA</b>
      </p>
      <input
        className="auth-form-input"
        type="password"
        placeholder="Ingresa tu contraseña"
        onChange={handleChange}
        name="password"
        value={loginForm.password}
      />
      <p id="forgot-password">¿Olvidaste tu contraseña?</p>
      <button id="auth-submit-button" onClick={handleLogin}>
        <b>Iniciar Sesión</b>
      </button>
    </div>
  );
};
