import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const changeIsUserEnrolled = createAction("courses/changeIsUserEnrolled");

const getCourses = createAsyncThunk(
  "courses/getCourses",
  async ({ loggedUser, title }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/courses?user=${loggedUser}&title=${title}`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const getCourse = createAsyncThunk(
  "courses/getCourse",
  async ({ id, loggedUser }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/courses/${id}?user=${loggedUser}`
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
  async ({ updatedCourse, loggedUser }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/courses/${updatedCourse._id}?user=${loggedUser}`,
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
  changeIsUserEnrolled,
};
export default coursesActions;
