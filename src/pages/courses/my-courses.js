import React from "react";
import { useNavigate } from "react-router-dom";
import { CoursePreview } from "./course-preview";
import { useSelector } from "react-redux";
import { LoadingWrapper } from "../../components/loading";
import "../../styles/courses/course.css";

export const MyCourses = () => {
  const { status, enrollmentsList } = useSelector(
    (state) => state.course_enrollment
  );
  const user = useSelector((state) => state.users.selectedUser);
  const navigate = useNavigate();

  return (
    <div className="my-courses-container">
      <h1 style={{ fontSize: "2rem" }}>Mis Cursos</h1>
      <LoadingWrapper
        isLoading={status === "loading" || enrollmentsList === null}
      >
        {enrollmentsList?.map((enrollment, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                navigate(`/courses/${enrollment.course._id}`);
              }}
            >
              <CoursePreview course={enrollment.course} user={user} />
            </div>
          );
        })}
      </LoadingWrapper>
    </div>
  );
};
