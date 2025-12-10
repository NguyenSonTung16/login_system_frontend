import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Để gửi/nhận cookie
});

// Lưu Access Token trong RAM
let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

// 1. Request Interceptor: Gắn token vào header
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Hàm Refresh Token (giữ nguyên logic của bạn)
export const refreshTokenFn = async () => {
  try {
    const res = await axios.post(
      `${baseURL}/auth/refresh`,
      {},
      { withCredentials: true }
    );
    const newAccessToken = res.data.accessToken;
    setAccessToken(newAccessToken);
    return newAccessToken;
  } catch (error) {
    setAccessToken(null);
    throw error;
  }
};

// 2. Response Interceptor: Xử lý 401 & Auto Refresh (PHẦN BỔ SUNG)
api.interceptors.response.use(
  (response) => response, // Trả về response nếu thành công
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa từng retry request này
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu đã retry để tránh lặp vô hạn

      try {
        // Gọi API lấy token mới
        const newAccessToken = await refreshTokenFn();

        // Cập nhật token vào header của request cũ
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        
        // Gọi lại request cũ với token mới
        return api(originalRequest);
      } catch (refreshError) {
        // Nếu refresh cũng thất bại (hết hạn 7 ngày hoặc lỗi mạng) -> Logout
        setAccessToken(null);
        window.location.href = '/login'; // Redirect cứng về trang login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;