# CodeVerse

A cloud-based code editor and development workspace running directly in the browser. Powered by Next.js, Monaco Editor, Prisma, and serverless PostgreSQL on Neon.

[![Website](https://img.shields.io/badge/Live_Demo-codeverse--main--ruby.vercel.app-blue?style=flat-square&logo=vercel)](https://codeverse-main-ruby.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io)

---

## Architecture & Data Flow

```
┌─────────────────────────────────┐        ┌──────────────────────────────┐        ┌───────────────────────────┐
│        Browser Client           │ ─────> │     Next.js (App Router)     │ ─────> │    Neon PostgreSQL        │
│ Monaco Editor + Dynamic Explorer│ <───── │ NextAuth + Server Actions API│ <───── │ Prisma Schema Workspaces  │
└─────────────────────────────────┘        └──────────────────────────────┘        └───────────────────────────┘
```

1. **Editor Engine:** Monaco Editor is loaded dynamically on the client side (`next/dynamic` with SSR disabled) to provide VS Code-standard syntax highlighting, auto-completion, bracket pairing, and multi-cursor editing.
2. **Session & Auth Layer:** NextAuth.js provides OAuth session management (GitHub and Google OAuth) with JWT tokens and edge middleware route guards.
3. **Workspace State:** Project file trees, custom configurations, and files are stored in PostgreSQL on Neon via Prisma ORM, enabling users to switch devices without losing state.
4. **Responsive Split-Pane UI:** Built with Tailwind CSS and Framer Motion for smooth tab transitions and adjustable workspace panels.

## Tech Stack

* **Framework:** Next.js (App Router) & React
* **Code Editor:** Monaco Editor (`@monaco-editor/react`)
* **Styling & Motion:** Tailwind CSS, Framer Motion, Lucide Icons
* **Database & ORM:** PostgreSQL (Neon Serverless), Prisma ORM
* **Authentication:** NextAuth.js (GitHub & Google OAuth)
* **Deployment:** Vercel

## Running Locally

Follow these steps to run CodeVerse in your local development environment:

### 1. Clone the repository
```bash
git clone https://github.com/Adbhut1234/Codeverse.git
cd Codeverse
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env.local` file in the root directory:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secure_random_secret_string

# GitHub OAuth App (from GitHub Developer Settings)
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# Google OAuth App (from Google Cloud Console)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Neon PostgreSQL Database Connection
DATABASE_URL="postgresql://user:password@endpoint.neon.tech/neondb?sslmode=require"
```

### 4. Push database schema
Synchronize your Prisma schema with your PostgreSQL database:
```bash
npx prisma db push
```

### 5. Start development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

CodeVerse is configured for deployment on [Vercel](https://vercel.com):
* Run `prisma generate` during build (pre-configured via `postinstall` in `package.json`).
* Ensure all environment variables from `.env.local` are configured in your Vercel project dashboard.

## License

This project is licensed under the MIT License.
