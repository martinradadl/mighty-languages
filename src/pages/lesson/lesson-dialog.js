import React, { Fragment } from "react";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose, AiFillPlusSquare } from "react-icons/ai";

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
            <div className="dialog-content">
              <p className="dialog-form-item">
                <b>TÍTULO*</b>
              </p>
              <input
                className="dialog-form-input"
                onChange={handleChange}
                name="title"
                value={lessonForm.title}
              />
              <p className="dialog-form-item">
                <b>URL DE LOS VIDEOS*</b>
              </p>

              {lessonForm?.videos?.map((video, i) => {
                return (
                  <input
                    key={i}
                    className="dialog-form-input"
                    onChange={handleVideosChange}
                    name={`videos-${i}`}
                    value={video}
                  />
                );
              })}

              <button className="add-input-button" onClick={addVideo}>
                <AiFillPlusSquare className="add-input-icon" />
              </button>

              <button className="dialog-form-submit" onClick={onSubmit}>
                <b>{submitButtonText}</b>
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Fragment>
  );
};
