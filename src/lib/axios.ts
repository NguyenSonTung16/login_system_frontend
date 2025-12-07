import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Tạo instance axios chính
export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Biến lưu Access Token trong RAM 
let accessToken: string | null = null;
// Hàm helper để set token từ bên ngoài (ví dụ: trang Login gọi vào)
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

// Hàm helper để lấy token hiện tại 
export const getAccessToken = () => accessToken;

api.interceptors.request.use(
  (config) => {
    // Nếu có token trong RAM, gắn vào header
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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

export default api;