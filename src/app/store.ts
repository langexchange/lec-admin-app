import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { settingsApi } from "../services/settingsService";
import authReducer from "../features/authSlice";
import { authApi } from "../services/authService";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(settingsApi.middleware, authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
