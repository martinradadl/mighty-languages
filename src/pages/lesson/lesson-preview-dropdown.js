import { Menu } from "@headlessui/react";
import { AiOutlineEllipsis } from "react-icons/ai";
import "../../styles/lessons/lesson-preview.css";
import React from "react";
import { EditLessonDialog } from "./edit-lesson-dialog";
import { DeleteLessonDialog } from "./delete-lesson-dialog";

export const LessonPreviewDropdown = (props) => {
  const { lesson } = props;
  return (
    <Menu as="div">
      <Menu.Button
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="lesson-preview-dropdown-button"
      >
        <AiOutlineEllipsis className="lesson-preview-dropdown-icon" />
      </Menu.Button>
      <Menu.Items className="lesson-preview-dropdown">
        <Menu.Item className="lesson-preview-dropdown-item">
          <EditLessonDialog selectedLesson={lesson} />
        </Menu.Item>
        <Menu.Item className="lesson-preview-dropdown-item">
          <DeleteLessonDialog />
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};
