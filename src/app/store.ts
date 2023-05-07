import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { settingsApi } from "../services/settingsService";
import authReducer from "../features/authSlice";
import { authApi } from "../services/authService";
import { usersApi } from "../services/userService";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      settingsApi.middleware,
      authApi.middleware,
      usersApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
