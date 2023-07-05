import React from "react";
import { AiFillYoutube } from "react-icons/ai";
import "../styles/lessons/lesson-preview.css";
import { EditLessonDialog } from "../pages/lesson/edit-lesson-dialog";

export const LessonPreview = (props) => {
  const { isCurrentLesson, item } = props;
  return (
    <div className="lesson-preview-container">
      <div className="lesson-preview">
        <AiFillYoutube id="yt-icon" />
        <p>Lesson Name</p>
        {/* <EditLessonDialog selectedLesson={item}/> */}
        {isCurrentLesson ? (
          <button id="resume-lesson-button">Continuar</button>
        ) : null}
      </div>
      <div className="lesson-preview-bg" />
    </div>
  );
};
