import { createSlice } from "@reduxjs/toolkit";
import actions from "../actions/courses";
import ratingsActions from "../actions/ratings";
import coursesActions from "../actions/courses";

const initialState = {
  coursesList: null,
  selectedCourse: null,
  status: "idle",
  error: "",
};

const findIndex = (state, id) => {
  const foundIndex = (elem) => id === elem._id;
  return state.coursesList.findIndex(foundIndex);
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.getCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getCourses.fulfilled, (state, action) => {
        state.coursesList = action.payload;
        state.status = "idle";
      })
      .addCase(actions.getCourses.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "idle";
        state.coursesList = null;
      })
      .addCase(actions.getCourse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getCourse.fulfilled, (state, action) => {
        state.selectedCourse = action.payload;
        state.status = "idle";
      })
      .addCase(actions.getCourse.rejected, (state, action) => {
        state.error = action.payload;
        state.selectedCourse = null;
        state.status = "idle";
      })
      .addCase(actions.addCourse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.addCourse.fulfilled, (state, action) => {
        return {
          ...state,
          coursesList: [...state.coursesList, action.payload],
          status: "idle",
        };
      })
      .addCase(actions.editCourse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.editCourse.fulfilled, (state, action) => {
        const foundIndex = (elem) => action.payload._id === elem._id;
        const i = state.coursesList.findIndex(foundIndex);
        return {
          ...state,
          coursesList: [
            ...state.coursesList.slice(0, i),
            action.payload,
            ...state.coursesList.slice(i + 1),
          ],
          status: "idle",
        };
      })
      .addCase(actions.deleteCourse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.deleteCourse.fulfilled, (state, action) => {
        const foundIndex = (elem) => action.payload._id === elem._id;
        const i = state.coursesList.findIndex(foundIndex);
        return {
          ...state,
          coursesList: [
            ...state.coursesList.slice(0, i),
            ...state.coursesList.slice(i + 1),
          ],
          status: "idle",
        };
      })
      .addCase(ratingsActions.addRating.fulfilled, (state, action) => {
        return {
          ...state,
          selectedCourse: {
            ...state.selectedCourse,
            hasRating: action.payload.rating,
          },
        };
      })
      .addCase(ratingsActions.deleteRating.fulfilled, (state, action) => {
        return {
          ...state,
          selectedCourse: {
            ...state.selectedCourse,
            hasRating: 0,
          },
        };
      })
      .addCase(ratingsActions.editRating.fulfilled, (state, action) => {
        return {
          ...state,
          selectedCourse: {
            ...state.selectedCourse,
            hasRating: action.payload.rating,
          },
        };
      })
      .addCase(coursesActions.changeIsUserEnrolled, (state) => {
        const updatedCourse = {
          ...state.selectedCourse,
          isUserEnrolled: !state.selectedCourse.isUserEnrolled,
        };
        return {
          ...state,
          selectedCourse: updatedCourse,
        };
      });
  },
});

export default coursesSlice.reducer;
