import { createSlice } from "@reduxjs/toolkit";
import actions from "../actions/lessons";

const initialState = {
  lessonsList: null,
  selectedLesson: null,
  status: "idle",
};

const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.getLesson.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getLesson.fulfilled, (state, action) => {
        state.selectedLesson = action.payload;
        state.status = "idle";
      })
      .addCase(actions.getLessons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getLessons.fulfilled, (state, action) => {
        state.lessonsList = action.payload;
        state.status = "idle";
      })
      .addCase(actions.addLesson.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.addLesson.fulfilled, (state, action) => {
        return {
          ...state,
          lessonsList: [...state.lessonsList, action.payload],
          status: "idle",
        };
      })
      .addCase(actions.editLesson.pending, (state, { meta }) => {
        return {
          ...state,
          status: !meta.arg.changeQuizActiveness ? "loading" : "idle",
        };
      })
      .addCase(actions.editLesson.fulfilled, (state, action) => {
        if (!action.payload.changeQuizActiveness) {
          const i = state.lessonsList.findIndex(
            (elem) => action.payload._id === elem._id
          );
          return {
            ...state,
            lessonsList: [
              ...state.lessonsList.slice(0, i),
              action.payload,
              ...state.lessonsList.slice(i + 1),
            ],
            status: "idle",
          };
        } else {
          state.selectedLesson = action.payload;
          state.status = "idle";
        }
      })
      .addCase(actions.deleteLesson.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.deleteLesson.fulfilled, (state, action) => {
        const foundIndex = (elem) => action.payload._id === elem._id;
        const i = state.lessonsList.findIndex(foundIndex);
        return {
          ...state,
          lessonsList: [
            ...state.lessonsList.slice(0, i),
            ...state.lessonsList.slice(i + 1),
          ],
          status: "idle",
        };
      });
  },
});

export default lessonsSlice.reducer;
