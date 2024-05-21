import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getLessons = createAsyncThunk("lessons/get_lessons", async (courseId) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/courses/${courseId}/lessons`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const getLesson = createAsyncThunk("lessons/get_lesson", async (id) => {
  try {
    const response = await axios.get(`http://localhost:3001/lessons/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const addLesson = createAsyncThunk("lessons/add", async (newLesson) => {
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

const deleteLesson = createAsyncThunk("lessons/delete", async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3001/lessons/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const editLesson = createAsyncThunk(
  "lessons/edit_selected_lesson",
  async ({ updatedLesson, changeQuizActiveness }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/lessons/${updatedLesson._id}`,
        updatedLesson
      );
      return { ...response.data, changeQuizActiveness };
    } catch (error) {
      return error.message;
    }
  }
);

const changeLessonIndex = createAsyncThunk(
  "lessons/change_lesson_index",
  async ({ draggingLessonIndex, targetLessonIndex, courseId }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/lessons/change_lesson_index`,
        { draggingLessonIndex, targetLessonIndex, courseId }
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const lessonsActions = {
  getLesson,
  getLessons,
  addLesson,
  editLesson,
  deleteLesson,
  changeLessonIndex,
};
export default lessonsActions;
