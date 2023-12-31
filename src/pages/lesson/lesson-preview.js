import React, { useState } from "react";
import { AiFillYoutube, AiOutlineEllipsis } from "react-icons/ai";
import "../../styles/lessons/lesson-preview.css";
import { EditLessonDialog } from "./edit-lesson-dialog";
import { LessonPreviewDropdown } from "./lesson-preview-dropdown";
import { DeleteLessonDialog } from "./delete-lesson-dialog";

export const LessonPreview = (props) => {
  const { isCurrentLesson, lesson } = props;
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <div className="lesson-preview-container">
      <div className="lesson-preview">
        <AiFillYoutube id="yt-icon" />
        <p>{lesson.title}</p>
        <div className="actions-container">
          {isCurrentLesson ? (
            <button id="resume-lesson-button">Continuar</button>
          ) : null}
          <LessonPreviewDropdown
            openEditDialog={setIsEditDialogOpen}
            openDeleteDialog={setIsDeleteDialogOpen}
          />
          <EditLessonDialog
            selectedLesson={lesson}
            isOpen={isEditDialogOpen}
            setIsOpen={setIsEditDialogOpen}
          />
          <DeleteLessonDialog
            isOpen={isDeleteDialogOpen}
            setIsOpen={setIsDeleteDialogOpen}
            id={lesson._id}
          />
        </div>
      </div>
    </div>
  );
};
