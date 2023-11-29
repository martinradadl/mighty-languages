import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addRecentActivity = createAsyncThunk(
  "recent_activity/add",
  async (newRecentActivity) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/recent_activity`,
        newRecentActivity
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const getRecentActivity = createAsyncThunk(
  "recent_activity/get",
  async ({ userId, limit }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/recent_activity/${userId}?limit=${limit}`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const editRecentActivity = createAsyncThunk(
  "recent_activity/edit",
  async ({ userId, courseId, currentLesson }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/recent_activity?userId=${userId}&courseId=${courseId}`,
        { currentLesson }
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const deleteRecentActivity = createAsyncThunk(
  "recent_activity/delete",
  async ({ userId, courseId }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/recent_activity?userId=${userId}&courseId=${courseId}`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const recentActivityActions = {
  addRecentActivity,
  editRecentActivity,
  deleteRecentActivity,
  getRecentActivity,
};
export default recentActivityActions;
