import { createAsyncThunk } from "@reduxjs/toolkit";
import { registration, authorization, refreshToken } from "shared/api";
import { MyError } from "shared/class";
import { checkValidToken, removeTokens } from "shared/lib";

export const registrationUser = createAsyncThunk(
  "user/registrationUser",
  async (dataUser: { username: string; password: string }) => {
    try {
      const { data } = await registration(dataUser);
      [localStorage.accessToken, localStorage.refreshToken] = [
        data.accessToken,
        data.refreshToken,
      ];
      return true;
    } catch (e: any) {
      throw new MyError(e.response.data.message);
    }
  }
);

export const authorizationUser = createAsyncThunk(
  "user/authorizationUser",
  async (dataUser: { username: string; password: string }) => {
    try {
      const { data } = await authorization(dataUser);
      [localStorage.accessToken, localStorage.refreshToken] = [
        data.accessToken,
        data.refreshToken,
      ];
      return true;
    } catch (e: any) {
      throw new MyError(e.response.data.message);
    }
  }
);

export const fetchStatusUser = createAsyncThunk(
  "user/fetchStatusUser",
  async () => {
    if (await checkValidToken("accessToken")) return true;

    if (
      await checkValidToken("refreshToken", async () => {
        const { data } = await refreshToken();
        [localStorage.accessToken, localStorage.refreshToken] = [
          data.accessToken,
          data.refreshToken,
        ];
      })
    ) {
      return true;
    }

    removeTokens();

    throw new MyError("Please, login. Token not found");
  }
);
