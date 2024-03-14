import { createSlice } from "@reduxjs/toolkit";
import actions from "../actions/questions";

const initialState = {
  questionsList: null,
  selectedQuestion: null,
  questionTypes: null,
};
const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.getQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getQuestions.fulfilled, (state, action) => {
        state.questionsList = action.payload;
        state.status = "idle";
      })
      .addCase(actions.getQuestions.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "idle";
        state.questionsList = null;
      })
      .addCase(actions.addQuestion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.addQuestion.fulfilled, (state, action) => {
        return {
          ...state,
          questionsList: [...state.questionsList, action.payload],
          status: "idle",
        };
      })
      .addCase(actions.addQuestion.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "idle";
        state.questionsList = null;
      })
      .addCase(actions.editQuestion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.editQuestion.fulfilled, (state, action) => {
        const foundIndex = (elem) => action.payload._id === elem._id;
        const i = state.questionsList.findIndex(foundIndex);
        return {
          ...state,
          questionsList: [
            ...state.questionsList.slice(0, i),
            action.payload,
            ...state.questionsList.slice(i + 1),
          ],
          status: "idle",
        };
      })
      .addCase(actions.editQuestion.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "idle";
        state.questionsList = null;
      })
      .addCase(actions.deleteQuestion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.deleteQuestion.fulfilled, (state, action) => {
        const foundIndex = (elem) => action.payload._id === elem._id;
        const i = state.questionsList.findIndex(foundIndex);
        return {
          ...state,
          questionsList: [
            ...state.questionsList.slice(0, i),
            ...state.questionsList.slice(i + 1),
          ],
          status: "idle",
        };
      })
      .addCase(actions.deleteQuestion.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "idle";
        state.questionsList = null;
      })
      .addCase(actions.getQuestionTypes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getQuestionTypes.fulfilled, (state, action) => {
        state.questionTypes = action.payload;
        state.status = "idle";
      })
      .addCase(actions.getQuestionTypes.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "idle";
        state.questionTypes = null;
      })
  },
});

export default questionsSlice.reducer;
