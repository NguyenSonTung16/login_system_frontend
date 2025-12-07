import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query'; 
import { api, setAccessToken } from '../lib/axios';

export default function Dashboard() {
  const navigate = useNavigate();

  // Lấy thông tin User từ Backend (API /user/profile bạn đã tạo ở Backend)
  const { data: user, isError, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await api.get('/user/profile');
      return res.data;
    },
    retry: 1, // Nếu lỗi thì chỉ thử lại 1 lần 
  });

  // Hàm Logout gọi API
  const logoutMutation = useMutation({
    mutationFn: async () => api.post('/auth/logout'), // Gọi API xóa cookie
    onSettled: () => {
      setAccessToken(null); // Xóa RAM
      navigate('/login');   // Chuyển trang
    },
  });

  if (isLoading) return <div className="p-8 text-center">Đang tải dữ liệu...</div>;
  if (isError) return <div className="p-8 text-red-500">Lỗi không tải được thông tin!</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <h1 className="text-4xl font-bold mb-4 text-green-600">Dashboard</h1>
      
      {/* Hiển thị thông tin User lấy từ Server */}
      <div className="bg-white p-6 rounded shadow-md text-left max-w-md w-full border-l-4 border-green-500 mb-6">
        <h2 className="text-xl font-bold mb-2">Thông tin người dùng:</h2>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>ID:</strong> {user?._id}</p>
      </div>

      <button
        onClick={() => logoutMutation.mutate()}
        className="px-6 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600 transition"
      >
        {logoutMutation.isPending ? 'Đang đăng xuất...' : 'Đăng Xuất'}
      </button>
    </div>
  );
}