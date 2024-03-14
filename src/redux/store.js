import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./reducers/courses";
import lessonsReducer from "./reducers/lessons";
import commentsReducer from "./reducers/comments";
import usersReducer from "./reducers/users";
import courseEnrollmentReducer from "./reducers/course-enrollment";
import questionsReducer from "./reducers/questions";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    lessons: lessonsReducer,
    users: usersReducer,
    comments: commentsReducer,
    course_enrollment: courseEnrollmentReducer,
    questions: questionsReducer,
  },
});
