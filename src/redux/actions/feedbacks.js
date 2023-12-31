import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addFeedback = createAsyncThunk(
  "feedbacks/addFeedback",
  async (newFeedback) => {
    try {
      await axios.post(`http://localhost:3001/feedbacks`, newFeedback);
      const commentId = newFeedback.comment_id;
      return { commentId, type: newFeedback.type };
    } catch (error) {
      return error.message;
    }
  }
);

const editFeedback = createAsyncThunk(
  "feedbacks/editFeedback",
  async ({ userId, commentId, type }) => {
    try {
      await axios.put(
        `http://localhost:3001/feedbacks?userId=${userId}&commentId=${commentId}`,
        { type }
      );
      return { commentId, type };
    } catch (error) {
      return error.message;
    }
  }
);

const deleteFeedback = createAsyncThunk(
  "feedbacks/deleteFeedback",
  async ({ userId, commentId, type }) => {
    try {
      await axios.delete(
        `http://localhost:3001/feedbacks?userId=${userId}&commentId=${commentId}`
      );
      return { commentId, type };
    } catch (error) {
      return error.message;
    }
  }
);

const feedbacksActions = { addFeedback, deleteFeedback, editFeedback };
export default feedbacksActions;
