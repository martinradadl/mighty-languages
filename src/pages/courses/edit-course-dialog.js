import React, { Fragment, useState } from "react";
import axios from "axios";
import "../../styles/courses/course-dialog.css";
import { CourseDialog } from "./course-dialog";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import coursesActions from "../../redux/actions/courses";

export const EditCourseDialog = (props) => {
  const { selectedCourse } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [courseForm, setCourseForm] = useState(selectedCourse);

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
      alert("Faltan campos por llenar");
    } else {
      dispatch(
        coursesActions.editCourse({
          _id: selectedCourse._id,
          title: courseForm.title,
          imageURL: courseForm.imageURL,
          description: courseForm.description,
          rating: selectedCourse.rating,
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
