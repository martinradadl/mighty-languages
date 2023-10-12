import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addRating = createAsyncThunk(
  "ratings/addRating",
  async (newRating) => {
    try {
      await axios.post(`http://localhost:3001/ratings`, newRating);
      const courseId = newRating.course_id;
      return { courseId, rating: newRating.rating };
    } catch (error) {
      return error.message;
    }
  }
);
// TODO
const editRating = createAsyncThunk(
  "ratings/editRating",
  async ({ userId, courseId, rating }) => {
    try {
      await axios.put(
        `http://localhost:3001/ratings?userId=${userId}&courseId=${courseId}`,
        { rating }
      );
      return { courseId, rating };
    } catch (error) {
      return error.message;
    }
  }
);

const deleteRating = createAsyncThunk(
  "ratings/deleteRating",
  async ({ userId, courseId }) => {
    try {
      await axios.delete(
        `http://localhost:3001/ratings?userId=${userId}&courseId=${courseId}`
      );
      return { courseId };
    } catch (error) {
      return error.message;
    }
  }
);

const ratingsActions = { addRating, deleteRating, editRating };
export default ratingsActions;
