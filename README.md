# 🐱 Message_Neko

Message_Neko is a full-stack real-time chat application built with **Node.js, Express, MongoDB, and React**. It supports instant messaging, image sharing, and a scalable backend architecture.

---

## 📁 Project Structure

```bash
MESSAGE_NEKO/
├── backend/
│   ├── src/
│   │   ├── configs/        # configuration (DB, Cloudinary,...)
│   │   ├── constants/      # constant values
│   │   ├── controllers/    # handle request/response
│   │   ├── middlewares/    # express middlewares
│   │   ├── models/         # mongoose schemas
│   │   ├── routes/         # API routes
│   │   ├── services/       # business logic
│   │   ├── utils/          # helper functions
│   │   ├── validators/     # zod validation
│   │   ├── app.ts          # express app setup
│   │   └── server.ts       # start server
│   ├── .env
│   └── package.json
│
├── frontend/              # (React - coming soon)
│
└── README.md
```

---

## ⚙️ Backend Setup

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Environment variables

Create a `.env` file:

```env
PORT=5000
```

### 3. Run development server

```bash
npm run dev
```

---

### Backend

- Node.js
- Express
- MongoDB + Mongoose
- Socket.IO
- Zod
- Cloudinary
- Redis
- Nodemailer

---

## Task Complete

- đã làm signup lưu email vào mongodb bằng cach xác thực email
- đã làm xong login và logout sử dụng jwt và cookie
