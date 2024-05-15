import { React, useState } from "react";
import "../../styles/authentication.css";
import { useDispatch } from "react-redux";
import usersActions from "../../redux/actions/users";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const signUpFormInitialState = {
  name: "",
  email: "",
  password: "",
  profilePic: "",
};

export const SignUpForm = (props) => {
  const { closeModal } = props;
  const [signUpForm, setSignUpForm] = useState(signUpFormInitialState);
  const dispatch = useDispatch();

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
      Toastify({
        text: "Faltan campos por llenar",
        duration: 3000,
      }).showToast();
    } else {
      dispatch(
        usersActions.register({
          name: signUpForm.name,
          email: signUpForm.email,
          password: signUpForm.password,
          profilePic: signUpForm.profilePic,
          type: "student",
        })
      )
        .unwrap()
        .then(() => {
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
        type="password"
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
