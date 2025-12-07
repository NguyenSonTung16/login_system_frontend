import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, refreshTokenFn } from '../lib/axios';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true); // Trạng thái đang check token

  useEffect(() => {
    const checkAuth = async () => {
      // 1. Nếu đã có token trong RAM -> OK
      if (getAccessToken()) {
        setIsChecking(false);
        return;
      }

      // 2. Nếu không có (ví dụ vừa F5), thử Refresh Token
      try {
        await refreshTokenFn();
        setIsChecking(false); // Thành công -> OK
      } catch (error) {
        // 3. Thất bại -> Chuyển về Login
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  if (isChecking) return <div>Đang tải thông tin xác thực...</div>;

  return <>{children}</>;
}