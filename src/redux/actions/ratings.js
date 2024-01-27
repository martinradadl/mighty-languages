import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addRating = createAsyncThunk(
  "ratings/add",
  async (newRating) => {
    try {
      await axios.post(`http://localhost:3001/ratings`, newRating);
      const courseId = newRating.courseId;
      return { courseId, rating: newRating.rating };
    } catch (error) {
      return error.message;
    }
  }
);

const editRating = createAsyncThunk(
  "ratings/edit",
  async ({ userId, courseId, rating }) => {
    try {
      await axios.put(
        `http://localhost:3001/ratings?user_id=${userId}&course_id=${courseId}`,
        { rating }
      );
      return { courseId, rating };
    } catch (error) {
      return error.message;
    }
  }
);

const deleteRating = createAsyncThunk(
  "ratings/delete",
  async ({ userId, courseId }) => {
    try {
      await axios.delete(
        `http://localhost:3001/ratings?user_id=${userId}&course_id=${courseId}`
      );
      return { courseId };
    } catch (error) {
      return error.message;
    }
  }
);

const ratingsActions = { addRating, deleteRating, editRating };
export default ratingsActions;
