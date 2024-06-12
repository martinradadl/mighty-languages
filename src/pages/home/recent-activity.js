import React from "react";
import "../../styles/home/recent-activity.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingWrapper } from "../../components/loading";
import { ProgressBar } from "../../components/progress-bar";

export const RecentActivity = () => {
  const user = useSelector((state) => state.users.selectedUser);
  const { status, enrollmentsList } = useSelector(
    (state) => state.course_enrollment
  );
  const navigate = useNavigate();

  return (
    <div className="recent-activity-container">
      <h2 style={{ fontSize: "2rem" }}>Mi Actividad Reciente</h2>

      <LoadingWrapper
        isLoading={status === "loading" || enrollmentsList === null}
      >
        {enrollmentsList?.length ? (
          enrollmentsList?.map((enrollment, index) => {
            return (
              <div key={index} className="course-progress-container">
                <h2
                  style={{
                    marginTop: "2px",
                    marginBottom: "6px",
                    fontSize: "1.6rem",
                  }}
                >
                  {enrollment.course.title}
                </h2>
                <h4
                  style={{
                    marginTop: "2px",
                    marginBottom: "2px",
                    fontSize: "1.2rem",
                  }}
                >
                  {enrollment.currentLesson.title}
                </h4>
                <div className="course-progress-details">
                  <ProgressBar
                    progressBarWidth={200}
                    numOfFinishedLessons={enrollment.finishedLessonsIds.length}
                    numOfLessons={enrollment.numberOfLessons}
                  />
                  <button
                    id="resume-button"
                    onClick={() => {
                      navigate(`/lessons/${enrollment.currentLesson._id}`);
                    }}
                    style={{ fontSize: "1rem" }}
                  >
                    <b>Continuar</b>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ fontSize: "1.2rem" }}>No hay actividad reciente</p>
        )}
      </LoadingWrapper>
    </div>
  );
};
