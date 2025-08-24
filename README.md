# 📌 Project Management Tool API

A backend API for managing **projects, tasks, permissions, and users**.  
Built with **NestJS**, **Prisma ORM**, and **PostgreSQL**, with support for **Docker** and **Swagger API docs**.

---

## 🚀 Features

- 🔑 **Authentication & Authorization**
  - JWT-based authentication
  - Role & permission system (`SUPER_ADMIN`, `STAFF`, etc.)

- 📂 **Project Management**
  - Create, update, and delete projects
  - Add members with roles (`OWNER`, `ADMIN`, `MEMBER`, `VIEWER`)
  - Project cover image upload

- ✅ **Task Management**
  - Assign tasks to users
  - Task statuses (`TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`)
  - Task priorities (`LOW`, `MEDIUM`, `HIGH`)
  - Upload multiple images to tasks

- 👤 **User Management**
  - User registration & login
  - Profile avatars
  - Role-based access control

- 🖼 **File Uploads**
  - Upload and serve images for tasks, users, and projects

- 📊 **API Documentation**
  - Auto-generated via Swagger (`/api/docs`)

---

## 🛠 Tech Stack

- [NestJS](https://nestjs.com/) – Node.js framework
- [Prisma](https://www.prisma.io/) – Database ORM
- [PostgreSQL](https://www.postgresql.org/) – Database
- [Docker & Docker Compose](https://www.docker.com/) – Containerized services
- [JWT](https://jwt.io/) – Authentication
- [Swagger](https://swagger.io/) – API Documentation

---

## 📦 Installation

### 1️⃣ Clone repository
```bash
git clone https://github.com/MohsenSaf/Project-Management-Tool-API.git
cd Project-Management-Tool-API
````

### 2️⃣ Install dependencies

```bash
yarn install
# or
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/project_management?schema=public"
JWT_SECRET="your_jwt_secret"
PORT=3000
```

---

## 🐘 Run with Docker

The project includes **Postgres** and **pgAdmin** in `docker-compose.yml`.

```bash
docker-compose up -d
```

* Postgres: `localhost:5432`
* pgAdmin: `http://localhost:5050`

  * Email: `admin@example.com`
  * Password: `admin`

---

## 🗄 Database & Prisma

Run migrations:

```bash
npx prisma migrate dev
```

Seed the database (creates default roles, permissions, and a SUPER\_ADMIN):

```bash
npx prisma db seed
```

Open Prisma Studio:

```bash
npx prisma studio
```

---

## ▶️ Run the Application

Development:

```bash
yarn start:dev
```

Production:

```bash
yarn build
yarn start:prod
```

---

## 📘 API Documentation

Once running, visit:

```
http://localhost:3000/api/docs
```

---

## 👥 Default Admin

When seeding, a **SUPER\_ADMIN** user is created:

* Email: `admin@example.com`
* Password: `SUPER_ADMIN`

---

## 📂 Project Structure

```
src/
 ├── auth/          # Authentication & JWT
 ├── users/         # User module
 ├── projects/      # Project module
 ├── tasks/         # Task module
 ├── images/        # File upload handling
 ├── prisma/        # Prisma schema & seed
 └── main.ts        # App entrypoint
```