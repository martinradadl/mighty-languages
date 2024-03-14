import React, { Fragment } from "react";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";

export const CourseDialog = (props) => {
  const {
    openModal,
    closeModal,
    handleChange,
    onSubmit,
    isOpen,
    courseForm,
    dialogTrigger,
    submitButtonText,
  } = props;
  return (
    <Fragment>
      {dialogTrigger}
      <Dialog className="dialog-container" open={isOpen} onClose={closeModal}>
        <Dialog.Panel className="dialog">
          <AiOutlineClose className="close-modal-button" onClick={closeModal} />
          <div className="dialog-content">
            <p className="dialog-form-item">
              <b>TÍTULO*</b>
            </p>
            <input
              className="dialog-form-input"
              onChange={handleChange}
              name="title"
              value={courseForm.title}
            />
            <p className="dialog-form-item">
              <b>URL DE LA IMAGEN</b>
            </p>
            <input
              className="dialog-form-input"
              onChange={handleChange}
              name="imageURL"
              value={courseForm.imageURL}
            />
            <p className="dialog-form-item">
              <b>DESCRIPCIÓN*</b>
            </p>
            <textarea
              rows="3"
              className="dialog-form-textarea"
              onChange={handleChange}
              name="description"
              value={courseForm.description}
            />
            <button className="dialog-form-submit" onClick={onSubmit}>
              <b>{submitButtonText}</b>
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </Fragment>
  );
};
