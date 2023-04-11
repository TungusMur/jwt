import axios from "axios";

export const axiosPrivate = axios.create({
  baseURL: "https://internship-front.framework.team",
  withCredentials: true,
});

export const refreshToken = () =>
  axiosPrivate.post("auth/refresh", {
    fingerprint: "fingerprint",
    refreshToken: localStorage.refreshToken,
  });
export const registration = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) =>
  axiosPrivate.post("auth/register", {
    username,
    password,
    fingerprint: "fingerprint",
  });
export const authorization = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) =>
  axiosPrivate.post("auth/login", {
    username,
    password,
    fingerprint: "fingerprint",
  });

axiosPrivate.interceptors.request.use(
  async (config) => {
    const newConfig = { ...config };
    const accessToken =
      localStorage.accessToken &&
      JSON.parse(window.atob(localStorage.accessToken.split(".")[1]));
    if (accessToken && accessToken.exp < Date.now() / 1000) {
      try {
        const { data } = await refreshToken();
        [localStorage.accessToken, localStorage.refreshToken] = [
          data.accessToken,
          data.refreshToken,
        ];
        newConfig.headers.Authorization = `Bearer ${localStorage.refreshToken}`;
      } catch (error) {
        throw error;
      }
    }

    return newConfig;
  },
  null,
  {
    runWhen: (config) =>
      !["auth/refresh", "auth/login", "auth/register"].includes(
        config.url as string
      ),
  }
);
