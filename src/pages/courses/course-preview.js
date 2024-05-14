import React from "react";
import "../../styles/courses/course-preview.css";
import { EditCourseDialog } from "./edit-course-dialog";
import { DeleteCourseDialog } from "./delete-course-dialog";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export const CoursePreview = (props) => {
  const { course, showRating, user } = props;

  return (
    <div className="course-preview-container clickable-container">
      <img
        src={
          course.imageURL ||
          "https://www.studyandgoabroad.com/wp-content/uploads/2019/01/langtravel.jpg"
        }
        className="course-preview-img"
      ></img>
      <div className="course-preview-details">
        <h3 style={{ fontSize: "2rem" }}>{course.title}</h3>
        <p style={{ fontSize: "1.4rem" }}>{course.description}</p>
        {user?.type === "admin" || user?._id === course.instructor ? (
          <div className="admin-course-options">
            <EditCourseDialog selectedCourse={course} />
            <DeleteCourseDialog selectedCourse={course} />
          </div>
        ) : null}
      </div>
      {showRating === true ? (
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
          <div>
            {[1, 2, 3, 4, 5].map((star, index) => {
              return star > course.rating ? (
                <AiOutlineStar key={index} />
              ) : (
                <AiFillStar key={index} />
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};
