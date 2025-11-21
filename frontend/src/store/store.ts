import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import type { ThunkAction } from 'redux-thunk'
import type { Action } from 'redux'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = Promise<void>> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
