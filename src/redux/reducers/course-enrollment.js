import { createSlice } from "@reduxjs/toolkit";
import actions from "../actions/course-enrollment";

const initialState = {
  status: "idle",
  error: "",
  enrollmentsList: null,
  selectedEnrollment: null,
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
        return {
          ...state,
          enrollmentsList: [...state.enrollmentsList, action.payload],
          status: "idle",
        };
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
          enrollmentList: [
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
      })
      .addCase(actions.getCourseEnrollment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getCourseEnrollment.fulfilled, (state, action) => {
        state.selectedEnrollment = action.payload;
        state.status = "idle";
      })
      .addCase(actions.getCourseEnrollment.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "idle";
        state.selectedEnrollment = null;
      });
  },
});

export default courseEnrollmentSlice.reducer;
