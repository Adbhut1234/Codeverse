<div align="center">
  <br />
  <h1>🌌 CodeVerse</h1>
  <p>
    <strong>A next-generation, cloud-based Integrated Development Environment (IDE).</strong>
  </p>
  <p>
    <a href="https://codeverse-main-ruby.vercel.app"><img src="https://img.shields.io/badge/Website-codeverse--main--ruby.vercel.app-blue?style=for-the-badge&logo=vercel" alt="Website" /></a>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" /></a>
    <a href="https://www.prisma.io"><img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" /></a>
  </p>
</div>

## 🚀 Overview

CodeVerse is a modern, highly responsive web-based code editor built to eliminate the friction of local environment setups. Spin up full workspaces, write code in a VS Code-like environment, and seamlessly save your projects to the cloud.

## ✨ Features

- **Robust Authentication:** Secure, instant logins using Google and GitHub OAuth providers (powered by NextAuth.js).
- **Persistent Cloud Workspaces:** Save your projects seamlessly to a PostgreSQL database. Pick up right where you left off from any device.
- **VS Code Experience in Browser:** Full integration with the Monaco Editor. Enjoy syntax highlighting, auto-completion, multi-cursor editing, and bracket pairing.
- **Dynamic File Explorer:** Manage files, import repositories directly from GitHub, or start from built-in templates (React, Python, etc.).
- **Interactive UI:** Smooth Framer Motion transitions, split-pane designs, and a beautiful sleek dark mode default theme.
- **Secure Route Protection:** Middleware-level protection for sensitive dashboards and settings.

## 🛠️ Tech Stack

- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (hosted on [Neon](https://neon.tech/))
- **ORM:** [Prisma](https://www.prisma.io/)
- **Code Editor:** [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)

## 💻 Running Locally

Follow these steps to set up the CodeVerse environment on your local machine.

### 1. Clone the Repository
```bash
git clone https://github.com/Adbhut1234/Codeverse.git
cd Codeverse
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root of the project and populate it with your credentials:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secure_random_secret_string

# GitHub OAuth App
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# Google OAuth App
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Neon PostgreSQL Database
DATABASE_URL="your_postgresql_connection_string"
```

### 4. Setup the Database
Sync your Prisma schema with the PostgreSQL database:
```bash
npx prisma db push
```

### 5. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🌍 Deployment

CodeVerse is designed to be easily deployed on [Vercel](https://vercel.com).
*When deploying, ensure that you run `prisma generate` during the build step (which is already configured via the `postinstall` script in `package.json`). Ensure all environment variables are correctly mapped in your Vercel project settings.*

## 📜 License

This project is licensed under the MIT License.
