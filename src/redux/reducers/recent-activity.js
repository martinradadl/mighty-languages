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
        return {
          ...state,
          status: "idle",
        };
      })
      .addCase(actions.addRecentActivity.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "idle";
        state.recentActivityList = null;
      })
      .addCase(actions.getRecentActivity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getRecentActivity.fulfilled, (state, action) => {
        state.recentActivityList = action.payload;
        state.status = "idle";
      })
      .addCase(actions.getRecentActivity.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "idle";
        state.recentActivityList = null;
      })
      .addCase(actions.editRecentActivity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.editRecentActivity.fulfilled, (state, action) => {
        const foundIndex = (elem) => action.payload._id === elem._id;
        const i = state.recentActivityList.findIndex(foundIndex);
        return {
          ...state,
          recentActivityList: [
            ...state.recentActivityList.slice(0, i),
            action.payload,
            ...state.recentActivityList.slice(i + 1),
          ],
          status: "idle",
        };
      })
      .addCase(actions.editRecentActivity.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "idle";
        state.recentActivityList = null;
      })
      .addCase(actions.deleteRecentActivity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.deleteRecentActivity.fulfilled, (state, action) => {
        const foundIndex = (elem) => action.payload._id === elem._id;
        const i = state.recentActivityList.findIndex(foundIndex);
        return {
          ...state,
          recentActivityList: [
            ...state.recentActivityList.slice(0, i),
            ...state.recentActivityList.slice(i + 1),
          ],
          status: "idle",
        };
      })
      .addCase(actions.deleteRecentActivity.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "idle";
        state.recentActivityList = null;
      });
  },
});

export default recentActivitySlice.reducer;
