# Skill Bridge Client

Skill Bridge is a multi-role tutoring platform frontend built with Next.js.  
It supports student, tutor, and admin workflows including tutor discovery, bookings, reviews, and dashboard management.

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Radix UI + shadcn/ui components
- better-auth (session/auth integration)

## Main Features

- Authentication: register, login, email verification flow
- Public tutor listing and tutor details pages
- Student dashboard: profile and bookings
- Tutor dashboard: profile, availability, and bookings
- Admin dashboard: users, categories, and booking management

## Project Structure

```text
src/
  app/
    (commonLayout)/        # public pages (home, login, register, find tutors)
    (dashboardLayout)/     # role-based dashboards (ADMIN/STUDENT/TUTOR)
  components/
    modules/               # feature modules
    ui/                    # reusable UI components
  services/                # server-side API service calls
  constants/               # shared constants (roles, etc.)
  lib/                     # shared utilities
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SERVER_BASE_URL=http://localhost:5000
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:5000
AUTH_URL=http://localhost:5000
```

### 3) Run development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

- `npm run dev` — start development server
- `npm run build` — create production build
- `npm run start` — run production server
- `npm run lint` — run ESLint

## Notes

- The client relies on a backend API server for auth, tutor, booking, review, and admin data.
- API/auth session routes are proxied through `next.config.ts`.
