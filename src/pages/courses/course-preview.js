import React, { useState } from "react";
import "../../styles/courses/course-preview.css";
import { EditCourseDialog } from "./edit-course-dialog";
import { DeleteCourseDialog } from "./delete-course-dialog";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import ratingsActions from "../../redux/actions/ratings";

export const CoursePreview = (props) => {
  const { course } = props;
  const user = useSelector((state) => state.users.selectedUser);
  const dispatch = useDispatch();

  const handleUserRating = (rating) => {
    if (user !== null) {
      if (course.hasRating === 0) {
        dispatch(
          ratingsActions.addRating({
            user_id: user._id,
            course_id: course._id,
            rating,
          })
        );
      } else if (course.hasRating === rating) {
        dispatch(
          ratingsActions.deleteRating({
            userId: user._id,
            courseId: course._id,
          })
        );
      } else {
        dispatch(
          ratingsActions.editRating({
            userId: user._id,
            courseId: course._id,
            rating,
          })
        );
      }
    }
  };

  const debouncedhandleUserRating = debounce(handleUserRating, 1000);

  return (
    <div className="course-preview-container">
      <img
        src={
          course.imageURL ||
          "https://www.worldatlas.com/r/w768-q80/upload/5c/6b/50/shutterstock-332508059.jpg"
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
      <div className="course-rating">
        <h3
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5px",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          {course.rating || "Sin Rating"}
        </h3>
        {[1, 2, 3, 4, 5].map((star, index) => {
          return star > course.hasRating ? (
            <AiOutlineStar
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                debouncedhandleUserRating(star);
              }}
            />
          ) : (
            <AiFillStar
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                debouncedhandleUserRating(star);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
