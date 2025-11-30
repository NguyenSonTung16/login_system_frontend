# 🚀 Hướng Dẫn Deploy Frontend lên Render.com

Hướng dẫn chi tiết deploy ứng dụng React frontend lên Render.com (Static Site).

## 📋 Chuẩn Bị

1. ✅ Code frontend đã được push lên GitHub
2. ✅ Backend đã deploy và có URL
3. ✅ Tài khoản Render.com đã tạo

## 🎯 Các Bước Deploy

### Bước 1: Tạo Static Site trên Render

1. Truy cập [dashboard.render.com](https://dashboard.render.com)
2. Click nút **"New +"** ở góc trên bên phải
3. Chọn **"Static Site"**
4. Chọn repository từ GitHub:
   - Nếu chưa kết nối GitHub, click **"Configure account"** để kết nối
   - Sau đó chọn repository `login-system-frontend` (hoặc tên repo của bạn)

### Bước 2: Cấu Hình Static Site

Điền các thông tin sau:

#### Basic Settings

- **Name**: `login-system-frontend` (hoặc tên bạn muốn)
  - Tên này sẽ xuất hiện trong URL: `https://login-system-frontend.onrender.com`
  
- **Branch**: `main` (hoặc `master` tùy repo của bạn)

- **Root Directory**: `react-project`
  - Đây là thư mục chứa `package.json` của React app

#### Build Settings

- **Build Command**: 
  ```
  npm install && npm run build
  ```
  - Lệnh này sẽ cài đặt dependencies và build ứng dụng

- **Publish Directory**: 
  ```
  react-project/build
  ```
  - Thư mục chứa file build output (sau khi chạy `npm run build`)

#### Environment Variables

Click **"Add Environment Variable"** để thêm:

- **Key**: `REACT_APP_API_URL`
- **Value**: URL backend của bạn
  - Ví dụ: `https://login-system-backend-8tbj.onrender.com`
  - **Lưu ý**: Phải có `https://`, không có dấu `/` ở cuối

#### Advanced Settings (Tùy chọn)

- **Pull Request Previews**: Bật nếu muốn preview khi có PR
- **Auto-Deploy**: Bật để tự động deploy khi push code (khuyên dùng)

### Bước 3: Tạo Static Site

1. Kiểm tra lại tất cả cấu hình
2. Click nút **"Create Static Site"**
3. Render sẽ bắt đầu build và deploy

### Bước 4: Đợi Deploy Hoàn Tất

1. Bạn sẽ thấy quá trình build đang chạy
2. Xem logs để theo dõi:
   - Install dependencies
   - Build React app
   - Upload files
3. Khi hoàn tất, bạn sẽ thấy status **"Live"**
4. Copy URL của static site (ví dụ: `https://login-system-frontend.onrender.com`)

### Bước 5: Cập Nhật CORS trên Backend

1. Vào Render Dashboard → Backend service của bạn
2. Vào tab **"Environment"**
3. Tìm hoặc thêm biến `FRONTEND_ORIGIN`
4. Set value = URL frontend vừa deploy:
   ```
   https://login-system-frontend.onrender.com
   ```
5. Save và deploy lại backend (nếu cần)

## ✅ Cấu Hình Đúng

### Tóm Tắt Cấu Hình Render Static Site

```
Name: login-system-frontend
Branch: main
Root Directory: react-project
Build Command: npm install && npm run build
Publish Directory: react-project/build

Environment Variables:
  REACT_APP_API_URL = https://your-backend.onrender.com
```

## 🔍 Kiểm Tra Sau Khi Deploy

1. ✅ Truy cập URL frontend
2. ✅ Kiểm tra website hiển thị đúng
3. ✅ Test các route: `/`, `/register`, `/login`
4. ✅ Test đăng ký user mới
5. ✅ Test đăng nhập
6. ✅ Kiểm tra Console (F12) không có lỗi
7. ✅ Kiểm tra Network tab, API calls đến backend

## 🔧 File Cấu Hình

### File `_redirects`

File `react-project/public/_redirects` đã được tạo với nội dung:
```
/*    /index.html   200
```

File này giúp React Router hoạt động đúng trên Render (tránh lỗi 404 khi refresh).

**Lưu ý**: File này phải có trong thư mục `public/` và sẽ được copy vào `build/` khi build.

## 🆘 Troubleshooting

### Trang Trắng / Không Hiển Thị Gì

**Nguyên nhân có thể:**
1. Build thất bại
2. Publish Directory sai
3. File `index.html` không tìm thấy

**Giải pháp:**
1. Kiểm tra Build Logs trên Render
2. Đảm bảo Publish Directory = `react-project/build`
3. Kiểm tra trong thư mục `build/` có file `index.html` không
4. Kiểm tra Console browser có lỗi JavaScript không

### Lỗi 404 Khi Refresh Trang

**Nguyên nhân**: React Router cần cấu hình routing

**Giải pháp:**
- Đảm bảo file `_redirects` có trong `public/` folder
- Nội dung file: `/*    /index.html   200`
- Push lại code và deploy lại

### Lỗi CORS

**Nguyên nhân**: Backend chưa cấu hình đúng `FRONTEND_ORIGIN`

**Giải pháp:**
1. Kiểm tra `FRONTEND_ORIGIN` trên backend = đúng URL frontend
2. Đảm bảo URL có `https://` và không có dấu `/` ở cuối
3. Deploy lại backend sau khi thay đổi

### Build Failed

**Nguyên nhân có thể:**
1. Dependencies lỗi
2. Build Command sai
3. Root Directory sai

**Giải pháp:**
1. Test build local trước: `npm run build`
2. Kiểm tra Build Command đúng: `npm install && npm run build`
3. Kiểm tra Root Directory = `react-project`
4. Xem Build Logs để tìm lỗi cụ thể

### Environment Variable Không Hoạt Động

**Nguyên nhân**: Build không nhận được biến môi trường

**Giải pháp:**
1. Đảm bảo tên biến bắt đầu bằng `REACT_APP_`
2. Đảm bảo đã save environment variable trước khi build
3. Rebuild lại sau khi thêm/sửa environment variable

## 💡 Tips

1. **Auto-Deploy**: Bật để tự động deploy khi push code
2. **Pull Request Previews**: Bật để test trước khi merge
3. **Custom Domain**: Render hỗ trợ custom domain (có trong Settings)
4. **HTTPS**: Render tự động cung cấp HTTPS
5. **Cache**: Render có cache cho static assets, nếu cần clear thì rebuild

## 📊 So Sánh Render vs Vercel

| Tính năng | Render Static Site | Vercel |
|-----------|-------------------|--------|
| Miễn phí | ✅ Có | ✅ Có |
| Auto-deploy | ✅ Có | ✅ Có |
| Custom Domain | ✅ Có | ✅ Có |
| HTTPS | ✅ Tự động | ✅ Tự động |
| Build Time | ~2-3 phút | ~1 phút |
| URL Format | `*.onrender.com` | `*.vercel.app` |
| Tốc độ | Tốt | Rất tốt |

Render phù hợp nếu bạn muốn:
- ✅ Deploy cả frontend và backend trên cùng platform
- ✅ Quản lý tập trung
- ✅ Miễn phí cho cả hai

## 🔗 Liên Kết Hữu Ích

- [Render Static Site Docs](https://render.com/docs/static-sites)
- [React Deployment Guide](https://cra.link/deployment)
- [React Router Deployment](https://reactrouter.com/en/main/start/overview#deployment)

## ✅ Checklist Trước Khi Deploy

- [ ] Code đã push lên GitHub
- [ ] File `_redirects` có trong `public/`
- [ ] Backend đã deploy và có URL
- [ ] Biết URL backend để set `REACT_APP_API_URL`
- [ ] Đã test build local: `npm run build`

## 🎉 Hoàn Thành!

Sau khi deploy thành công:
- ✅ Frontend URL: `https://your-frontend.onrender.com`
- ✅ Backend URL: `https://your-backend.onrender.com`
- ✅ Cả hai đều trên Render.com
- ✅ Dễ quản lý và monitor

Chúc bạn deploy thành công! 🚀

