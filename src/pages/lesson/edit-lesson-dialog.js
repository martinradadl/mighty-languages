import React, { useState } from "react";
import { LessonDialog } from "./lesson-dialog";
import { useDispatch } from "react-redux";
import lessonsActions from "../../redux/actions/lessons";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const EditLessonDialog = (props) => {
  const { selectedLesson, isOpen, setIsOpen } = props;
  const [lessonForm, setLessonForm] = useState(selectedLesson);
  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (event) => {
    setLessonForm({ ...lessonForm, [event.target.name]: event.target.value });
  };

  const handleVideosChange = (e) => {
    const videosCopy = [...lessonForm.videos];
    const videoIndex = e.target.name.split("-")[1];
    videosCopy[videoIndex] = e.target.value;
    setLessonForm({ ...lessonForm, videos: videosCopy });
  };

  const addVideo = () => {
    setLessonForm({ ...lessonForm, videos: [...lessonForm.videos, ""] });
  };

  const onSubmit = () => {
    if (lessonForm.title === "" || lessonForm.videos.length === 0) {
      Toastify({
        text: "Faltan campos por llenar",
        duration: 3000,
      }).showToast();
    } else {
      dispatch(
        lessonsActions.editLesson({
          _id: selectedLesson._id,
          title: lessonForm.title,
          videos: lessonForm.videos,
          course_id: selectedLesson.course_id,
        })
      )
        .unwrap()
        .then(() => {
          closeModal();
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };
  return (
    <LessonDialog
      {...{
        openModal,
        closeModal,
        handleChange,
        handleVideosChange,
        onSubmit,
        isOpen,
        lessonForm,
        setLessonForm,
        addVideo,
        submitButtonText: "Editar Lección",
      }}
    />
  );
};
