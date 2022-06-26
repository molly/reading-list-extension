export const LOCAL_API_URL = "http://localhost:5002";
export const LIVE_API_URL = "TODO";

export const getApiUrl = () => {
  let apiUrl;
  if (apiUrl) {
    return apiUrl;
  }

  if (process.env.REACT_APP_API_ENV === "local") {
    apiUrl = LOCAL_API_URL;
  } else {
    apiUrl = LIVE_API_URL;
  }
  return apiUrl;
};
