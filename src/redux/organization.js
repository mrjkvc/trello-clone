import { createSlice } from "@reduxjs/toolkit";
import organizationService from "../api/service/organization.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

/*export const getOrganizations = createAsyncThunk(
  "authentication/getOrganizations",
  async (userId, thunkAPI) => {
    const response = await loginService.login(credentials);
    // The value we return becomes the `fulfilled` action payload
    if (response.token != undefined) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("username", response.username);
    }
    return response;
  }
);*/

export const getBoards = createAsyncThunk(
  "organization/getBoards",
  async (userId, thunkAPI) => {
    const response = await organizationService.getBoards(userId);
    return response;
  }
);

/*export const checkOtp = createAsyncThunk(
  "authentication/otp",
  async (credentials) => {
    const response = await loginService.otp(credentials);
    // The value we return becomes the `fulfilled` action payload
    if (response.token != undefined)
      localStorage.setItem("token", response.token);
    return response;
  }
);

export const signup = createAsyncThunk(
  "authentication/signup",
  async (data) => {
    const response = await loginService.signup(data);
    // The value we return becomes the `fulfilled` action payload
    if (response == null) localStorage.setItem("token", response.token);
    return response;
  }
);
*/
export const organizationSlice = createSlice({
  name: "organization",
  initialState: {
    status: "idle",
    boards: [],
    selectedBoardId: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBoards.fulfilled, (state, action) => {
        if (action.payload.error === undefined) {
          state.boards = action.payload;
        }
        state.status = "idle";
      })
      .addCase(getBoards.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

export default organizationSlice.reducer;
