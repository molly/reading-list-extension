import client from "./client";

export const signin = async (username, password) => {
  try {
    const response = await client.post(`/auth/login`, {
      username,
      password
    });
    return { user: response.data.username, error: false };
  } catch (err) {
    return { error: err?.response?.data?.message || "Something went wrong" };
  }
};

export const signout = async () => {
  try {
    await client.post("/auth/logout");
    return { error: false };
  } catch (err) {
    return { error: err?.response?.data?.message || "Something went wrong" };
  }
};

export const isLoggedIn = async () => {
  try {
    const resp = await client.post("/auth/isSignedIn", null, {
      withCredentials: true
    });
    return resp.data.isAuthenticated;
  } catch (err) {
    return false;
  }
};
