import React, { Fragment, useState } from "react";
import axios from "axios";
import { CourseDialog } from "./course-dialog";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import coursesActions from "../../redux/actions/courses";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const EditCourseDialog = (props) => {
  const { selectedCourse } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [courseForm, setCourseForm] = useState(selectedCourse);
  const user = useSelector((state) => state.users.selectedUser);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (event) => {
    setCourseForm({ ...courseForm, [event.target.name]: event.target.value });
  };

  const onSubmit = () => {
    if (courseForm.title === "" || courseForm.description === "") {
      Toastify({
        text: "Faltan campos por llenar",
        duration: 3000,
      }).showToast();
    } else {
      dispatch(
        coursesActions.editCourse({
          updatedCourse: {
            _id: selectedCourse._id,
            title: courseForm.title,
            imageURL: courseForm.imageURL,
            description: courseForm.description,
            rating: selectedCourse.rating,
          },
          userId: user._id,
        })
      )
        .unwrap()
        .then(() => {
          closeModal();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <CourseDialog
      {...{
        openModal,
        closeModal,
        handleChange,
        onSubmit,
        isOpen,
        courseForm,
        dialogTrigger: (
          <div
            className="icon"
            onClick={(e) => {
              e.stopPropagation();
              openModal();
            }}
          >
            <AiFillEdit />
          </div>
        ),
        submitButtonText: "Editar Curso",
      }}
    />
  );
};
