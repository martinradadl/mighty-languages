import { createSlice } from "@reduxjs/toolkit";
import actions from "../actions/course-enrollment";

const initialState = {
  status: "idle",
  error: "",
  enrollmentsList: null,
};

const courseEnrollmentSlice = createSlice({
  name: "course_enrollment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.addCourseEnrollment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.addCourseEnrollment.fulfilled, (state, action) => {
        const enrollmentsList = [...state.enrollmentsList];
        const foundIndex = (elem) => action.payload._id === elem._id;
        const i = enrollmentsList.findIndex(foundIndex);
        console.log(enrollmentsList);
        console.log(i);
        if (i !== -1) {
          return {
            ...state,
            enrollmentsList: [
              ...state.enrollmentsList.slice(0, i),
              action.payload,
              ...state.enrollmentsList.slice(i + 1),
            ],
            status: "idle",
          };
        } else {
          return {
            ...state,
            enrollmentsList: [...state.enrollmentsList, action.payload],
            status: "idle",
          };
        }
      })
      .addCase(actions.addCourseEnrollment.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "idle";
        state.enrollmentsList = null;
      })
      .addCase(actions.editCourseEnrollment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.editCourseEnrollment.fulfilled, (state, action) => {
        const foundIndex = (elem) => action.payload._id === elem._id;
        const i = state.enrollmentsList.findIndex(foundIndex);
        return {
          ...state,
          enrollmentsList: [
            ...state.enrollmentsList.slice(0, i),
            action.payload,
            ...state.enrollmentsList.slice(i + 1),
          ],
          status: "idle",
        };
      })
      .addCase(actions.editCourseEnrollment.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "idle";
        state.enrollmentsList = null;
      })
      .addCase(actions.getCourseEnrollments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getCourseEnrollments.fulfilled, (state, action) => {
        state.enrollmentsList = action.payload;
        state.status = "idle";
      })
      .addCase(actions.getCourseEnrollments.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "idle";
        state.enrollmentsList = null;
      });
  },
});

export default courseEnrollmentSlice.reducer;
