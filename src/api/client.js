import { applyAuthTokenInterceptor } from "axios-jwt";
import axios from "axios";

const API_URL =
  process.env === "local"
    ? "http://localhost:5001"
    : "https://www.mollywhite.net/dynamic-api";

const authInterceptorConfig = {
  requestRefresh: async (refreshToken) => {
    const response = await axios.post(`${API_URL}/auth/refresh`, {
      refreshToken
    });
    return response.data.accessToken;
  }
};

export const axiosInstance = axios.create({ baseURL: API_URL });

applyAuthTokenInterceptor(axiosInstance, authInterceptorConfig);

export default axiosInstance;
