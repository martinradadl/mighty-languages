import React, { Fragment, useState } from "react";
import { Dialog } from "@headlessui/react";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import "../../../styles/delete-dialog.css";
import { useDispatch } from "react-redux";
import questionsActions from "../../../redux/actions/questions";

export const DeleteQuestionDialog = (props) => {
  const { id } = props;
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const deleteQuestion = () => {
    dispatch(questionsActions.deleteQuestion(id));
  };

  return (
    <Fragment>
      <div
        onClick={(e) => {
          openModal();
          e.stopPropagation();
        }}
        className="clickable-container"
      >
        <AiFillDelete size={20} />
      </div>
      <Dialog className="dialog-backdrop" open={isOpen} onClose={closeModal}>
        <div className="dialog-container">
          <Dialog.Panel className="dialog">
            <AiOutlineClose
              className="close-modal-button"
              onClick={closeModal}
            />
            <div className="delete-dialog-container">
              <p>¿Deseas eliminar esta pregunta?</p>
              <div style={{ display: "flex" }}>
                <button
                  className="delete-button-submit"
                  id="yes-button"
                  onClick={deleteQuestion}
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
