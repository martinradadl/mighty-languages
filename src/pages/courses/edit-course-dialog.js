import React, { Fragment, useState } from "react";
import axios from "axios";
import "../../styles/courses/course-dialog.css";
import { CourseDialog } from "./course-dialog";
import { AiFillEdit, } from "react-icons/ai";

export const EditCourseDialog = (props) => {
  const { selectedCourse } = props;
  const [isOpen, setIsOpen] = useState(false);
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
      axios
        .put(`http://localhost:3001/courses/${selectedCourse.id}`, {
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
          <div
            onClick={(e) => {
              e.stopPropagation();
              openModal();
            }}
          >
            <AiFillEdit />
          </div>
        ),
      }}
    />
  );
};
