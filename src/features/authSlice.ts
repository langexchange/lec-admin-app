import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface AuthState {
  id: string | null;
  token: string | null;
  firstName: string | null;
  remainName: string | null;
}

const id = localStorage.getItem("userId");
const token = localStorage.getItem("token");
const firstName = localStorage.getItem("firstName");
const remainName = localStorage.getItem("remainName");

const initialState: AuthState = {
  id: id,
  token: token,
  firstName: firstName,
  remainName: remainName,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      localStorage.setItem("id", payload.id);
      localStorage.setItem("token", payload.token);
      localStorage.setItem("firstName", payload.firstName);
      localStorage.setItem("remainName", payload.remainName);

      return { ...state, ...payload };
    },
    logout: (_state) => {
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("firstName");
      localStorage.removeItem("remainName");

      return {
        id: null,
        token: null,
        firstName: null,
        remainName: null,
      };
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUserId = (state: RootState) => state.auth.id;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCredentials = (state: RootState) => state.auth;
