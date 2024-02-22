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
  }, [user, dispatch]);

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
          enrollmentsList?.map((enrollment, index) => {
            const progressBarWidth = 200;
            return (
              <div key={index} className="course-progress-container">
                <h2 style={{ marginTop: "2px", marginBottom: "2px" }}>
                  {enrollment.course.title}
                </h2>
                <h4 style={{ marginTop: "2px", marginBottom: "2px" }}>
                  {enrollment.currentLesson.title}
                </h4>
                <div className="course-progress-details">
                  <div className="progress-label">
                    <p>
                      <b>Progreso:</b>{" "}
                    </p>
                  </div>
                  <div
                    className="progress-bar"
                    style={{ width: `${progressBarWidth}px` }}
                  >
                    <div
                      className="current-progress"
                      style={{
                        width: `${
                          progressBarWidth *
                          (enrollment.finishedLessonsIds.length /
                            enrollment.numberOfLessons)
                        }px`,
                      }}
                    />
                  </div>
                  <button
                    id="resume-button"
                    onClick={() => {
                      navigate(`/lessons/${enrollment.currentLesson._id}`);
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
