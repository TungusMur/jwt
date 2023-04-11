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
