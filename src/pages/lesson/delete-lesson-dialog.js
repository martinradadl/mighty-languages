import React, { Fragment } from "react";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import "../../styles/delete-dialog.css";
import { useDispatch } from "react-redux";
import lessonsActions from "../../redux/actions/lessons";

export const DeleteLessonDialog = (props) => {
  const { isOpen, setIsOpen, id } = props;
  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const deleteLesson = () => {
    dispatch(lessonsActions.deleteLesson(id));
  };

  return (
    <Fragment>
      <Dialog className="dialog-backdrop" open={isOpen} onClose={closeModal}>
        <div className="dialog-container">
          <Dialog.Panel className="dialog">
            <AiOutlineClose
              className="close-modal-button"
              onClick={closeModal}
            />
            <div className="delete-dialog-container">
              <p>¿Deseas eliminar esta lección?</p>
              <div style={{ display: "flex" }}>
                <button
                  className="delete-button-submit"
                  id="yes-button"
                  onClick={deleteLesson}
                >
                  Sí
                </button>
                <button className="delete-button-submit" onClick={closeModal}>
                  No
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Fragment>
  );
};
