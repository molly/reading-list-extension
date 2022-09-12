import { applyAuthTokenInterceptor } from "axios-jwt";
import { setupCache, buildMemoryStorage } from "axios-cache-interceptor";
import axios from "axios";

const API_URL = "http://localhost:3000";

const authInterceptorConfig = {
  requestRefresh: async (refreshToken) => {
    const response = await axios.post(`${API_URL}/auth/refresh`, {
      refreshToken,
    });
    return response.data.accessToken;
  },
};

const cacheInterceptorConfig = {
  storage: buildMemoryStorage(),
  etag: true,
  interpretHeader: true,
};

export const axiosInstance = setupCache(
  axios.create({ baseURL: API_URL }, cacheInterceptorConfig)
);

applyAuthTokenInterceptor(axiosInstance, authInterceptorConfig);

export default axiosInstance;
