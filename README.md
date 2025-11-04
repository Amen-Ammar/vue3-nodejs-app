# Qualipro App

**Author:** Amen Ammar  
**Version:** 0.0.1

A full-stack project with a frontend and backend, using Quasar/Vue.js for the frontend and Node.js/Sequelize for the backend.

---

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
- MySQL/PostgreSQL database (depending on your backend config)

---

## Setup

### 1. Prepare Environment Variables

In the backend (`qualipro-server`), there is a `.env-example` file. Copy it to `.env` and fill in your configuration:

```bash
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

```bash
npm run install

cd qualipro-server/src/seeds
node seed.js


npm start

# OR
npm run serve:frontend   # Frontend only
npm run serve:backend    # Backend only

