import { createSlice } from "@reduxjs/toolkit";
import {
  fetchStatusUser,
  authorizationUser,
  registrationUser,
} from "./actions";

type userState = {
  isLoadingSite: boolean;
  isAuth: boolean;
  messageError?: string;
};

const initialState: userState = { isLoadingSite: true, isAuth: false };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOutUser: () => ({ ...initialState, isLoadingSite: false }),
  },
  extraReducers: {
    [fetchStatusUser.pending.type]: (state) => {
      state.isLoadingSite = true;
    },
    [fetchStatusUser.fulfilled.type]: (state) => ({
      ...state,
      isLoadingSite: false,
      isAuth: true,
    }),
    [fetchStatusUser.rejected.type]: (state) => ({
      ...state,
      isLoadingSite: false,
      isAuth: false,
    }),

    [authorizationUser.fulfilled.type]: (state) => ({
      ...state,
      isAuth: true,
      messageError: "",
    }),
    [authorizationUser.rejected.type]: (state, { error }) => {
      state.messageError = error.message;
    },

    [registrationUser.fulfilled.type]: (state) => ({
      ...state,
      isAuth: true,
      messageError: "",
    }),
    [registrationUser.rejected.type]: (state, { error }) => {
      state.messageError = error.message;
    },
  },
});

const { actions, reducer } = userSlice;
const { logOutUser } = actions;

export { reducer, logOutUser };
