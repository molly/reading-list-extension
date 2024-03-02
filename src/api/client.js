import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_ENV === "local"
    ? "http://localhost:5001/dynamic-api"
    : "https://www.mollywhite.net/dynamic-api";

const axiosInstance = axios.create({ baseURL: API_URL });

export default axiosInstance;
