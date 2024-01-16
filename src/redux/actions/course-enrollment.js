import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addCourseEnrollment = createAsyncThunk(
  "course_enrollment/add",
  async (newCourseEnrollment) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/course_enrollment`,
        newCourseEnrollment
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const editCourseEnrollment = createAsyncThunk(
  "course_enrollment/edit",
  async ({ userId, courseId, updatedEnrollment }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/course_enrollment?userId=${userId}&courseId=${courseId}`,
        updatedEnrollment
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const getCourseEnrollments = createAsyncThunk(
  "course_enrollment/get",
  async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/course_enrollment/${userId}`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const courseEnrollmentActions = {
  addCourseEnrollment,
  editCourseEnrollment,
  getCourseEnrollments,
};
export default courseEnrollmentActions;
