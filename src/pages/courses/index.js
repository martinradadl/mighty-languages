import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoursePreview } from "./course-preview";
import { AddCourseDialog } from "./add-course-dialog";
import { useSelector, useDispatch } from "react-redux";
import coursesActions from "../../redux/actions/courses";
import debounce from "lodash.debounce";
import { LoadingWrapper } from "../../components/loading";

export const Courses = () => {
  const dispatch = useDispatch();
  const { status, coursesList } = useSelector((state) => state.courses);
  const user = useSelector((state) => state.users.selectedUser);
  const navigate = useNavigate();

  const handleGetCourses = useCallback(() => {
    if (user !== null) {
      dispatch(coursesActions.getCourses({ userId: user._id }));
    } else {
      dispatch(coursesActions.getCourses({}));
    }
  }, [user, dispatch]);

  const debouncedHandleGetCourses = debounce(handleGetCourses, 500);

  useEffect(() => {
    debouncedHandleGetCourses();
  }, [handleGetCourses]);

  const handleChangeSearchbar = (event) => {
    dispatch(coursesActions.getCourses({ title: event.target.value }));
  };

  const debouncedHandleChangeSearchbar = debounce(handleChangeSearchbar, 500);

  return (
    <div style={{ maxWidth: "1000px", margin: "auto" }}>
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <input
          className="search-bar"
          placeholder="Buscar cursos"
          onChange={debouncedHandleChangeSearchbar}
          style={{ margin: "20px", height: "24px" }}
        />
        {user?.type === "admin" || user?.type === "instructor" ? (
          <AddCourseDialog />
        ) : null}
        <LoadingWrapper
          isLoading={status === "loading" || coursesList === null}
        >
          {coursesList?.map((course, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  navigate(`/courses/${course._id}`);
                }}
              >
                <CoursePreview course={course} showRating={true} user={user} />
              </div>
            );
          })}
        </LoadingWrapper>
      </div>
    </div>
  );
};
