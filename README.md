# Boilerplate App

**Author:** Amen Ammar  
**Version:** 1.0.0

A full-stack project with a frontend and backend,
using:
- Tailwind/Quasar/Vue.js with Pinia for the frontend.
- Node.js/Sequelize for the backend.

---

```bash
## Project Structure
root
│
├─ qualipro-client/ # Frontend (Vue.js + TailwindCSS + Quasar + Pinia)
├─ qualipro-server/ # Backend (Node.js + MySQL + Express + Sequelize)
└─ package.json # Root scripts for concurrently

---

## Requirements

- Node.js >= 18
- npm >= 9
- MySQL database

---

## Setup

### 1. Prepare Environment Variables

In the backend (`qualipro-server`), and In the frontend (`qualipro-client`), there are `.env-example` file. Copy it to `.env` and fill in your configuration:

cp qualipro-server/.env-example qualipro-server/.env

PORT=
NODE_ENV=

DB_HOST=
DB_PORT=

DB_NAME=
DB_USER=
DB_PASS=

JWT_SECRET=
JWT_EXPIRES_IN=

cp qualipro-client/.env-example qualipro-client/.env

VITE_API_BASE_URL=
VITE_PORT=
VITE_APP_NAME=QualiproApp

### 2. Install Dependencies

From the project root, run:
npm install

### 3. Seeding Roles and Admin account
cd qualipro-server/src/seeds
node seed.js

### 4. Concurrently Run BOTH projects
From the project root, run:
npm start

# OR run each project separately
npm run serve:frontend   # Frontend only
npm run serve:backend    # Backend only


