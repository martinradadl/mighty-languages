import { Menu } from "@headlessui/react";
import { AiOutlineEllipsis } from "react-icons/ai";
import "../../styles/lessons/lesson-preview.css";
import React from "react";

export const LessonPreviewDropdown = (props) => {
  const { openEditDialog, openDeleteDialog } = props;
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
          <div
            className="dialog-trigger"
            onClick={(e) => {
              e.stopPropagation();
              openEditDialog(true);
            }}
          >
            Editar Lección
          </div>
        </Menu.Item>
        <Menu.Item className="lesson-preview-dropdown-item">
          <div
            className="dialog-trigger"
            onClick={(e) => {
              e.stopPropagation();
              openDeleteDialog(true);
            }}
          >
            Eliminar Lección
          </div>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};
