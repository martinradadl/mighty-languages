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
      dispatch(coursesActions.getCourses({ loggedUser: user._id }));
    } else {
      dispatch(coursesActions.getCourses({}));
    }
  }, [user, dispatch]);

  const debouncedHandleGetCourses = debounce(handleGetCourses, 500);

  useEffect(() => {
    debouncedHandleGetCourses();
  }, [handleGetCourses]);


  return (
    <div className="home-container">
      {user !== null ? <RecentActivity /> : null}
      <h2>Cursos</h2>
      {status === "loading" || coursesList === null ? (
        <p>Loading...</p>
      ) : (
        coursesList.map((course, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                navigate(`/courses/${course._id}`);
              }}
            >
              <CoursePreview course={course} />
            </div>
          );
        })
      )}
    </div>
  );
};
