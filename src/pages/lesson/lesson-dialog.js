import React, { Fragment } from "react";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose, AiFillPlusSquare, AiFillDelete } from "react-icons/ai";

export const LessonDialog = (props) => {
  const {
    closeModal,
    handleChange,
    handleVideosChange,
    onSubmit,
    isOpen,
    lessonForm,
    setLessonForm,
    dialogTrigger,
    submitButtonText,
    addVideo,
  } = props;

  const handleDeleteVideo = (i) => {
    let videosCopy = [...lessonForm.videos];
    videosCopy = [...videosCopy.slice(0, i), ...videosCopy.slice(i + 1)];
    setLessonForm({ ...lessonForm, videos: videosCopy });
  };

  const isDeleteOptionDisabled = lessonForm.videos.length < 2;

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
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <input
                      key={i}
                      className="add-video-input"
                      onChange={handleVideosChange}
                      name={`videos-${i}`}
                      value={video}
                    />
                    <button
                      className={
                        isDeleteOptionDisabled
                          ? "delete-input-button click-not-allowed"
                          : "delete-input-button"
                      }
                      disabled={isDeleteOptionDisabled}
                      onClick={() => {
                        handleDeleteVideo(i);
                      }}
                    >
                      <AiFillDelete
                        className={
                          isDeleteOptionDisabled
                            ? "delete-input-icon-disabled"
                            : "delete-input-icon"
                        }
                      />
                    </button>
                  </div>
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
