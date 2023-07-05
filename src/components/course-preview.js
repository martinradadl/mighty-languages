import React from "react";
import "../styles/courses/course-preview.css";
import { EditCourseDialog } from "../pages/courses/edit-course-dialog";
import { DeleteCourseDialog } from "../pages/courses/delete-course-dialog";

export const CoursePreview = (props) => {
  const { item } = props;
  return (
    <div className="course-preview-container">
      <img
        src={
          item.imageURL ||
          "https://www.worldatlas.com/r/w768-q80/upload/5c/6b/50/shutterstock-332508059.jpg"
        }
        className="course-preview-img"
      ></img>
      <div className="course-preview-details">
        <h3>{item.tittle}</h3>
        <p>
          {item.description}
          Aprende conocimientos básicos, expresiones cotidianas y frecuentes,
          así como presentarte a ti mismo.
        </p>
        <div className="admin-course-options">
          <EditCourseDialog selectedCourse={item} />
          <DeleteCourseDialog />
        </div>
      </div>
      <div className="course-rating">{item.rating}</div>
    </div>
  );
};
