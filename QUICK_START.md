# ⚡ Quick Start - Deploy trong 5 Phút

Hướng dẫn nhanh để deploy project lên cloud.

## 🎯 Quy Trình Nhanh

### 1️⃣ Setup MongoDB Atlas (5 phút)
```
1. Vào mongodb.com/cloud/atlas → Đăng ký
2. Tạo cluster FREE
3. Database Access → Tạo user
4. Network Access → Thêm IP: 0.0.0.0/0
5. Connect → Copy connection string
```

### 2️⃣ Deploy Backend lên Render (5 phút)
```
1. Vào render.com → Đăng nhập GitHub
2. New + → Web Service → Chọn repo backend
3. Cấu hình:
   - Root Directory: user-registration-api
   - Build: npm install && npm run build
   - Start: npm run start:prod
4. Environment Variables:
   - MONGO_URI: [paste connection string]
   - FRONTEND_ORIGIN: [cập nhật sau]
5. Deploy → Copy URL backend
```

### 3️⃣ Deploy Frontend lên Render (5 phút)
```
1. Vào render.com → Đăng nhập GitHub
2. New + → Static Site → Chọn repo frontend
3. Cấu hình:
   - Name: login-system-frontend (hoặc tên bạn muốn)
   - Branch: main
   - Root Directory: react-project
   - Build Command: npm install && npm run build
   - Publish Directory: react-project/build
4. Environment Variable:
   - REACT_APP_API_URL: [paste backend URL]
5. Create Static Site → Copy URL frontend
```

### 4️⃣ Cập Nhật CORS (1 phút)
```
1. Vào Render → Backend service
2. Click tab "Environment" (hoặc vào Settings → Environment)
3. Click nút "+ Add Environment Variable" hoặc "Add Environment Variable"
4. Thêm biến mới:
   - KEY: FRONTEND_ORIGIN
   - VALUE: https://your-frontend.onrender.com (paste URL frontend của bạn)
   - Click "Save Changes"
5. Vào tab "Manual Deploy" → Click "Deploy Latest Commit"
   (Hoặc Render sẽ tự động redeploy khi bạn save environment variable)
```

### ✅ Xong! Test ngay
```
- Mở frontend URL
- Đăng ký user mới
- Đăng nhập
```

## 🔑 Environment Variables Cần Thiết

### Backend (Render/Railway)
```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db?retryWrites=true&w=majority
FRONTEND_ORIGIN=https://your-frontend.onrender.com
```

### Frontend (Render)
```
REACT_APP_API_URL=https://your-backend.onrender.com
```

## 🆘 Gặp Lỗi?

### CORS Error
→ Cập nhật `FRONTEND_ORIGIN` trên backend = đúng URL frontend

### Connection Failed
→ Kiểm tra MongoDB Atlas Network Access đã whitelist chưa

### 404 khi refresh
→ Đã có sẵn file `_redirects` trong public/, không cần làm gì

## 📖 Chi Tiết Đầy Đủ

Xem file `DEPLOYMENT_GUIDE.md` để có hướng dẫn chi tiết và troubleshooting.

