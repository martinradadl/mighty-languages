import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addFeedback = createAsyncThunk(
  "feedbacks/add",
  async (newFeedback) => {
    try {
      await axios.post(`http://localhost:3001/feedbacks`, newFeedback);
      const commentId = newFeedback.commentId;
      return { commentId, type: newFeedback.type };
    } catch (error) {
      return error.message;
    }
  }
);

const editFeedback = createAsyncThunk(
  "feedbacks/edit",
  async ({ userId, commentId, type }) => {
    try {
      await axios.put(
        `http://localhost:3001/feedbacks?user_id=${userId}&comment_id=${commentId}`,
        { type }
      );
      return { commentId, type };
    } catch (error) {
      return error.message;
    }
  }
);

const deleteFeedback = createAsyncThunk(
  "feedbacks/delete",
  async ({ userId, commentId, type }) => {
    try {
      await axios.delete(
        `http://localhost:3001/feedbacks?user_id=${userId}&comment_id=${commentId}`
      );
      return { commentId, type };
    } catch (error) {
      return error.message;
    }
  }
);

const feedbacksActions = { addFeedback, deleteFeedback, editFeedback };
export default feedbacksActions;
