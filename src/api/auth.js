import client from "./client";
import { setAuthTokens, clearAuthTokens } from "axios-jwt";

export const signin = async (username, password) => {
  const response = await client.post(`/auth/signin`, { username, password });
  setAuthTokens({
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken,
  });
  return response.data.username;
};

export const signout = async () => {
  await client.post("/auth/signout");
  clearAuthTokens();
};
