import client from "./client";

export const addEntry = async (type, entry) => {
  try {
    await client.post("/entry", { type, entry });
    return { error: false };
  } catch (err) {
    return {
      error: {
        message: err.response?.data?.message,
        status: err.response?.status,
      },
    };
  }
};
