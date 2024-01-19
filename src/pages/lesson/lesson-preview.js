import React, { useState } from "react";
import { AiFillYoutube } from "react-icons/ai";
import "../../styles/lessons/lesson-preview.css";
import { EditLessonDialog } from "./edit-lesson-dialog";
import { LessonPreviewDropdown } from "./lesson-preview-dropdown";
import { DeleteLessonDialog } from "./delete-lesson-dialog";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const LessonPreview = (props) => {
  const { isCurrentLesson, lesson, index, user } = props;
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="lesson-preview-container button">
      <div className="lesson-preview">
        <AiFillYoutube id="yt-icon" />
        <p>{`${index + 1}. ${lesson.title}`}</p>
        <div className="actions-container">
          {isCurrentLesson ? (
            <button
              id="resume-lesson-button"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/lessons/${lesson._id}`);
              }}
            >
              Continuar
            </button>
          ) : null}
          {user?.type === "instructor" ? (
            <div>
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
          ) : null}
        </div>
      </div>
    </div>
  );
};
