import React from "react";

export const ProgressBar = (props) => {
  const { progressBarWidth, numOfFinishedLessons, numOfLessons } = props;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div
        style={{
          height: "32px",
          display: "flex",
          alignItems: "center",
          fontSize: "1rem",
        }}
      >
        <p>
          <b>Progreso:</b>{" "}
        </p>
      </div>
      <div className="progress-bar" style={{ width: `${progressBarWidth}px` }}>
        <div
          className="current-progress"
          style={{
            width: `${
              progressBarWidth * (numOfFinishedLessons / numOfLessons)
            }px`,
          }}
        />
      </div>
      <h4
        style={{ margin: "0px" }}
      >{`${numOfFinishedLessons}/${numOfLessons}`}</h4>
    </div>
  );
};
