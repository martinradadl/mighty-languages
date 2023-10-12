import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getLessons = createAsyncThunk("lessons/getLessons", async (courseId) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/courses/${courseId}/lessons`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const getLesson = createAsyncThunk("lessons/getLesson", async (id) => {
  try {
    const response = await axios.get(`http://localhost:3001/lessons/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const addLesson = createAsyncThunk("lessons/addLesson", async (newLesson) => {
  try {
    const response = await axios.post(
      `http://localhost:3001/lessons`,
      newLesson
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const editLesson = createAsyncThunk(
  "lessons/editLesson",
  async (updatedLesson) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/lessons/${updatedLesson._id}`,
        updatedLesson
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const deleteLesson = createAsyncThunk("lessons/deleteLesson", async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3001/lessons/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const lessonsActions = {
  getLesson,
  getLessons,
  addLesson,
  editLesson,
  deleteLesson,
};
export default lessonsActions;
