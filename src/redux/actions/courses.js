import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getCourses = createAsyncThunk(
  "courses/getCourses",
  async (loggedUser) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/courses?user=${loggedUser}`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const getCourse = createAsyncThunk("courses/getCourse", async (id) => {
  try {
    const response = await axios.get(`http://localhost:3001/courses/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const addCourse = createAsyncThunk("courses/addCourse", async (newCourse) => {
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
  "courses/editCourse",
  async (updatedCourse) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/courses/${updatedCourse._id}`,
        updatedCourse
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const deleteCourse = createAsyncThunk("courses/deleteCourse", async (id) => {
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
