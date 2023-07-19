import React, { Fragment, useContext, useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import "../../styles/courses/course-dialog.css";
import { CourseDialog } from "./course-dialog";

const courseFormInitialState = {
  title: "",
  imageURL: "",
  description: "",
};

export const AddCourseDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [courseForm, setCourseForm] = useState(courseFormInitialState);

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
      axios
        .post("http://localhost:3001/courses", {
          title: courseForm.title,
          description: courseForm.description,
          lessons: [],
          rating: 0,
          imageURL: courseForm.imageURL,
        })
        .then((res) => {
          console.log(res.data);
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
          <div className="add-course-button-container">
            <button type="button" id="add-course-button" onClick={openModal}>
              Agregar Curso
            </button>
          </div>
        ),
        submitButtonText: "Agregar Curso",
      }}
    />
  );
};
