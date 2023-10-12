import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getComments = createAsyncThunk(
  "comments/getComments",
  async ({ id, loggedUser }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/lessons/${id}/comments?user=${loggedUser}`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const addComment = createAsyncThunk("comments/addComment", async (comment) => {
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

const deleteComment = createAsyncThunk("comments/deleteComment", async (id) => {
  try {
    console.log(id);
    const response = await axios.delete(`http://localhost:3001/comments/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const editComment = createAsyncThunk(
  "comments/editComment",
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
