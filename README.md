# Qualipro App

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

In the backend (`qualipro-server`), there is a `.env-example` file. Copy it to `.env` and fill in your configuration:

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

### 2. Install Dependencies

From the project root, run:

npm install

cd qualipro-server/src/seeds
node seed.js

npm start

# OR
npm run serve:frontend   # Frontend only
npm run serve:backend    # Backend only

