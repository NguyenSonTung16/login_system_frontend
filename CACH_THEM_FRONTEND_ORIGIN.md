# 📝 Cách Thêm FRONTEND_ORIGIN vào Render

Hướng dẫn chi tiết cách thêm biến môi trường `FRONTEND_ORIGIN` trên Render để cấu hình CORS.

## 🎯 Mục Đích

Biến `FRONTEND_ORIGIN` cho backend biết URL frontend để cho phép các request từ frontend (CORS).

## 📋 Các Bước Thực Hiện

### Bước 1: Lấy Frontend URL

Sau khi deploy frontend lên Vercel/GitHub Pages/Netlify, bạn sẽ có URL như:
- Vercel: `https://your-project.vercel.app`
- GitHub Pages: `https://your-username.github.io/repository-name`
- Netlify: `https://your-project.netlify.app`

**Copy URL này để dùng ở bước sau.**

### Bước 2: Vào Trang Environment Variables trên Render

1. Truy cập [dashboard.render.com](https://dashboard.render.com)
2. Click vào service backend của bạn
3. Click tab **"Environment"** ở menu trên cùng
   - Hoặc vào **Settings** → tìm phần **Environment Variables**

### Bước 3: Thêm Biến FRONTEND_ORIGIN

Bạn sẽ thấy:
- Bảng hiển thị các environment variables hiện có (như `MONGO_URI`)
- Nút **"+ Add Environment Variable"** hoặc **"Add Environment Variable"**

**Thực hiện:**

1. Click nút **"+ Add Environment Variable"**
2. Điền form:
   - **KEY**: `FRONTEND_ORIGIN`
     - Viết HOA, có dấu gạch dưới
     - Chính xác: `FRONTEND_ORIGIN`
   - **VALUE**: Paste URL frontend của bạn
     - Ví dụ: `https://login-system-frontend.vercel.app`
     - **Lưu ý**: 
       - Phải có `https://`
       - Không có dấu `/` ở cuối
       - Đúng URL của frontend đã deploy
3. Click **"Save Changes"** hoặc **"Add"**

### Bước 4: Kiểm Tra

Sau khi save, bạn sẽ thấy biến `FRONTEND_ORIGIN` xuất hiện trong bảng cùng với `MONGO_URI`.

### Bước 5: Deploy Lại (Nếu Cần)

- Render có thể tự động redeploy khi bạn thay đổi environment variables
- Nếu không tự động, vào tab **"Manual Deploy"** → Click **"Deploy Latest Commit"**

## ✅ Ví Dụ

Giả sử frontend của bạn là:
```
https://login-system-frontend.vercel.app
```

Thì bạn thêm:
- **KEY**: `FRONTEND_ORIGIN`
- **VALUE**: `https://login-system-frontend.vercel.app`

## 🔍 Kiểm Tra Sau Khi Deploy

1. Vào tab **Logs** trên Render
2. Tìm dòng log khi server khởi động
3. Backend sẽ đọc `FRONTEND_ORIGIN` và cấu hình CORS

Bạn có thể test bằng cách:
- Mở frontend URL
- Thử đăng ký/đăng nhập
- Mở Developer Tools → Console
- Nếu không có lỗi CORS → thành công!

## ⚠️ Lưu Ý Quan Trọng

1. **URL phải chính xác**:
   - ✅ Đúng: `https://your-frontend.vercel.app`
   - ❌ Sai: `http://your-frontend.vercel.app` (thiếu `s`)
   - ❌ Sai: `https://your-frontend.vercel.app/` (có dấu `/` cuối)

2. **Tên biến phải đúng**:
   - ✅ Đúng: `FRONTEND_ORIGIN` (HOA, có dấu gạch dưới)
   - ❌ Sai: `FRONTEND_origin`, `frontend_origin`, `FRONTENDORIGIN`

3. **Nếu có nhiều frontend**, bạn có thể:
   - Liệt kê nhiều URL cách nhau bởi dấu phẩy: `https://frontend1.com,https://frontend2.com`
   - Hoặc dùng wildcard: `*` (không khuyên dùng cho production)

4. **Sau khi thay đổi**, nhớ deploy lại để áp dụng.

## 🆘 Troubleshooting

### Vẫn bị lỗi CORS?

1. Kiểm tra `FRONTEND_ORIGIN` đúng URL chưa
2. Đảm bảo đã deploy lại backend sau khi thêm biến
3. Kiểm tra frontend đang gọi đúng backend URL
4. Kiểm tra logs trên Render xem có lỗi không

### Muốn thay đổi giá trị?

1. Vào tab Environment
2. Tìm biến `FRONTEND_ORIGIN`
3. Click nút **"Edit"** (bên cạnh biến)
4. Sửa VALUE
5. Save và deploy lại

### Muốn xóa biến?

1. Vào tab Environment
2. Tìm biến `FRONTEND_ORIGIN`
3. Click nút **"Delete"** hoặc **"X"**
4. Confirm và deploy lại

## 📖 Thêm Thông Tin

Backend code đọc biến này từ file `src/main.ts`:
```typescript
const frontendOrigin = configService.get<string>('FRONTEND_ORIGIN') || 'http://localhost:3001';
app.enableCors({
  origin: frontendOrigin,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});
```

Nếu không có biến `FRONTEND_ORIGIN`, mặc định sẽ là `http://localhost:3001` (cho development).

