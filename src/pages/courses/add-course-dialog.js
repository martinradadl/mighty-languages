import React, { useState } from "react";
import { CourseDialog } from "./course-dialog";
import { useDispatch, useSelector } from "react-redux";
import coursesActions from "../../redux/actions/courses";

const courseFormInitialState = {
  title: "",
  imageURL: "",
  description: "",
};

export const AddCourseDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [courseForm, setCourseForm] = useState(courseFormInitialState);
  const user = useSelector((state) => state.users.selectedUser);
  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false);
    setCourseForm(courseFormInitialState);
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
        coursesActions.addCourse({
          title: courseForm.title,
          imageURL: courseForm.imageURL,
          description: courseForm.description,
          rating: 0,
          instructor: user._id,
        })
      )
        .unwrap()
        .then(() => {
          closeModal();
        })
        .catch((e) => console.log(e));
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
          <div className="open-dialog-button-container">
            <button type="button" className="open-dialog-button" onClick={openModal}>
              Agregar Curso
            </button>
          </div>
        ),
        submitButtonText: "Agregar Curso",
      }}
    />
  );
};
