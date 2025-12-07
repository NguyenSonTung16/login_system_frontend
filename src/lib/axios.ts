import axios from 'axios';

const baseURL = 'http://localhost:3000'; // Đảm bảo đúng port Backend

// Tạo instance axios chính
export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 1. Biến lưu Access Token trong RAM 
let accessToken: string | null = null;
// Hàm helper để set token từ bên ngoài (ví dụ: trang Login gọi vào)
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

// Hàm helper để lấy token hiện tại 
export const getAccessToken = () => accessToken;

// 2. Request Interceptor: Tự động gắn Token vào header trước khi gửi đi
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

// 3. Response Interceptor: Tự động xử lý khi Token hết hạn (Lỗi 401)
api.interceptors.response.use(
  (response) => response, // Nếu thành công thì trả về data luôn
  async (error) => {
    const originalRequest = error.config;

    // Logic: Nếu lỗi là 401 VÀ chưa từng thử lại request này
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu đã retry để tránh lặp vô tận

      try {
        console.log("Token hết hạn. Đang gọi Refresh Token...");
        
        // Gọi API Refresh (Lưu ý: dùng axios thường để tránh dính interceptor của 'api')
        const res = await axios.post(
          `${baseURL}/auth/refresh`,
          {},
          { withCredentials: true } // Gửi kèm Cookie chứa Refresh Token
        );

        // Lấy token mới từ server trả về
        const newAccessToken = res.data.accessToken;
        
        // Lưu lại vào RAM
        setAccessToken(newAccessToken);

        // Gắn token mới vào request cũ bị lỗi
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Gửi lại request cũ
        return api(originalRequest);
      } catch (refreshError) {
        // Nếu Refresh cũng lỗi (hết hạn 7 ngày hoặc bị xóa cookie) -> Logout
        console.error("Refresh token thất bại", refreshError);
        setAccessToken(null);
        window.location.href = '/login'; 
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;