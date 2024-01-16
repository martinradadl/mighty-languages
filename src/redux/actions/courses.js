import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const changeUserEnrollment = createAction("courses/changeUserEnrollment");

const getCourses = createAsyncThunk(
  "courses/getCourses",
  async ({ userId, title }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/courses?userId=${userId}&title=${title}`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const getCourse = createAsyncThunk(
  "courses/getCourse",
  async ({ id, userId }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/courses/${id}?userId=${userId}`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

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
  async ({ updatedCourse, userId }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/courses/${updatedCourse._id}?userId=${userId}`,
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
  changeUserEnrollment,
};
export default coursesActions;
