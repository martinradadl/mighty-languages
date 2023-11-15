import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const addRecentActivity = createAsyncThunk(
    "recent_activity/add",
    async (newRecentActivity) => {
      try {
        const response = await axios.post(`http://localhost:3001/recent_activity`, newRecentActivity);
        return response.data;
      } catch (error) {
        return error.message;
      }
    }
  );




const recentActivityActions = { addRecentActivity };
export default recentActivityActions;
