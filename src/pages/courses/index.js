import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CoursePreview } from "./course-preview";
import { AddCourseDialog } from "./add-course-dialog";
import { useSelector, useDispatch } from "react-redux";
import coursesActions from "../../redux/actions/courses";
import debounce from "lodash.debounce";

export const Courses = () => {
  const dispatch = useDispatch();
  const { status, coursesList } = useSelector((state) => state.courses);
  const user = useSelector((state) => state.users.selectedUser);
  const navigate = useNavigate();

  const handleGetCourses = useCallback(() => {
    if (user !== null) {
      dispatch(coursesActions.getCourses(user._id));
    } else {
      dispatch(coursesActions.getCourses());
    }
  }, [user, dispatch]);

  const debouncedHandleGetCourses = debounce(handleGetCourses, 500);

  useEffect(() => {
    debouncedHandleGetCourses();
  }, [handleGetCourses]);

  if (status === "loading" || coursesList === null) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <input
          className="search-bar"
          placeholder="Buscar cursos"
          style={{ margin: "20px", height: "20px" }}
        />
        <AddCourseDialog />
        {coursesList.map((item, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                navigate(`/courses/${item._id}`);
              }}
            >
              <CoursePreview course={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
