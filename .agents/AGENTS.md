# SuperSnake Reloaded — Core Agent System Memory & Global Rules

## 1. Repository Overview
SuperSnake Reloaded is an enterprise polyglot monorepo featuring a modular game engine and backend architecture:
- **/backend**: Java 21 + Spring Boot 3 modular monolith. Organized into domain modules (`auth`, `user`, `game`, `shop`) with Spring Data JPA, Spring Security (JWT), H2/PostgreSQL-compatible persistence, and Springdoc OpenAPI 3 documentation.
- **/frontend**: React 18 / 19 + TypeScript + Vite + Tailwind CSS single-page application. Features custom HTML5 Canvas game rendering, responsive layouts, modular route guards, and auto-generated API schema typing.

---

## 2. Encapsulation Protocol (Backend Strict Rule)
To prevent tight coupling between domain modules and preserve modular architecture:
- **JPA `@Entity` Classes**: Must have **package-private** visibility (no `public` modifier on class definitions, e.g. `class UserEntity`, `class Game`, `class Item`, `class Inventory`). Entities must NOT be accessed directly across module boundaries.
- **Spring Data `@Repository` Interfaces**: Must have **package-private** visibility (e.g. `interface UserRepository extends JpaRepository<UserEntity, Long>`). Persistence access is restricted to the declaring module.
- **Service Implementation Classes**: Must have **package-private** visibility (e.g. `@Service class UserServiceImpl implements UserService`). Cross-module interactions MUST go through public Service interfaces or DTO contracts.
- **Public Surface Area**: Only public Service interfaces, public DTOs, and REST Controllers (`@RestController`) may be exposed outside their package.

---

## 3. Type Sync Mandate
Whenever any backend DTO or API endpoint contract is added or modified:
1. Ensure the backend application compiles and exposes updated OpenAPI annotations.
2. Run the frontend OpenAPI type generation script:
   ```bash
   cd frontend && npm run generate:types
   ```
3. Update consuming frontend components/services to utilize the generated `src/api/schema.d.ts` types.
4. Run `npm run typecheck` to verify complete type safety across the monorepo boundary.

---

## 4. Verification & Validation Commands

### Backend
- **Compile & Unit Test**:
  ```bash
  cd backend && ./mvnw clean test
  ```
- **Package Application**:
  ```bash
  cd backend && ./mvnw clean test package
  ```

### Frontend
- **Typecheck (TypeScript)**:
  ```bash
  cd frontend && npm run typecheck
  ```
- **Production Build (Vite)**:
  ```bash
  cd frontend && npm run build
  ```

### Full Stack Verification (Docker Compose)
- **Local Multi-Container Stack**:
  ```bash
  docker compose up --build
  ```

---

## 5. Git Workflow Rules

- **Branch naming**: `<issue-type>/<ticket-number>` where `issue-type` is one of: `epic`, `task`, `story`, `fix`. Example: `task/125`. **Do NOT rename branches** after creation.
- **Commit message format**: `#<ticket-number> [<ISSUE-TYPE>] <issue-title>`. Example: `#125 [TASK] Migrate Game Canvas & Leaderboard pages to Tailwind`.
- **One branch per issue/task**: Create a dedicated branch for each ticket; do not reuse branches across issues.
