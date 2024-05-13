import React, { useCallback, useEffect } from "react";
import { CoursePreview } from "../courses/course-preview";
import { RecentActivity } from "./recent-activity";
import "../../styles/home/home.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import coursesActions from "../../redux/actions/courses";
import debounce from "lodash.debounce";
import { LoadingWrapper } from "../../components/loading";

export const Home = () => {
  const user = useSelector((state) => state.users.selectedUser);
  const { status, coursesList } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
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

  return (
    <div className="home-container">
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
          fontSize: "2.6rem",
        }}
      >
        Mighty Languages
      </h1>
      {user !== null ? <RecentActivity /> : null}
      <h2 style={{fontSize: "2rem"}}>Cursos</h2>
      <LoadingWrapper isLoading={status === "loading" || coursesList === null}>
        {coursesList?.map((course, index) => {
          return (
            <div
              key={index}
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
  );
};
