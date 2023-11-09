import React, { Fragment, useState } from "react";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose, AiOutlineStar, AiFillStar } from "react-icons/ai";
import "../../styles/delete-dialog.css";
import "../../styles/courses/course.css"
import { useSelector, useDispatch } from "react-redux";
import ratingsActions from "../../redux/actions/ratings";
import debounce from "lodash.debounce";

export const RateCourseDialog = (props) => {
  const { course } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [currentRate, setCurrentRate] = useState(course.hasRating || 0);
  const user = useSelector((state) => state.users.selectedUser);
  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleUserRating = (rating) => {
    if (user !== null) {
      if (!course.hasRating && rating !== 0) {
        dispatch(
          ratingsActions.addRating({
            user_id: user._id,
            course_id: course._id,
            rating,
          })
        )
          .unwrap()
          .then(() => {
            console.log("added")
            closeModal();
          });
      } else if (rating === 0) {
        dispatch(
          ratingsActions.deleteRating({
            userId: user._id,
            courseId: course._id,
          })
        )
          .unwrap()
          .then(() => {
            console.log("deleted")
            closeModal();
          });
      } else {
        dispatch(
          ratingsActions.editRating({
            userId: user._id,
            courseId: course._id,
            rating,
          })
        )
          .unwrap()
          .then(() => {
            console.log("edited")
            closeModal();
          });
      }
    }
  };

  const debouncedhandleUserRating = debounce(handleUserRating, 1000);

  return (
    <Fragment>
      <div
        onClick={(e) => {
          openModal();
          e.stopPropagation();
        }}
      >
        <button type="button" id="rate-course-button" onClick={openModal}>
          Calificar Curso
        </button>
      </div>
      <Dialog className="dialog-backdrop" open={isOpen} onClose={closeModal}>
        <div className="dialog-container">
          <Dialog.Panel className="dialog">
            <AiOutlineClose
              className="close-modal-button"
              onClick={closeModal}
            />
            <div className="rate-dialog-container">
              <div style={{ marginTop: "10px" }}>
                {[1, 2, 3, 4, 5].map((star, index) => {
                  return star > currentRate ? (
                    <AiOutlineStar
                      size={40}
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentRate(star === currentRate ? 0 : star);
                      }}
                    />
                  ) : (
                    <AiFillStar
                      size={40}
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentRate(star === currentRate ? 0 : star);
                      }}
                    />
                  );
                })}
              </div>
              <button
                className="rate-button-submit"
                onClick={() => {
                  debouncedhandleUserRating(currentRate);
                }}
              >
                Calificar Curso
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Fragment>
  );
};
