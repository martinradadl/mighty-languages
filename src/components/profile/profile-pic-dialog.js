import React, { Fragment, useState } from "react";
import { Dialog } from "@headlessui/react";
import "../../styles/profile/profile-dialog.css";
import { AiOutlineClose, AiFillEdit, AiOutlineUpload } from "react-icons/ai";
import { useDispatch } from "react-redux";
import usersActions from "../../redux/actions/users";
import courseEnrollmentActions from "../../redux/actions/course-enrollment";

export const ProfilePicDialog = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <Fragment>
      <div style={{ position: "relative" }}>
        <div
          className="profile-img"
          style={{
            height: "100px",
            width: "100px",
            borderRadius: "50%",
            backgroundColor: getComputedStyle(document.body).getPropertyValue(
              "--dark-blue"
            ),
            margin: "auto",
          }}
        >
          {/* <img
            for="photo-upload"
            //   src={src}
          /> */}
        </div>
        <div className="edit-profile-photo-icon" onClick={openModal}>
          <AiFillEdit size={32} />
        </div>
      </div>

      <Dialog className="dialog-backdrop" open={isOpen} onClose={closeModal}>
        <div className="dialog-container">
          <Dialog.Panel className="dialog">
            <AiOutlineClose
              className="close-modal-button"
              onClick={closeModal}
            />

            <label
              htmlFor="photo-upload"
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                cursor: "pointer",
              }}
            >
              <div className="upload-photo-container">
                <AiOutlineUpload size={60} />
                <h4>Sube o arrastra una imagen aquí</h4>
              </div>
            </label>
            <input
              id="photo-upload"
              type="file"
              style={{ display: "none" }}
              // onChange={onChange}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </Fragment>
  );
};
