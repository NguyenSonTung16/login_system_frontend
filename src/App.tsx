import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Register from './page/Register';
import Login from './page/Login';
import Dashboard from './page/Dashboard'; // 👈 Import Dashboard

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* 👈 Thêm Route này */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;