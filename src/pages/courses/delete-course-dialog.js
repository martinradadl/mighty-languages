import React, { Fragment, useState } from "react";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose, AiFillDelete } from "react-icons/ai";
import "../../styles/delete-dialog.css";
import { useDispatch } from "react-redux";
import coursesActions from "../../redux/actions/courses";

export const DeleteCourseDialog = (props) => {
  const { selectedCourse } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const deleteCourse = () => {
    dispatch(coursesActions.deleteCourse(selectedCourse._id))
      .unwrap()
      .then(() => {
        closeModal();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Fragment>
      <div
        className="icon"
        onClick={(e) => {
          openModal();
          e.stopPropagation();
        }}
      >
        <AiFillDelete />
      </div>
      <Dialog className="dialog-backdrop" open={isOpen} onClose={closeModal}>
        <div className="dialog-container">
          <Dialog.Panel className="dialog">
            <AiOutlineClose
              className="close-modal-button"
              onClick={closeModal}
            />
            <div className="delete-dialog-container">
              <p>¿Deseas eliminar este curso?</p>
              <div style={{ display: "flex" }}>
                <button
                  className="delete-button-submit"
                  id="yes-button"
                  onClick={deleteCourse}
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
