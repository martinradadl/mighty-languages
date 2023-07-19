import React from "react";
import { AiFillYoutube, AiOutlineEllipsis } from "react-icons/ai";
import "../../styles/lessons/lesson-preview.css";
import { EditLessonDialog } from "./edit-lesson-dialog";
import { LessonPreviewDropdown } from "./lesson-preview-dropdown";
import { useNavigate } from "react-router-dom";

export const LessonPreview = (props) => {
  const { isCurrentLesson, lesson } = props;
  const navigate = useNavigate();

  return (
    <div className="lesson-preview-container">
      <div className="lesson-preview">
        <AiFillYoutube id="yt-icon" />
        <p>{lesson.title}</p>
        <div className="actions-container">
          {isCurrentLesson ? (
            <button id="resume-lesson-button">Continuar</button>
          ) : null}
          <LessonPreviewDropdown lesson={lesson} />
          
        </div>
      </div>
    </div>
  );
};
