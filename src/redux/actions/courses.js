import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getCourses = createAsyncThunk(
  "courses/get_courses",
  async ({ userId, title }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/courses?user_id=${userId}&title=${title}`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const getCourse = createAsyncThunk(
  "courses/get_course",
  async ({ id, userId }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/courses/${id}?user_id=${userId}`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const addCourse = createAsyncThunk("courses/add", async (newCourse) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/courses",
      newCourse
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const editCourse = createAsyncThunk(
  "courses/edit",
  async ({ updatedCourse, userId }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/courses/${updatedCourse._id}?user_id=${userId}`,
        updatedCourse
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const deleteCourse = createAsyncThunk("courses/delete", async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3001/courses/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const coursesActions = {
  getCourses,
  getCourse,
  addCourse,
  editCourse,
  deleteCourse,
};
export default coursesActions;
