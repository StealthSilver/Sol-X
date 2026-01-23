# Sol-X Authentication System - Phase 1

## 🔐 Overview

This is Phase 1 of the Sol-X authentication and access control system. It implements production-ready, role-based authentication across the frontend (React + TypeScript + Tailwind) and backend (Express + TypeScript + PostgreSQL + Prisma).

## 🎯 Features

### Authentication

- ✅ Email/Password login with JWT tokens
- ✅ Role-based access control (5 roles)
- ✅ Protected routes with role enforcement
- ✅ Persistent authentication state
- ✅ Token expiry and auto-logout

### Access Request System

- ✅ Public access request form
- ✅ Email notifications to admin
- ✅ No automatic user creation (manual approval)
- ✅ Prevents duplicate email requests

### Security

- ✅ Passwords hashed with bcrypt
- ✅ JWT-based authentication
- ✅ Environment variable protection
- ✅ CORS configuration
- ✅ Generic error messages (no credential leaks)

## 👥 User Roles

1. **MASTER_ADMIN** - Full system access (initial login)
2. **ADMIN** - Administrative access
3. **PROJECT_MANAGER** - Project management access
4. **SITE_ENGINEER** - Site-level access
5. **VIEWER** - Read-only access

## 📦 Tech Stack

### Backend

- Express
- TypeScript
- Prisma ORM
- PostgreSQL (Neon)
- bcrypt (password hashing)
- jsonwebtoken (JWT)
- nodemailer (email notifications)
- zod (validation)

### Frontend

- React 19
- TypeScript
- React Router
- Tailwind CSS
- Zustand (state management)
- React Hook Form
- Zod (validation)
- Axios

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (Neon account recommended)
- SMTP credentials (Gmail recommended for development)

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables in `.env`:

```env
DATABASE_URL="your-postgres-connection-string"

JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRY="7d"

SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-specific-password"

ADMIN_EMAIL="rajat.saraswat.0409@gmail.com"

NODE_ENV="development"
PORT=8000
```

4. Run database migrations:

```bash
npm run prisma:migrate
```

5. Seed the database with master admin:

```bash
npx prisma db seed
```

**Master Admin Credentials:**

- Email: `rajat.saraswat.0409@gmail.com`
- Password: `Admin@2026`
- ⚠️ **Change this password in production!**

6. Start the development server:

```bash
npm run dev
```

Backend will run at: `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```env
VITE_API_URL=http://localhost:8000/api
```

4. Start the development server:

```bash
npm run dev
```

Frontend will run at: `http://localhost:5173`

## 🧪 Testing the System

### 1. Test Master Admin Login

1. Navigate to `http://localhost:5173/login`
2. Login with:
   - Email: `rajat.saraswat.0409@gmail.com`
   - Password: `Admin@2026`
3. You should be redirected to the dashboard

### 2. Test Request Access Flow

1. Navigate to `http://localhost:5173/request-access`
2. Fill in the form with:
   - Name
   - Email
   - Company
   - Message
3. Submit the request
4. Check that email notification was sent to `rajat.saraswat.0409@gmail.com`
5. Verify in database that request was saved

### 3. Test Protected Routes

1. Try accessing `/dashboard` without logging in
2. You should be redirected to `/login`
3. Login and try accessing routes
4. Test role-based restrictions

## 📁 Project Structure

```
Sol-X/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   ├── seed.ts            # Database seeding
│   │   └── migrations/        # Migration files
│   ├── src/
│   │   ├── controllers/
│   │   │   └── auth.controller.ts
│   │   ├── middleware/
│   │   │   └── auth.middleware.ts
│   │   ├── routes/
│   │   │   └── auth.routes.ts
│   │   ├── lib/
│   │   │   ├── prisma.ts
│   │   │   └── email.ts
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   └── server.ts
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── auth.api.ts
    │   ├── components/
    │   │   ├── ProtectedRoute.tsx
    │   │   └── RoleProtectedRoute.tsx
    │   ├── pages/
    │   │   ├── Login.tsx
    │   │   ├── RequestAccess.tsx
    │   │   ├── Dashboard.tsx
    │   │   └── AccessDenied.tsx
    │   ├── store/
    │   │   └── authStore.ts
    │   ├── types/
    │   │   └── auth.ts
    │   ├── lib/
    │   │   └── api.ts
    │   ├── App.tsx
    │   └── main.tsx
    ├── .env
    └── package.json
```

## 🔌 API Endpoints

### Public Endpoints

#### POST `/api/auth/login`

Login with email and password.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "accessToken": "jwt-token",
    "user": {
      "id": "user-id",
      "name": "User Name",
      "email": "user@example.com",
      "role": "MASTER_ADMIN"
    }
  }
}
```

#### POST `/api/auth/request-access`

Submit an access request.

**Request:**

```json
{
  "name": "John Doe",
  "email": "john@company.com",
  "company": "Company Inc.",
  "message": "I need access to manage projects..."
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "message": "Access request submitted successfully",
    "requestId": "request-id"
  }
}
```

### Protected Endpoints

#### GET `/api/auth/verify`

Verify JWT token and get user info.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "role": "MASTER_ADMIN"
    }
  }
}
```

