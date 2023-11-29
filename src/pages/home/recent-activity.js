import React, { useEffect } from "react";
import "../../styles/home/recent-activity.css";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import recentActivityActions from "../../redux/actions/recent-activity";

export const RecentActivity = () => {
  const { status, recentActivityList } = useSelector(
    (state) => state.recent_activity
  );
  const user = useSelector((state) => state.users.selectedUser);
  const dispatch = useDispatch();

  const handleGetRecentActivity = () => {
    dispatch(recentActivityActions.getRecentActivity({userId: user._id, limit: 2}));
  };

  const debouncedHandleGetRecentActivity = debounce(
    handleGetRecentActivity,
    500
  );

  useEffect(() => {
    debouncedHandleGetRecentActivity();
  }, []);

  return (
    <div className="recent-activity-container">
      <h2>Mi Actividad Reciente</h2>
      {recentActivityList ? (
        recentActivityList.map((elem, index) => {
          return (
            <div key={index} className="course-progress-container">
              <h3>{elem.course_id.title}</h3>
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
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
