import React, { Fragment } from "react";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose, AiFillPlusSquare } from "react-icons/ai";
import "../../styles/lessons/lesson-dialog.css";

export const LessonDialog = (props) => {
  const {
    closeModal,
    handleChange,
    handleVideosChange,
    onSubmit,
    isOpen,
    lessonForm,
    dialogTrigger,
    submitButtonText,
    addVideo,
  } = props;
  return (
    <Fragment>
      {dialogTrigger}
      <Dialog className="dialog-backdrop" open={isOpen} onClose={closeModal}>
        <div className="dialog-container">
          <Dialog.Panel className="dialog">
            <AiOutlineClose
              className="close-modal-button"
              onClick={closeModal}
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

              {lessonForm?.videos?.map((video, i) => {
                return (
                  <input
                    key={i}
                    className="lesson-form-input"
                    onChange={handleVideosChange}
                    name={`videos-${i}`}
                    value={video}
                  />
                );
              })}

              <button id="add-video-button" onClick={addVideo}>
                <AiFillPlusSquare id="add-video-icon" />
              </button>

              <button id="lesson-submit" onClick={onSubmit}>
                <b>{submitButtonText}</b>
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Fragment>
  );
};
