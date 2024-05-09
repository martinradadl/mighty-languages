import React, { Fragment, useState } from "react";
import { Dialog } from "@headlessui/react";
import "../../styles/profile/profile-dialog.css";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import usersActions from "../../redux/actions/users";
import courseEnrollmentActions from "../../redux/actions/course-enrollment";

export const ProfileDialog = (props) => {
  const { user } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleLogout = () => {
    dispatch(usersActions.logout());
    dispatch(courseEnrollmentActions.clearEnrollmentList());
  };

  return (
    <Fragment>
      <button type="button" id="view-profile-button" onClick={openModal}>
        <b>Ver Perfil</b>
      </button>
      <Dialog className="dialog-backdrop" open={isOpen} onClose={closeModal}>
        <div className="dialog-container">
          <Dialog.Panel className="dialog">
            <AiOutlineClose
              className="close-modal-button"
              onClick={closeModal}
            />
            <div
              className="profile-img"
              style={{
                height: "80px",
                width: "80px",
                borderRadius: "50%",
                backgroundColor: getComputedStyle(
                  document.body
                ).getPropertyValue("--dark-blue"),
                margin: "auto",
              }}
            />
            <p className="profile-item">
              <b>Nombre:</b> {user.name}
            </p>
            <p className="profile-item">
              <b>Email:</b> {user.email}
            </p>
            <button id="auth-submit-button" onClick={handleLogout}>
              <b>Cerrar Sesión</b>
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Fragment>
  );
};
