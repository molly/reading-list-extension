import client from "./client";
import { setAuthTokens, clearAuthTokens } from "axios-jwt";

export const signin = async (username, password) => {
  try {
    const response = await client.post(`/auth/signin`, { username, password });
    setAuthTokens({
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    });
    return { user: response.data.username, error: false };
  } catch (err) {
    return { error: err?.response?.data?.message || "Something went wrong" };
  }
};

export const signout = async () => {
  try {
    await client.post("/auth/signout");
    clearAuthTokens();
    return { error: false };
  } catch (err) {
    return { error: err?.response?.data?.message || "Something went wrong" };
  }
};

export const isLoggedIn = async () => {
  try {
    await client.post("/auth/isSignedIn");
    return true;
  } catch (err) {
    return false;
  }
};
