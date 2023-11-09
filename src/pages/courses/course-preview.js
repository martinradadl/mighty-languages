import React from "react";
import "../../styles/courses/course-preview.css";
import { EditCourseDialog } from "./edit-course-dialog";
import { DeleteCourseDialog } from "./delete-course-dialog";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export const CoursePreview = (props) => {
  const { course } = props;

  return (
    <div className="course-preview-container">
      <img
        src={
          course.imageURL ||
          "https://www.studyandgoabroad.com/wp-content/uploads/2019/01/langtravel.jpg"
        }
        className="course-preview-img"
      ></img>
      <div className="course-preview-details">
        <h3 style={{ fontSize: "4vw" }}>{course.title}</h3>
        <p style={{ fontSize: "3vw" }}>{course.description}</p>
        <div className="admin-course-options">
          <EditCourseDialog selectedCourse={course} />
          <DeleteCourseDialog selectedCourse={course} />
        </div>
      </div>
      <div className="right-side-course-preview">
        <h3
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5px",
            marginBottom: "5px",
            textAlign: "center",
          }}
        >
          {Math.round(course.rating * 100) / 100 || "Sin Rating"}
        </h3>
        {[1, 2, 3, 4, 5].map((star, index) => {
          return star > course.rating ? (
            <AiOutlineStar key={index} />
          ) : (
            <AiFillStar key={index} />
          );
        })}
        <div
          style={{ marginTop: "10px" }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <button type="button" id="enroll-button">
            Inscribirse
          </button>
        </div>
      </div>
    </div>
  );
};
