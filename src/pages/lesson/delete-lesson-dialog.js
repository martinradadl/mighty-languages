import React, { Fragment, useContext, useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose, AiFillDelete } from "react-icons/ai";
import "../../styles/delete-dialog.css";

export const DeleteLessonDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const deleteCourse = () => {};

  return (
    <Fragment>
      <div className="dialog-trigger"
        onClick={(e) => {
          openModal();
          e.stopPropagation();
        }}
      >
        Eliminar Lección
      </div>
      <Dialog className="dialog-container" open={isOpen} onClose={(e)=>{
        e.stopPropagation()
        closeModal()}}>
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
          <div className="delete-dialog-container">
            <p>¿Deseas eliminar esta lección?</p>
            <div style={{ display: "flex" }}>
              <button className="delete-button-submit" id="yes-button" onClick={deleteCourse}>
                Sí
              </button>
              <button className="delete-button-submit" onClick={closeModal}>
                No
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </Fragment>
  );
};
