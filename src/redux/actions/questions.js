import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getQuestions = createAsyncThunk(
  "questions/get_questions",
  async (lessonId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/lessons/${lessonId}/questions`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const addQuestion = createAsyncThunk("questions/add", async (newQuestion) => {
  try {
    const response = await axios.post(
      `http://localhost:3001/questions`,
      newQuestion
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const editQuestion = createAsyncThunk(
  "questions/edit",
  async (updatedQuestion) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/questions/${updatedQuestion._id}`,
        updatedQuestion
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const deleteQuestion = createAsyncThunk("questions/delete", async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3001/questions/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const getQuestionTypes = createAsyncThunk(
  "questions/get_question_types",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/question_types`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const questionsActions = {
  getQuestions,
  addQuestion,
  editQuestion,
  deleteQuestion,
  getQuestionTypes
};
export default questionsActions;
