import React from "react";
import "../styles/home/recent-activity.css";

export const RecentActivity = () => {
  return (
    <div className="recent-activity-container">
      <h2>Mi Actividad Reciente</h2>
      <div className="course-progress-container">
        <h3>Course Title</h3>
        <div className="course-progress-details">
          <div className="progress-label">
            <p>
              <b>Progreso:</b>{" "}
            </p>
          </div>
          <div className="progress-bar">
            <div className="current-progress" />
          </div>
          <button id="resume-button">
            <b>Continuar</b>
          </button>
        </div>
      </div>
    </div>
  );
};
