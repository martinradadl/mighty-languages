import { createSlice } from "@reduxjs/toolkit";
import actions from "../actions/courses";
import ratingsActions from "../actions/ratings";

const initialState = {
  coursesList: null,
  selectedCourse: null,
  status: "idle",
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
      .addCase(actions.getCourse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getCourse.fulfilled, (state, action) => {
        state.selectedCourse = action.payload;
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
        const i = findIndex(state, action.payload.courseId);
        const updatedCourse = { ...state.coursesList[i] };
        updatedCourse.hasRating = action.payload.rating;
        return {
          ...state,
          coursesList: [
            ...state.coursesList.slice(0, i),
            updatedCourse,
            ...state.coursesList.slice(i + 1),
          ],
        };
      })
      .addCase(ratingsActions.deleteRating.fulfilled, (state, action) => {
        const i = findIndex(state, action.payload.courseId);
        const updatedCourse = { ...state.coursesList[i] };
        updatedCourse.hasRating = 0;
        return {
          ...state,
          coursesList: [
            ...state.coursesList.slice(0, i),
            updatedCourse,
            ...state.coursesList.slice(i + 1),
          ],
        };
      })
      .addCase(ratingsActions.editRating.fulfilled, (state, action) => {
        const i = findIndex(state, action.payload.courseId);
        const updatedCourse = { ...state.coursesList[i] };
        updatedCourse.hasRating = action.payload.rating;
        return {
          ...state,
          coursesList: [
            ...state.coursesList.slice(0, i),
            updatedCourse,
            ...state.coursesList.slice(i + 1),
          ],
        };
      });
  },
});

export default coursesSlice.reducer;