import React, { useState } from "react";
import "../../styles/lessons/lesson-dialog.css";
import { useParams } from "react-router-dom";
import { LessonDialog } from "./lesson-dialog";
import { useDispatch } from "react-redux";
import lessonsActions from "../../redux/actions/lessons";

const lessonFormInitialState = {
  title: "",
  videos: [""],
};

export const AddLessonDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lessonForm, setLessonForm] = useState(lessonFormInitialState);
  const params = useParams();
  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false);
    setLessonForm(lessonFormInitialState);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (e) => {
    setLessonForm({ ...lessonForm, [e.target.name]: e.target.value });
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
      alert("Faltan campos por llenar");
    } else {
      dispatch(
        lessonsActions.addLesson({
          title: lessonForm.title,
          videos: lessonForm.videos,
          course_id: params.id,
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
    <LessonDialog
      {...{
        openModal,
        closeModal,
        handleChange,
        handleVideosChange,
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
        submitButtonText: "Agregar Lección",
        addVideo,
      }}
    />
  );
};
