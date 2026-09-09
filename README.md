# Rohit Tarate — Full-Stack Developer Portfolio

A production-shaped, full-stack portfolio application — not a static template. Real backend, real database, real authentication, a working admin dashboard, and a full CI/CD pipeline deploying to live infrastructure.

**Live site:** [your-vercel-url.vercel.app](https://rohit-portfolio-chi-nine.vercel.app/)
**API:** [portfolio-backend-j38s.onrender.com](https://portfolio-backend-j38s.onrender.com)

---

## Why this exists

Most developer portfolios are a static page listing skills. This one _is_ a full-stack application — the site itself is evidence of the engineering it claims: a real REST API, a real relational database, JWT-based authentication with role-based authorization, and a genuine deployment pipeline, not just a description of one.

## Tech Stack

**Frontend**

- React 19 + Vite
- Tailwind CSS v4
- React Router
- Axios
- `react-markdown` + `rehype-highlight` (blog rendering with syntax highlighting)

**Backend**

- Java 21
- Spring Boot 4.1 (Spring Framework 7)
- Spring Data JPA / Hibernate
- Spring Security + JWT (`jjwt`)
- Jakarta Bean Validation
- MySQL 8.4

**DevOps**

- Docker + Docker Compose (backend, frontend, MySQL)
- GitHub Actions (build, test, and Docker image publishing on every push)
- Deployed on **Vercel** (frontend), **Render** (backend, from a GitHub Container Registry image), and **Aiven** (managed MySQL)

## Features

**Public site**

- Home, About, Skills, Experience, Education, Certifications, Projects (with detailed case-study pages), Blog (Markdown, categories, search), Resume, Coding Profiles, Contact
- Dark / light mode
- Fully responsive
- Loading, empty, and error states on every data-driven section

**Admin dashboard** (`/admin/login`)

- JWT-authenticated, role-protected
- Full CRUD for Projects, Skills, Experience, Education, Certifications, and Blog posts
- Blog editor with a live Markdown preview
- Resume management via a doc link (no file re-uploads — editing the source document updates the live site automatically)
- Contact message inbox (read/unread tracking, delete)

**Backend**

- Layered architecture: Controller → Service → Repository → MySQL
- DTOs on every endpoint (entities are never serialized directly)
- Centralized exception handling with consistent error responses
- Spam-resistant contact form (honeypot field)
- Actuator health endpoint for container/platform health checks

## Architecture

```
Browser
  │
  ▼
React (Vite) ── Axios ──▶ REST API ──▶ Spring Boot
                                          │
                              ┌───────────┴───────────┐
                              │                       │
                         Controller               Security (JWT)
                              │                       │
                              ▼                       │
                          Service ◀───────────────────┘
                              │
                              ▼
                         Repository
                              │
                              ▼
                            MySQL
```

## Project Structure

```
portfolio/
├── backend/                 Spring Boot API
│   ├── src/main/java/com/rohit/portfolio/
│   │   ├── config/          Security, CORS, admin seeding
│   │   ├── controller/      REST endpoints
│   │   ├── dto/              Request/response shapes
│   │   ├── entity/           JPA entities
│   │   ├── exception/        Global exception handling
│   │   ├── repository/       Spring Data JPA repositories
│   │   ├── security/         JWT filter, auth entry points
│   │   └── service/           Business logic
│   ├── src/test/java/...      Unit tests (JUnit + Mockito) and
│   │                            integration tests (Spring Boot + MockMvc)
│   └── Dockerfile
├── frontend/                 React (Vite) app
│   ├── src/
│   │   ├── components/        Shared UI + page sections
│   │   ├── pages/              Route-level pages, incl. admin/
│   │   ├── services/            Axios API clients
│   │   ├── hooks/                 Auth + theme context
│   │   └── utils/                  API-to-UI shape adapters
│   └── Dockerfile
├── docker-compose.yml         Runs all three services together
└── .github/workflows/          CI: build, test, and image publishing
```

## Running Locally

**Prerequisites:** Java 21, Node 22+, MySQL 8+, Maven (or use an IDE with built-in Maven support).

**Backend**

```bash
cd backend
# Set JWT_SECRET as an environment variable first (see .env.example-style
# variables below) — the app will not start without it.
mvn spring-boot:run
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

**Or, run everything at once with Docker Compose:**

```bash
cp .env.example .env   # fill in real values
docker compose up --build
```

### Environment Variables

| Variable                               | Used by  | Notes                                                              |
| -------------------------------------- | -------- | ------------------------------------------------------------------ |
| `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` | Backend  | Defaults to local MySQL if unset                                   |
| `JWT_SECRET`                           | Backend  | **Required, no default** — generate with `openssl rand -base64 64` |
| `ADMIN_USERNAME`, `ADMIN_PASSWORD`     | Backend  | Seeds the initial admin account on first run only                  |
| `CORS_ALLOWED_ORIGINS`                 | Backend  | Comma-separated list of allowed frontend origins                   |
| `VITE_API_BASE_URL`                    | Frontend | Baked in at build time — the backend URL the UI calls              |

Never commit real values for any of these — see `.env.example` in the repo root.

## API Overview

| Resource       | Base path                         | Public reads    | Admin writes                    |
| -------------- | --------------------------------- | --------------- | ------------------------------- |
| Projects       | `/api/projects`                   | ✅              | JWT + `ROLE_ADMIN`              |
| Skills         | `/api/skills`                     | ✅              | JWT + `ROLE_ADMIN`              |
| Experience     | `/api/experiences`                | ✅              | JWT + `ROLE_ADMIN`              |
| Education      | `/api/education`                  | ✅              | JWT + `ROLE_ADMIN`              |
| Certifications | `/api/certifications`             | ✅              | JWT + `ROLE_ADMIN`              |
| Blog           | `/api/blog` (published only)      | ✅              | JWT + `ROLE_ADMIN`              |
| Resume         | `/api/resume`                     | ✅              | JWT + `ROLE_ADMIN`              |
| Contact        | `/api/contact` (submit)           | ✅ (write-only) | JWT + `ROLE_ADMIN` (read inbox) |
| Auth           | `/api/auth/login`, `/api/auth/me` | Login is public | —                               |

## Testing

```bash
cd backend
mvn test
```

- **Unit tests** — `ProjectServiceTest`: service-layer logic, mocked repository (JUnit 5 + Mockito)
- **Integration tests** — `ProjectControllerIntegrationTest`: full Spring context, real HTTP-shaped requests via MockMvc, real JWT generation/validation, proving public routes stay public and protected routes genuinely reject unauthenticated requests

## CI/CD

Two independent GitHub Actions workflows (`.github/workflows/`), each triggered only by changes to their own folder:

- **Backend CI** — builds, runs the full test suite against a real MySQL service container, then publishes a Docker image to GitHub Container Registry
- **Frontend CI** — builds the Vite app, then publishes its own Docker image

## Known Gaps

Kept visible rather than hidden — a few things still marked as in-progress on the live site:

- StockFlow's GitHub/live-demo links are not yet published
- Some projects' "Challenges" / "What I Learned" / "Future Improvements" sections are placeholder text, pending real write-ups
- Visitor/analytics tracking is not yet built

## Author

**Rohit Tarate**
📧 rohit.tarate123@gmail.com
💼 [linkedin.com/in/rohit-tarate09](https://www.linkedin.com/in/rohit-tarate09)
💻 [github.com/rohittarate121](https://github.com/rohittarate121)
