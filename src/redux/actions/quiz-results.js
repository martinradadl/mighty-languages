import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getQuizResults = createAsyncThunk(
  "quiz_results/get",
  async ({ lessonId, userId }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/lessons/${lessonId}/quiz_results/${userId}`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const addQuizResults = createAsyncThunk(
  "quiz_results/add",
  async (newResults) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/quiz_results`,
        newResults
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const editQuizResults = createAsyncThunk(
  "quiz_results/edit",
  async (updatedResults) => {
    try {
      const response = await axios.put(
        `http://localhost:3001//quiz_results/${updatedResults._id}`,
        updatedResults
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const deleteQuizResults = createAsyncThunk("quiz_results/delete", async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001//quiz_results/${id}`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  });

const quizResultsActions = { getQuizResults, addQuizResults, editQuizResults, deleteQuizResults };

export default quizResultsActions;
