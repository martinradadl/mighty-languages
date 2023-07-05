import React, { Fragment, useState } from "react";
import axios from "axios";
import "../../styles/lessons/lesson-dialog.css";
import { AiFillEdit } from "react-icons/ai";
import { LessonDialog } from "./lesson-dialog";

export const EditLessonDialog = (props) => {
  const { selectedLesson } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [lessonForm, setLessonForm] = useState(selectedLesson);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (event) => {
    setLessonForm({ ...lessonForm, [event.target.name]: event.target.value });
  };

  const onSubmit = () => {
    if (lessonForm.title === "" || lessonForm.videosURL.length === 0) {
      alert("Faltan campos por llenar");
    } else {
      axios
        .put(`http://localhost:3001/courses/${selectedLesson.id}`, {
          title: lessonForm.title,
          description: lessonForm.videosURL,
          quiz: [],
          comments: [],
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
    <LessonDialog
      {...{
        openModal,
        closeModal,
        handleChange,
        onSubmit,
        isOpen,
        lessonForm,
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
