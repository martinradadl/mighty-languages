import React, { Fragment, useContext, useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import "../../styles/lessons/lesson-dialog.css";
import { useParams } from "react-router-dom";
import { LessonDialog } from "./lesson-dialog";

const lessonFormInitialState = {
  title: "",
  videosURL: [],
};

export const AddLessonDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lessonForm, setLessonForm] = useState(lessonFormInitialState);
  const params = useParams();

  function closeModal() {
    setIsOpen(false);
    setLessonForm(lessonFormInitialState);
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
        .post(`http://localhost:3001/courses/${params.id}/lessons`, {
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
          <div className="add-lesson-button-container">
            <button type="button" id="add-lesson-button" onClick={openModal}>
              Agregar Lección
            </button>
          </div>
        ),
      }}
    />
  );
};
