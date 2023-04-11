import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "shared/store";
import { fetchStatusUser } from "features/EntryForm";
import { axiosPrivate, refreshToken } from "shared/api";
import { checkValidToken, removeTokens } from "shared/lib";
import { MyError } from "shared/class";

export const useValidRefreshToken = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    dispatch(fetchStatusUser());
    const interceptor = axiosPrivate.interceptors.request.use(
      async (config) => {
        const newConfig = { ...config };

        if (await checkValidToken("accessToken")) return newConfig;

        if (
          await checkValidToken("refreshToken", async () => {
            const { data } = await refreshToken();
            [localStorage.accessToken, localStorage.refreshToken] = [
              data.accessToken,
              data.refreshToken,
            ];
          })
        ) {
          newConfig.headers.Authorization = `Bearer ${localStorage.refreshToken}`;
          return newConfig;
        }

        removeTokens();
        navigation("/");

        throw new MyError("Please, login. Token not found");
      },
      null,
      {
        runWhen: (config) =>
          !["auth/refresh", "auth/login", "auth/register"].includes(
            config.url as string
          ),
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(interceptor);
    };
  }, []);
};
