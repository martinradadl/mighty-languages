import { createSlice } from "@reduxjs/toolkit";
import actions from "../actions/users";
import { Cookies } from "react-cookie";

const initialState = { usersList: null, selectedUser: null };
const cookies = new Cookies();
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.register.fulfilled, (state, action) => {
        cookies.set("user", JSON.stringify(action.payload),{path:'/'});
        state.selectedUser = action.payload;
        state.status = "idle";
      })
      .addCase(actions.login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.login.fulfilled, (state, action) => {
        cookies.set("user", JSON.stringify(action.payload),{path:'/'});
        state.selectedUser = action.payload;
        state.status = "idle";
      })
      .addCase(actions.logout, (state) => {
        cookies.remove("user",{path:'/'});
        state.selectedUser = null;
      })
      .addCase(actions.setUser, (state, action) => {
        state.selectedUser = action.payload;
      });
  },
});

export const { logout } = usersSlice.actions;

export default usersSlice.reducer;