## 🎨 Design System

The authentication pages follow the Sol-X design system:

### Colors

- **Background**: `#0F172A` (Charcoal 900)
- **Cards**: `#1E293B` (Charcoal 700)
- **Text Primary**: `#FAFAFA` (Gray 50)
- **Text Secondary**: `#4B5563` (Gray 600)
- **Primary CTA**: `#F59E0B` (Solar Amber 500)
- **Success**: `#10B981` (Green 500)

### Typography

- **Font Family**: Inter (fallback to system fonts)
- **Headings**: Semibold (600)
- **Body**: Regular (400)

### UI Principles

- Centered auth cards (max-width: 420px)
- Soft borders and subtle shadows
- Subtle hover states (150-200ms transitions)
- No heavy animations
- Professional and calm aesthetic

## 🔒 Security Best Practices

1. **Passwords**: Hashed with bcrypt (10 rounds)
2. **JWT**: Signed with secret, expires in 7 days
3. **Environment Variables**: All secrets in `.env` files
4. **CORS**: Configured for specific origins
5. **Error Handling**: Generic messages (no credential leaks)
6. **Token Storage**: localStorage (consider httpOnly cookies in production)

## 📧 Email Configuration

### Gmail Setup (Development)

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the generated password in `SMTP_PASS` environment variable

### Production

Consider using a dedicated email service like:

- SendGrid
- Mailgun
- AWS SES
- Postmark

## 🗄️ Database Management

### Useful Prisma Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Create a new migration
npm run prisma:migrate

# Open Prisma Studio (Database GUI)
npm run prisma:studio

# Reset database (⚠️ Development only!)
npx prisma migrate reset

# Seed database
npx prisma db seed
```

### Creating Additional Users

Since only MASTER_ADMIN can login initially, create additional users manually:

1. Open Prisma Studio:

```bash
cd backend && npm run prisma:studio
```

2. Navigate to `User` model
3. Click "Add record"
4. Fill in:
   - name: User's full name
   - email: User's email (must be unique)
   - passwordHash: Use bcrypt to hash a password (see below)
   - role: Select appropriate role
   - isActive: Set to `true`

**Hash a password:**

```bash
cd backend
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('YourPassword123', 10).then(hash => console.log(hash))"
```

## 🚢 Deployment Checklist

### Backend

- [ ] Change `JWT_SECRET` to a strong random value
- [ ] Update `DATABASE_URL` to production database
- [ ] Configure production SMTP credentials
- [ ] Set `NODE_ENV=production`
- [ ] Update CORS origins to production domain
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure logging and monitoring

### Frontend

- [ ] Update `VITE_API_URL` to production API URL
- [ ] Build for production: `npm run build`
- [ ] Deploy to hosting service (Vercel, Netlify, etc.)
- [ ] Configure production domain
- [ ] Enable HTTPS

## 🔄 Next Steps (Future Phases)

- [ ] Password reset functionality
- [ ] Email verification
- [ ] 2FA (Two-Factor Authentication)
- [ ] User management dashboard (for admins)
- [ ] Audit logs
- [ ] Session management
- [ ] Refresh token rotation
- [ ] OAuth integration (Google, Microsoft, etc.)
- [ ] Role permission matrix
- [ ] Activity tracking

## 🐛 Troubleshooting

### Backend Issues

**"Cannot connect to database"**

- Verify `DATABASE_URL` is correct
- Check if database is accessible
- Ensure SSL mode is configured correctly for Neon

**"SMTP connection failed"**

- Verify SMTP credentials
- Check if 2FA is enabled and App Password is used (Gmail)
- Verify SMTP port (587 for TLS, 465 for SSL)

**"JWT errors"**

- Ensure `JWT_SECRET` is set
- Check token expiry configuration
- Verify token format in Authorization header

### Frontend Issues

**"Network Error" when calling API**

- Verify backend is running
- Check `VITE_API_URL` in `.env`
- Verify CORS configuration on backend
- Check browser console for errors

**"Cannot read property of undefined"**

- Clear localStorage: `localStorage.clear()`
- Check if token is expired
- Verify Zustand store is properly initialized

## 📝 Environment Variables Reference

### Backend (.env)

```env
DATABASE_URL              # PostgreSQL connection string
JWT_SECRET                # Secret key for JWT signing
JWT_EXPIRY                # Token expiration time (e.g., "7d")
SMTP_HOST                 # SMTP server host
SMTP_PORT                 # SMTP server port
SMTP_USER                 # SMTP username/email
SMTP_PASS                 # SMTP password/app password
ADMIN_EMAIL               # Email to receive access requests
NODE_ENV                  # Environment (development/production)
PORT                      # Server port (default: 8000)
```

### Frontend (.env)

```env
VITE_API_URL              # Backend API URL
```

## 📄 License

This project is proprietary and confidential.

## 👨‍💻 Support

For issues or questions, contact: rajat.saraswat.0409@gmail.com

---

**Built with ❤️ for Sol-X**
