import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { reducer as userReducer } from "features/EntryForm";

export const store = configureStore({
  reducer: { user: userReducer },
  middleware: (gDM) => gDM().concat(logger),
  preloadedState: {},
});

export type RooState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
