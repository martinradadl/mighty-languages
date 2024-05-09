import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

export const EDIT_OPERATIONS = {
  SET_CURRENT_LESSON: "SET_CURRENT_LESSON",
  ADD_FINISHED_LESSON: "ADD_FINISHED_LESSON",
  LEAVE_COURSE: "LEAVE_COURSE",
};

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

const editCourseEnrollmentOptions = {
  SET_CURRENT_LESSON: async ({ userId, courseId, lessonId }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/course_enrollment/set_current_lesson`,
        { userId, courseId, lessonId }
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  },
  ADD_FINISHED_LESSON: async ({ userId, courseId, lessonId }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/course_enrollment/add_finished_lesson`,
        { userId, courseId, lessonId }
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  },
  LEAVE_COURSE: async ({ userId, courseId }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/course_enrollment/leave_course`,
        { userId, courseId }
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  },
};

const editCourseEnrollment = createAsyncThunk(
  "course_enrollment/edit",
  async ({ userId, courseId, lessonId, operation }) => {
    try {
      return await editCourseEnrollmentOptions[operation]({
        userId,
        courseId,
        lessonId,
      });
    } catch (error) {
      return error.message;
    }
  }
);

const getCourseEnrollments = createAsyncThunk(
  "course_enrollment/get_enrollments",
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

const clearEnrollmentList = createAction(
  "course_enrollment/clear_enrollments_list"
);

const courseEnrollmentActions = {
  addCourseEnrollment,
  editCourseEnrollment,
  getCourseEnrollments,
  clearEnrollmentList,
};
export default courseEnrollmentActions;
