import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./reducers/courses";
import lessonsReducer from "./reducers/lessons";
import commentsReducer from "./reducers/comments";
import usersReducer from "./reducers/users";
import recentActivityReducer from "./reducers/recent-activity";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    lessons: lessonsReducer,
    users: usersReducer,
    comments: commentsReducer,
    recent_activity: recentActivityReducer,
    quizzes: {},
  },
});
