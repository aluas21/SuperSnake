## SuperSnake Reloaded — Pull Request Verification Checklist

### 📋 Description
<!-- Provide a brief description of the changes introduced by this PR. -->

---

### 🛡️ Architecture & Encapsulation Checks
- [ ] **Backend Encapsulation**: JPA `@Entity` classes, Spring Data `@Repository` interfaces, and Service Implementation classes are strictly **package-private**.
- [ ] **Module Boundaries**: Domain modules (`auth`, `user`, `game`, `shop`) only communicate via public Service interfaces and DTOs.
- [ ] **OpenAPI Synchronization**: If any DTOs/controllers were changed, `npm run generate:types` was executed to update `frontend/src/api/schema.d.ts`.

---

### 🧪 Local Quality Verification
- [ ] **Backend**: `./mvnw clean test package` passes with zero errors in `/backend`.
- [ ] **Frontend Typecheck**: `npm run typecheck` passes with zero TypeScript diagnostics in `/frontend`.
- [ ] **Frontend Build**: `npm run build` generates production bundle cleanly in `/frontend`.
- [ ] **Docker Stack**: `docker compose up --build` boots up without errors.
