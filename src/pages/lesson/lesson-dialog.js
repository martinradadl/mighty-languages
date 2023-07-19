import React, { Fragment, useContext, useState } from "react";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import "../../styles/lessons/lesson-dialog.css";

export const LessonDialog = (props) => {
  const {
    openModal,
    closeModal,
    handleChange,
    onSubmit,
    isOpen,
    lessonForm,
    dialogTrigger,
    submitButtonText,
  } = props;
  return (
    <Fragment>
      {dialogTrigger}
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
          <div className="lesson-dialog-content">
            <p className="lesson-form-item">
              <b>TÍTULO*</b>
            </p>
            <input
              className="lesson-form-input"
              onChange={handleChange}
              name="title"
              value={lessonForm.title}
            />
            <p className="lesson-form-item">
              <b>URL DE LOS VIDEOS*</b>
            </p>
            <input
              className="lesson-form-input"
              onChange={handleChange}
              name="videosURL"
              value={lessonForm.imageURL}
            />
            <button id="lesson-submit" onClick={onSubmit}>
              <b>{submitButtonText}</b>
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </Fragment>
  );
};
