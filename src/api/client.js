import { applyAuthTokenInterceptor } from "axios-jwt";
import axios from "axios";

const API_URL = "http://localhost:3000";

export const axiosInstance = axios.create({ baseURL: API_URL });

applyAuthTokenInterceptor(axiosInstance, {
  requestRefresh: async (refreshToken) => {
    const response = await axios.post(`${API_URL}/auth/refresh`);
    return response.data.accessToken;
  },
});

export default axiosInstance;
