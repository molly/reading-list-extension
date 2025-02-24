import client from "./client";

export const addEntry = async (type, entry) => {
  try {
    if (type == "book") {
      await client.post("/feed/book", entry, { withCredentials: true });
    } else {
      await client.post("/entry", entry, { withCredentials: true });
    }
    return { error: false };
  } catch (err) {
    return {
      error: {
        message: err.response?.data?.message,
        status: err.response?.status
      }
    };
  }
};
