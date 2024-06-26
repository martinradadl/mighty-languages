import { createSlice } from "@reduxjs/toolkit";
import actions from "../actions/quiz-results";

const initialState = {
  quizResults: { userAnswers: [] },
};

const quizResultsSlice = createSlice({
  name: "quiz_results",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.setUserAnswers, (state, action) => {
        return {
          ...state,
          quizResults: { ...state.quizResults, userAnswers: action.payload },
        };
      })
      .addCase(actions.getQuizResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getQuizResults.fulfilled, (state, action) => {
        state.quizResults = action.payload || { userAnswers: [] };
        state.status = "idle";
      })
      .addCase(actions.getQuizResults.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "idle";
        state.quizResults = null;
      })
      .addCase(actions.addQuizResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.addQuizResults.fulfilled, (state, action) => {
        state.quizResults = action.payload;
        state.status = "idle";
      })
      .addCase(actions.addQuizResults.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "idle";
        state.quizResults = null;
      })
      .addCase(actions.editQuizResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.editQuizResults.fulfilled, (state, action) => {
        state.quizResults = action.payload;
        state.status = "idle";
      })
      .addCase(actions.editQuizResults.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "idle";
        state.quizResults = null;
      })
      .addCase(actions.deleteQuizResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.deleteQuizResults.fulfilled, (state) => {
        state.quizResults = null;
        state.status = "idle";
      })
      .addCase(actions.deleteQuizResults.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "idle";
        state.questionsList = null;
      });
  },
});

export default quizResultsSlice.reducer;
