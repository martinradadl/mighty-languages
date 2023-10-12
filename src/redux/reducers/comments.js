import { createSlice } from "@reduxjs/toolkit";
import actions from "../actions/comments";
import feedbacksActions from "../actions/feedbacks";

const initialState = {
  commentsList: null,
  selectedComment: null,
  status: "idle",
};

const findIndex = (state, id) => {
  const foundIndex = (elem) => id === elem._id;
  return state.commentsList.findIndex(foundIndex);
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.getComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getComments.fulfilled, (state, action) => {
        state.commentsList = action.payload;
        state.status = "idle";
      })
      .addCase(actions.addComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.addComment.fulfilled, (state, action) => {
        return {
          ...state,
          commentsList: [...state.commentsList, action.payload],
          status: "idle",
        };
      })
      .addCase(actions.deleteComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.deleteComment.fulfilled, (state, action) => {
        const i = findIndex(state, action.payload._id);
        return {
          ...state,
          commentsList: [
            ...state.commentsList.slice(0, i),
            ...state.commentsList.slice(i + 1),
          ],
          status: "idle",
        };
      })
      .addCase(actions.editComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.editComment.fulfilled, (state, action) => {
        const i = findIndex(state, action.payload._id);
        return {
          ...state,
          commentsList: [
            ...state.commentsList.slice(0, i),
            action.payload,
            ...state.commentsList.slice(i + 1),
          ],
          status: "idle",
        };
      })
      .addCase(feedbacksActions.addFeedback.fulfilled, (state, action) => {
        const i = findIndex(state, action.payload.commentId);
        const updatedComment = { ...state.commentsList[i] };
        updatedComment.hasFeedback = action.payload.type;
        if (action.payload.type === "like") {
          updatedComment.likes += 1;
        } else {
          updatedComment.dislikes += 1;
        }
        return {
          ...state,
          commentsList: [
            ...state.commentsList.slice(0, i),
            updatedComment,
            ...state.commentsList.slice(i + 1),
          ],
        };
      })
      .addCase(feedbacksActions.deleteFeedback.fulfilled, (state, action) => {
        const i = findIndex(state, action.payload.commentId);
        const updatedComment = { ...state.commentsList[i] };
        updatedComment.hasFeedback = false;
        if (action.payload.type === "like") {
          updatedComment.likes -= 1;
        } else {
          updatedComment.dislikes -= 1;
        }
        return {
          ...state,
          commentsList: [
            ...state.commentsList.slice(0, i),
            updatedComment,
            ...state.commentsList.slice(i + 1),
          ],
        };
      })
      .addCase(feedbacksActions.editFeedback.fulfilled, (state, action) => {
        const i = findIndex(state, action.payload.commentId);
        const updatedComment = { ...state.commentsList[i] };
        updatedComment.hasFeedback = action.payload.type;
        if (action.payload.type === "like") {
          updatedComment.likes += 1;
          updatedComment.dislikes -= 1;
        } else {
          updatedComment.dislikes += 1;
          updatedComment.likes -= 1;
        }
        return {
          ...state,
          commentsList: [
            ...state.commentsList.slice(0, i),
            updatedComment,
            ...state.commentsList.slice(i + 1),
          ],
        };
      })
  },
});

export default commentsSlice.reducer;
