import { createSlice } from "@reduxjs/toolkit";
import actions from "../actions/recent-activity";

const initialState = {
  recentActivityList: null,
  status: "idle",
  error: "",
};

const recentActivitySlice = createSlice({
  name: "recent_activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(actions.addRecentActivity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.addRecentActivity.fulfilled, (state, action) => {
        state.recentActivityList = action.payload;
        state.status = "idle";
      })
      .addCase(actions.addRecentActivity.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "idle";
        state.recentActivityList = null;
      })
  },
});

export default recentActivitySlice.reducer;
