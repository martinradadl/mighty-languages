import React, { Fragment } from "react";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import "../../styles/courses/course-dialog.css";

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
          {/* <Dialog.Title className="course-form-title">Agregar / Editar Curso</Dialog.Title> */}
          <div className="course-dialog-content">
            <p className="course-form-item">
              <b>TÍTULO*</b>
            </p>
            <input
              className="course-form-input"
              onChange={handleChange}
              name="title"
              value={courseForm.title}
            />
            <p className="course-form-item">
              <b>URL DE LA IMAGEN</b>
            </p>
            <input
              className="course-form-input"
              onChange={handleChange}
              name="imageURL"
              value={courseForm.imageURL}
            />
            <p className="course-form-item">
              <b>DESCRIPCIÓN*</b>
            </p>
            <textarea
              rows="3"
              className="course-form-description"
              onChange={handleChange}
              name="description"
              value={courseForm.description}
            />
            <button id="course-submit" onClick={onSubmit}>
              <b>{submitButtonText}</b>
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </Fragment>
  );
};
