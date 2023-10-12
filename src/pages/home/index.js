import React, { useCallback, useEffect } from "react";
import { CoursePreview } from "../courses/course-preview";
import { RecentActivity } from "../../components/recent-activity";
import "../../styles/home/home.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import coursesActions from "../../redux/actions/courses";
import debounce from "lodash.debounce";


export const Home = () => {
  const user = useSelector((state) => state.users.selectedUser);
  const { status, coursesList } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
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
    <div className="home-container">
      {user !== null ? <RecentActivity /> : null}
      <h2>Cursos</h2>
      {coursesList.map((elem, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              navigate(`/courses/${elem._id}`);
            }}
          >
            <CoursePreview course={elem} />
          </div>
        );
      })}
    </div>
  );
};
