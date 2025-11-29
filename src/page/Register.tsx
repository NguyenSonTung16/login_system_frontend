import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { api } from '../lib/axios';
import { Link, useNavigate } from 'react-router-dom';

// Trang đăng ký - Form validation và API integration
const registerSchema = z.object({
  email: z.string().email('Email không hợp lệ'), 
  password: z.string().min(6, 'Mật khẩu phải tối thiểu 6 ký tự'), 
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: RegisterForm) => {
      return await api.post('/user/register', data); 
    },
    onSuccess: () => {
      alert('Đăng ký thành công!');
      navigate('/login');
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || 'Đăng ký thất bại');
    },
  });

  const onSubmit = (data: RegisterForm) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Đăng Ký </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              {...register('email')}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="email@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              type="password"
              {...register('password')}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {mutation.isPending ? 'Đang xử lý...' : 'Đăng Ký'}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Đã có tài khoản? <Link to="/login" className="text-blue-600 hover:underline">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}