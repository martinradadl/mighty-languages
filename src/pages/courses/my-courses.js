import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoursePreview } from "./course-preview";
import { AddCourseDialog } from "./add-course-dialog";
import { useSelector, useDispatch } from "react-redux";
import courseEnrollmentActions from "../../redux/actions/course-enrollment";
import debounce from "lodash.debounce";
import { LoadingWrapper } from "../../components/loading";

export const MyCourses = () => {
  const dispatch = useDispatch();
  const { status, enrollmentsList } = useSelector(
    (state) => state.course_enrollment
  );
  const user = useSelector((state) => state.users.selectedUser);
  const navigate = useNavigate();

  const handleGetCourseEnrollments = useCallback(() => {
    dispatch(courseEnrollmentActions.getCourseEnrollments(user._id));
  }, [user, dispatch]);

  const debouncedHandleGetCourseEnrollments = debounce(
    handleGetCourseEnrollments,
    500
  );

  useEffect(() => {
    debouncedHandleGetCourseEnrollments();
  }, [handleGetCourseEnrollments]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 style={{ marginLeft: "20px" }}>Mis Cursos</h1>
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
