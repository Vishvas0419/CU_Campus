# CU Campus – University Services Management System

Modern full‑stack project for university services (complaints, gate pass, mess menu, food ordering), implemented with Spring Boot + MySQL and React. The code is production‑leaning and interview‑ready: environment‑driven config, JWT security, global error handling, Flyway migrations setup, API docs, and tests.

## Architecture

```text
CU Campus Main/
  backend/                 # Spring Boot REST API
    src/main/java/com/cucampus
      auth/                # AuthController, AuthService, DTOs
      complaint/           # Complaint domain (entity, repo, service, controller)
      food/                # Food domain (entities, repos, service, controller)
      gatepass/            # Gate pass domain
      mess/                # Mess menu domain
      security/            # SecurityConfig, JWT filter/provider, user details
      config/              # CORS config, data seeder
      common/              # Exceptions & global ApiExceptionHandler
    src/main/resources
      application.yml      # Base config (env placeholders)
      application-dev.yml  # Dev profile
      application-prod.yml # Prod profile
      db/migration/        # Flyway migrations (V1__baseline.sql provided)
  frontend/                # React app (CRA)
    src/api                # Central axios client + API modules
    .env.development       # REACT_APP_API_URL for dev
    .env.production        # REACT_APP_API_URL for prod
```

## Tech Stack

- Backend: Java 17, Spring Boot 3, Spring MVC, Spring Security, JWT (jjwt), Spring Data JPA, Flyway
- Database: MySQL 8
- Frontend: React 18 (CRA), React Router, Axios, Bootstrap
- Testing: JUnit 5, Mockito, Spring Security Test, Testcontainers (MySQL)
- Docs: springdoc‑openapi (Swagger UI)

## Setup & Run

### Backend

1) Env & profiles

- Set profile: `SPRING_PROFILES_ACTIVE=dev` (local) or `prod` (server)
- Required variables (prod): `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, `CORS_ALLOWED_ORIGINS`, `PORT`
- Dev defaults exist; override via env when needed

2) Start API

```bash
mvn spring-boot:run
```

Swagger UI: http://localhost:8080/swagger-ui.html

### Frontend

1) Configure API URL via `.env.*` (already provided)

```env
REACT_APP_API_URL=http://localhost:8080
```

2) Start app

```bash
npm install
npm start
```

## Security Flow (JWT)

1) `POST /api/auth/login` returns a JWT
2) Frontend stores token (localStorage key: `cu_token`)
3) Axios interceptor adds `Authorization: Bearer <token>`
4) Backend validates JWT via filter; routes secured by roles (e.g., ADMIN, WARDEN)
5) On `401`, client clears token and redirects to `/login`

## Major APIs (high‑level)

- Auth: `POST /api/auth/register`, `POST /api/auth/login`
- User: `GET /api/user/me`, `PUT /api/user/me`
- Complaints: `GET /api/complaints/categories`, `POST /api/complaints`, `GET /api/complaints/my`, `PUT /api/complaints/{id}/status` (ADMIN)
- Gate pass: `POST /api/gatepass`, `GET /api/gatepass/my`, `GET /api/gatepass/pending` (WARDEN), `PUT /api/gatepass/{id}/approve|reject` (WARDEN)
- Mess: `GET /api/mess/menu/today`, `GET /api/mess/menu?date=YYYY-MM-DD`, `POST /api/mess/menu` (ADMIN)
- Food: `GET /api/food/outlets`, `GET /api/food/outlets/{id}/items`, `POST /api/food/orders`, `GET /api/food/orders/my`

OpenAPI docs are available at `/v3/api-docs` and Swagger UI at `/swagger-ui.html`.

## Testing

- Unit examples: `AuthServiceTest`, `ComplaintServiceTest` (Mockito + JUnit 5)
- WebMvc security test: `GatePassControllerSecurityTest` (403/401 checks)
- Testcontainers base (`IntegrationTestBase`) for future DB‑backed tests

Run:

```bash
mvn test
```

## Logging & Error Handling

- Global `ApiExceptionHandler` with structured error codes
- Unexpected errors are logged with an `errorId` and returned as reference in responses
- 401 handled on FE via axios response interceptor

## Features

- Authentication & role‑based authorization (JWT)
- Student complaints (categories, create, list)
- Gate pass requests (student) and approval flows (warden)
- Mess menu (public read; admin upsert)
- Food ordering (outlets, items, orders)

## Future Scope

- Replace baseline with full Flyway migrations (V1__init.sql + deltas)
- Add end‑to‑end integration tests (WebMvc + Testcontainers)
- Add pagination, filtering, and specification queries
- Introduce mapping layer (MapStruct) and request/response versioning
- Add CI (GitHub Actions), Dockerfiles, and docker‑compose for local dev

## Project Explanation (Interview‑ready)

This project demonstrates pragmatic, production‑leaning engineering on a student‑friendly domain. It highlights:

- Clean layering and domain‑oriented packages
- Secure, stateless JWT authentication with role‑guarded endpoints
- Environment‑driven configuration and consolidated CORS
- Repeatable database migrations with Flyway
- Developer ergonomics (Swagger UI, axios client, interceptors)
- A testing baseline (unit + WebMvc + Testcontainers foundation)

Together, these choices show an understanding of scalability, maintainability, and operational readiness while keeping the code approachable for a campus‑services use case.
