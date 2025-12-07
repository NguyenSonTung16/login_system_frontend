import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '../lib/axios';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa token trong RAM
    setAccessToken(null);
    // Chuyển về login
    navigate('/login');
    // Lưu ý: Nếu muốn xóa cả Cookie, bạn cần gọi thêm API /auth/logout (nếu backend có hỗ trợ)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <h1 className="text-4xl font-bold mb-4 text-green-600">Dashboard</h1>
      <p className="mb-8 text-lg">Chào mừng bạn đã đăng nhập thành công! 🎉</p>
      
      <div className="bg-white p-6 rounded shadow-md text-left max-w-md w-full border-l-4 border-green-500">
        <p className="font-bold text-lg mb-2">Trạng thái bảo mật:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Access Token: <strong>Đang lưu trong RAM</strong> (Memory).</li>
          <li>Refresh Token: <strong>Đang lưu trong HttpOnly Cookie</strong>.</li>
          <li>Cơ chế: Access token hết hạn sẽ tự động được làm mới ngầm.</li>
        </ul>
      </div>

      <button
        onClick={handleLogout}
        className="mt-8 px-6 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600 transition"
      >
        Đăng Xuất
      </button>
    </div>
  );
}