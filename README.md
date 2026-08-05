# IGIIDeation Judging and Evaluation Platform

A web-based platform developed for the **IGIIDeation Innovation Competition** to manage project submissions, judge assignments, and evaluation processes. The system provides dedicated dashboards for administrators and judges, allowing efficient project management and assessment.

---

## Features

### Administrator

* User authentication
* Manage projects
* Manage judges
* Assign judges to projects
* Update project information
* Delete projects
* Monitor project submissions

### Judge

* Secure login
* View assigned projects
* Review project materials
* Submit evaluation scores
* Update submitted evaluations

---

## Technology Stack

| Technology     | Version |
| -------------- | ------- |
| Next.js        | 16      |
| React          | 19      |
| TypeScript     | Latest  |
| Tailwind CSS   | Latest  |
| Prisma ORM     | 6       |
| MongoDB        | Latest  |
| Docker Desktop | Latest  |

---

## Prerequisites

Before running this project, install:

* Node.js 22 LTS
* npm
* Docker Desktop
* MongoDB (Docker Container)
* Git

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd Igiideation26
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

Example:

```env
DATABASE_URL="mongodb://localhost:27017/igiideation?authSource=admin&directConnection=true"
SECRET_KEY="your_secret_key_here"
```

A sample configuration is provided in `.env.example`.

---

## Running MongoDB

Start Docker Desktop and run your MongoDB container.

Example:

```bash
docker compose up -d
```

Verify the MongoDB container is running before starting the application.

---

## Running the Development Server

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:3000
```

---

## Production Build

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## Project Structure

```text
app/            Next.js App Router
components/     Reusable UI components
lib/            Utility functions
prisma/         Database schema
public/         Static assets
util/           Helper functions
```

---

## Migration Notes

The project has been upgraded from **Next.js 14** to **Next.js 16**.

Migration updates include:

* Updated Cookies API
* Updated Route Parameters API
* Updated React 19 compatibility
* Updated Radix UI components
* Dependency updates
* Improved compatibility with the latest Next.js App Router

---

## Credits

Originally developed by:

* BR. MUHAMMAD HAKIM BIN MD NAZR (https://hakimnazry.dev/)
* SR. AINUL HANI BINTI MOHD MANOJ
  

Current maintenance and enhancements by the IGIIDeation development team.

---

## License

This project is intended for the IGIIDeation platform and its contributors. Please obtain permission before redistributing or using it outside the intended purpose.
