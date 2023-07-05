import React, { Fragment, useContext, useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose, AiFillDelete } from "react-icons/ai";
import "../../styles/delete-dialog.css";

export const DeleteCourseDialog = () => {
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
      <div
        onClick={(e) => {
          openModal();
          e.stopPropagation();
        }}
      >
        <AiFillDelete />
      </div>
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
          <div className="delete-dialog-container">
            <p>¿Deseas eliminar este curso?</p>
            <div style={{ display: "flex" }}>
              <button id="delete-button-submit" onClick={deleteCourse}>
                Sí
              </button>
              <button id="delete-button-submit" onClick={closeModal}>
                No
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </Fragment>
  );
};
