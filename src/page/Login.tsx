import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { api, setAccessToken } from '../lib/axios';

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(1, 'Mật khẩu là bắt buộc'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  // Sử dụng React Query để gọi API
  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      // Gọi tới endpoint Login mà bạn đã test trên Postman
      const response = await api.post('/auth/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      // 1. Lưu Access Token server trả về vào RAM
      setAccessToken(data.accessToken);

      // 2. Thông báo & Chuyển hướng
      alert('Đăng nhập thành công!');
      navigate('/dashboard');
    },
    onError: (error: any) => {
      console.error(error);
      const msg = error.response?.data?.message || 'Đăng nhập thất bại';
      alert(Array.isArray(msg) ? msg[0] : msg);
    },
  });

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Đăng Nhập</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="email@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              type="password"
              {...register('password')}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 transition"
          >
            {loginMutation.isPending ? 'Đang xử lý...' : 'Đăng Nhập'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Chưa có tài khoản? <Link to="/register" className="text-blue-600 hover:underline">Đăng ký</Link>
        </p>
      </div>
    </div>
  );
}