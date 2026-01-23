# Sol-X Phase 1 Authentication - Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### 1. Backend Setup

```bash
cd backend
npm install
npm run prisma:migrate
npx prisma db seed
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3. Login

- URL: `http://localhost:5173/login`
- Email: `rajat.saraswat.0409@gmail.com`
- Password: `Admin@2026`

## ✅ What's Working

✅ Master Admin Login  
✅ JWT Authentication  
✅ Role-Based Access Control  
✅ Access Request Form  
✅ Email Notifications  
✅ Protected Routes  
✅ Dashboard  
✅ Logout

## 📋 Master Admin Credentials

**Email:** rajat.saraswat.0409@gmail.com  
**Password:** Admin@2026  
**Role:** MASTER_ADMIN

⚠️ Change password in production!

## 🔑 Key Features

| Feature          | Status | Description                     |
| ---------------- | ------ | ------------------------------- |
| Login            | ✅     | Email + password authentication |
| JWT              | ✅     | Secure token-based auth         |
| Roles            | ✅     | 5 role levels                   |
| Protected Routes | ✅     | Route guards by role            |
| Access Request   | ✅     | Public request form             |
| Email Alerts     | ✅     | Admin notifications             |
| Dashboard        | ✅     | User dashboard                  |

## 🎨 Design Colors

- Background: `#0F172A` (Charcoal 900)
- Cards: `#1E293B` (Charcoal 700)
- Primary: `#F59E0B` (Solar Amber)
- Success: `#10B981` (Green)
- Text: `#FAFAFA` (Gray 50)

## 📱 Routes

| Route             | Access    | Description         |
| ----------------- | --------- | ------------------- |
| `/login`          | Public    | Login page          |
| `/request-access` | Public    | Access request form |
| `/dashboard`      | Protected | User dashboard      |
| `/access-denied`  | Protected | Access denied page  |

## 🔌 API Endpoints

### POST `/api/auth/login`

Login with credentials

### POST `/api/auth/request-access`

Submit access request

### GET `/api/auth/verify`

Verify JWT token (Protected)

## 🗄️ Database Commands

```bash
# Open Prisma Studio
npm run prisma:studio

# Create migration
npm run prisma:migrate

# Seed database
npx prisma db seed

# Reset database (dev only!)
npx prisma migrate reset
```

## 👥 User Roles (Hierarchy)

1. **MASTER_ADMIN** - Full access ⭐
2. **ADMIN** - Administrative
3. **PROJECT_MANAGER** - Project level
4. **SITE_ENGINEER** - Site level
5. **VIEWER** - Read-only

## 🔒 Security Checklist

- [x] Passwords hashed (bcrypt)
- [x] JWT tokens
- [x] Environment variables
- [x] CORS configured
- [x] Generic error messages
- [x] Token expiry (7 days)

## 📦 Tech Stack

**Backend:**

- Express + TypeScript
- Prisma + PostgreSQL
- bcrypt + JWT
- nodemailer

**Frontend:**

- React 19 + TypeScript
- React Router
- Tailwind CSS
- Zustand
- React Hook Form + Zod

## 🐛 Common Issues

**Database error?**
→ Check DATABASE_URL in .env

**SMTP error?**
→ Use Gmail App Password (not regular password)

**Network error?**
→ Verify backend is running on port 8000

**Token invalid?**
→ Clear localStorage and login again

## 📞 Need Help?

Contact: rajat.saraswat.0409@gmail.com

---

**Phase 1 Complete** ✅
