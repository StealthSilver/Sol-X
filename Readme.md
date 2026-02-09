# Sol-X

**Project execution, under control.**

Sol-X is a comprehensive project monitoring platform purpose-built for renewable energy infrastructure teams. From concept to commissioning, Sol-X provides the tools to track milestones, manage delays, capture real evidence, and deliver accountability at every stage of project execution.

## Overview

Renewable energy projects face unique challenges: fragmented data across spreadsheets, photo evidence lost in email threads, delayed reporting, and unclear accountability. Sol-X solves these problems by consolidating project tracking, evidence capture, and reporting into a single, unified platform.

## Core Capabilities

- **Project Lifecycle Tracking** – Monitor every phase from site assessment through commissioning with clear milestone visibility and progress indicators.

- **Task & Milestone Management** – Assign, track, and close tasks with dependencies. Keep critical path items visible and never miss a deadline.

- **Photo Evidence Capture** – Timestamped, geotagged photos linked directly to milestones. Build an auditable visual record for compliance and accountability.

- **Automated Reporting** – Generate progress reports, delay analyses, and executive summaries without manual effort.

- **Role-Based Dashboards** – Tailored views for site engineers, project managers, admins, and executives. Everyone sees exactly what matters to them.

- **Analytics & Insights** – Track performance metrics, identify bottlenecks, and forecast completion with data-driven clarity.

## User Roles

Sol-X provides role-based access and dashboards:

| Role                | Capabilities                                                      |
| ------------------- | ----------------------------------------------------------------- |
| **Master Admin**    | Full system configuration, user management, audit trails          |
| **Admin**           | Cross-project portfolio visibility, compliance reporting          |
| **Project Manager** | Real-time milestone tracking, delay analysis, stakeholder reports |
| **Site Engineer**   | Mobile-first task updates, photo capture, issue reporting         |
| **Viewer**          | Executive dashboards, portfolio overview, risk indicators         |

## Tech Stack

### Frontend

- React with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Zustand for state management

### Backend

- Node.js with Express
- TypeScript
- Prisma ORM with PostgreSQL
- JWT-based authentication

### Landing Page

- Next.js 14+
- Framer Motion for animations
- Tailwind CSS

## Project Structure

Sol-X/
├── backend/ # Express API server with Prisma
├── frontend/ # React dashboard application
└── landing/ # Next.js marketing website

## Getting Started

1. Clone the repository
2. Install dependencies in each directory (`npm install`)
3. Configure environment variables (see `.env.example` files)
4. Run database migrations (`npx prisma migrate dev`)
5. Start development servers

## License

All rights reserved.

┌─────────────────────────────────────────────────────────────────────────────┐
│ CLIENTS │
├─────────────────────┬─────────────────────────┬─────────────────────────────┤
│ │ │ │
│ ┌─────────────┐ │ ┌─────────────────┐ │ ┌─────────────────────┐ │
│ │ Landing │ │ │ Dashboard │ │ │ Mobile Browser │ │
│ │ (Next.js) │ │ │ (React) │ │ │ (Responsive PWA) │ │
│ └──────┬──────┘ │ └────────┬────────┘ │ └──────────┬──────────┘ │
│ │ │ │ │ │ │
└──────────┼──────────┴────────────┼────────────┴──────────────┼──────────────┘
│ │ │
│ ▼ │
│ ┌────────────────────────┐ │
│ │ API Gateway │ │
│ │ (Express + JWT) │◄──────────────┘
│ └───────────┬────────────┘
│ │
│ ▼
│ ┌────────────────────────┐
│ │ Controllers │
│ │ ┌──────┐ ┌──────────┐ │
│ │ │ Auth │ │ Projects │ │
│ │ └──────┘ └──────────┘ │
│ │ ┌──────┐ ┌──────────┐ │
│ │ │Tasks │ │ Reports │ │
│ │ └──────┘ └──────────┘ │
│ └───────────┬────────────┘
│ │
│ ▼
│ ┌────────────────────────┐
│ │ Middleware Layer │
│ │ ┌──────────────────┐ │
│ │ │ Auth Middleware │ │
│ │ │ (JWT Validation) │ │
│ │ └──────────────────┘ │
│ │ ┌──────────────────┐ │
│ │ │ Role-Based Access│ │
│ │ └──────────────────┘ │
│ └───────────┬────────────┘
│ │
│ ▼
│ ┌────────────────────────┐
│ │ Prisma ORM │
│ │ (Data Access Layer) │
│ └───────────┬────────────┘
│ │
│ ▼
│ ┌────────────────────────┐
│ │ PostgreSQL │
│ │ ┌──────────────────┐ │
│ │ │ Users │ │
│ │ │ Access Requests │ │
│ │ │ Projects │ │
│ │ │ Tasks/Milestones │ │
│ │ │ Photo Evidence │ │
│ │ └──────────────────┘ │
│ └────────────────────────┘
│
▼
┌─────────────┐
│ Vercel │
│ (Hosting) │
└─────────────┘
