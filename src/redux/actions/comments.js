import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getComments = createAsyncThunk(
  "comments/get",
  async ({ id, userId }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/lessons/${id}/comments?user_id=${userId}`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const addComment = createAsyncThunk("comments/add", async (comment) => {
  try {
    const response = await axios.post(
      `http://localhost:3001/comments`,
      comment
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const deleteComment = createAsyncThunk("comments/delete", async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3001/comments/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const editComment = createAsyncThunk(
  "comments/edit",
  async (updatedComment) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/comments/${updatedComment._id}`,
        updatedComment
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const commentsActions = { getComments, addComment, deleteComment, editComment };
export default commentsActions;
