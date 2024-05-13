import React from "react";
import { useNavigate } from "react-router-dom";
import { CoursePreview } from "./course-preview";
import { useSelector } from "react-redux";
import { LoadingWrapper } from "../../components/loading";

export const MyCourses = () => {
  const { status, enrollmentsList } = useSelector(
    (state) => state.course_enrollment
  );
  const user = useSelector((state) => state.users.selectedUser);
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        maxWidth: "1000px",
        margin: "auto",
      }}
    >
      <h1 style={{ marginLeft: "20px", fontSize: "2rem" }}>Mis Cursos</h1>
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
