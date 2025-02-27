import client from "./client";

export const addEntry = async (type, entry) => {
  try {
    if (type === "book") {
      await client.post("/feed/book", entry, { withCredentials: true });
    } else if (type === "bookUpdate") {
      await client.post("/field/bookUpdate", entry, { withCredentials: true });
    } else {
      await client.post("/entry", { type, entry }, { withCredentials: true });
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

export const lookupBook = async ({ title, author }) => {
  try {
    const { data } = await client.get("/feed/book", {
      params: { title, author },
      withCredentials: true
    });
    return { error: false, data };
  } catch (err) {
    return {
      error: {
        message: err.response?.data?.message,
        status: err.response?.status
      }
    };
  }
};
