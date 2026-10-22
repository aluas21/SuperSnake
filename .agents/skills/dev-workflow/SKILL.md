---
name: dev-workflow
description: Standard development workflow execution guides for building, testing, OpenAPI synchronization, and local multi-container stack deployment.
---

# Developer Workflow & Execution Guide

Follow these exact execution steps to develop, verify, synchronize, and deploy SuperSnake Reloaded.

## 1. Backend Verification
Runs clean compilation, unit tests, and packages the Spring Boot application:
```bash
cd backend && ./mvnw clean test package
```

## 2. OpenAPI Generation
Synchronizes backend REST contracts with the frontend TypeScript declarations:
```bash
# Ensure backend is running locally on port 8080:
# cd backend && ./mvnw spring-boot:run
cd frontend && npm run generate:types
```
*Note: This generates `src/api/schema.d.ts` directly from `http://localhost:8080/v3/api-docs`.*

## 3. Frontend Verification
Verifies strict TypeScript compliance and runs the production Vite build:
```bash
cd frontend && npm run typecheck && npm run build
```

## 4. Local Stack Test (Multi-Container Deployment)
Builds and starts both the Java 21 backend and React 18/19 frontend in unified Docker network:
```bash
docker compose up --build
```
- Frontend UI: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:8080](http://localhost:8080)
- Swagger / OpenAPI UI: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
- H2 Database Console: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
