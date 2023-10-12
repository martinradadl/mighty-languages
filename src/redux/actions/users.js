import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const logout = createAction("users/logout");

const setUser = createAction("users/setUser");

const register = createAsyncThunk("users/register", async (newUser) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/register",
      newUser
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const login = createAsyncThunk("users/login", async (user) => {
  try {
    const response = await axios.post("http://localhost:3001/login", user);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const usersActions = {
  register,
  login,
  logout,
  setUser,
};
export default usersActions;
