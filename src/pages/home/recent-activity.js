import React, { useCallback, useEffect } from "react";
import "../../styles/home/recent-activity.css";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import courseEnrollmentActions from "../../redux/actions/course-enrollment";
import { useNavigate } from "react-router-dom";
import { LoadingWrapper } from "../../components/loading";

export const RecentActivity = () => {
  const user = useSelector((state) => state.users.selectedUser);
  const { status, enrollmentsList } = useSelector(
    (state) => state.course_enrollment
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGetCourseEnrollments = useCallback(() => {
    dispatch(courseEnrollmentActions.getCourseEnrollments(user._id));
  },[user,dispatch]);

  const debouncedHandleGetCourseEnrollments = debounce(
    handleGetCourseEnrollments,
    500
  );

  useEffect(() => {
    if (user !== null) {
      debouncedHandleGetCourseEnrollments();
    }
  }, [user]);

  return (
    <div className="recent-activity-container">
      <h2>Mi Actividad Reciente</h2>

      <LoadingWrapper
        isLoading={status === "loading" || enrollmentsList === null}
      >
        {enrollmentsList?.length ? (
          enrollmentsList.map((enrollment, index) => {
            return (
              <div key={index} className="course-progress-container">
                <h3>{enrollment.course.title}</h3>
                <div className="course-progress-details">
                  <div className="progress-label">
                    <p>
                      <b>Progreso:</b>{" "}
                    </p>
                  </div>
                  <div className="progress-bar">
                    <div className="current-progress" />
                  </div>
                  <button
                    id="resume-button"
                    onClick={() => {
                      navigate(`/lessons/${enrollment.current_lesson}`);
                    }}
                  >
                    <b>Continuar</b>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No hay actividad reciente</p>
        )}
      </LoadingWrapper>
    </div>
  );
};
