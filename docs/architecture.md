# System Architecture

> SuperSnake Reloaded — High-Level Module Boundaries & Design Rules

---

## Overview

SuperSnake Reloaded is a polyglot monorepo with two primary stacks:

| Layer | Technology | Directory |
|-------|-----------|-----------|
| **Backend** | Java 21 · Spring Boot 3 · Gradle · JPA/Hibernate | `/backend` |
| **Frontend** | React 18/19 · TypeScript · Vite · Tailwind CSS 4 | `/frontend` |
| **Infrastructure** | Docker Compose · GitHub Actions CI | `/docker-compose.yml`, `/.github/workflows/` |

---

## 1. Backend — Package-by-Feature Modular Monolith

The backend follows a **package-by-feature** layout where each domain module is a self-contained slice directly under `com.supersnake`:

```
backend/src/main/java/com/supersnake/
├── security/              # Cross-cutting: SecurityConfig, JWT filter & provider
├── auth/                  # Module: Authentication & Registration
│   ├── controller/        #   REST endpoints (/auth/**)
│   ├── service/           #   AuthService interface + impl
│   ├── dto/               #   LoginDto, RegisterDto, UserWithTokenDto
│   └── exception/         #   InvalidCredentialsException
├── user/                  # Module: User Profile, Coins, Stats
│   ├── controller/        #   REST endpoints (/users/**)
│   ├── service/           #   UserService interface + impl
│   ├── db/entity/         #   UserEntity (JPA)
│   ├── db/repository/     #   UserRepository (Spring Data)
│   ├── mapper/            #   Entity ↔ DTO mapping
│   ├── dto/               #   UserDto, ChangePasswordDto
│   └── exception/         #   UserNotFoundException, UserAlreadyExistsException
├── game/                  # Module: Game Engine Configs & Match History
│   ├── service/           #   GameService interface + impl
│   ├── db/entity/         #   GameEntity, GameSettingsEntity (JPA)
│   ├── db/repository/     #   GameRepository (Spring Data)
│   └── dto/               #   GameDto, GameSettingsDto
└── shop/                  # Module: Items, Skins & Inventory
    ├── service/           #   ItemService interface + impl
    ├── db/entity/         #   ItemEntity, InventoryEntity (JPA)
    ├── db/repository/     #   ItemRepository, InventoryRepository (Spring Data)
    ├── mapper/            #   Entity ↔ DTO mapping
    ├── dto/               #   ItemDto, InventoryDto
    └── exception/         #   ItemNotFoundException, ItemAlreadyExistsException
```

### Encapsulation Rules

> [!IMPORTANT]
> These rules govern cross-module access control.

1. **Service implementations are package-private** — Only the service *interface* is `public`. Implementations are hidden from other modules.
2. **Controllers are public** — Expose REST APIs annotated with Springdoc OpenAPI.
3. **DTOs are public** — The only data types allowed to cross module boundaries.

> [!WARNING]
> **Entities, repositories, and mappers are currently `public`** due to the sub-package layout. Each module spreads its internals across separate Java packages (e.g., `user.db.entity`, `user.db.repository`, `user.service`, `user.mapper`), and Java's package-private visibility does not extend to sub-packages. Making these classes package-private would require flattening each module into a single package.
>
> Until a refactor consolidates each module into one package, entities and repositories remain `public` but **must not be imported by other modules**. This is a convention-enforced boundary, not a compiler-enforced one.

### Cross-Module Communication

```text
✅  auth module → calls UserService (public interface) → gets UserDto
❌  auth module → imports UserEntity directly
❌  auth module → injects UserRepository
```

---

## 2. Frontend — React SPA with Canvas Game Engine

The frontend is a single-page application built with React, TypeScript, and Vite:

```
frontend/src/
├── api/                   # OpenAPI-generated contracts (client.ts, schema.d.ts)
├── components/
│   ├── game/              # Canvas game engine (GameCanvas, GameOverModal, Score, TimerBar)
│   ├── Routes/            # PrivateRoute & PublicRoute guards
│   ├── Carousel/          # Skin/Inventory carousel slider
│   ├── DialogWindow/      # General dialog / modal component
│   ├── GameChat/          # Multiplayer room chat
│   ├── PersonalData/      # User profile editing sub-component
│   └── ...                # Header, Menu, MenuButton, Slider
├── pages/                 # Route entry pages (Home, Game, Profile, Shop, ...)
├── hooks/                 # useSnakeEngine — game loop, collision, timers
├── context/               # AuthContext — global auth state & session storage
├── services/              # API service functions wrapping Axios
├── types/                 # Domain type interfaces
└── assets/                # Static images (logo, default avatar)
```

### Frontend Boundary Rules

1. **Game Engine Isolation** — Canvas drawing and collision loops live in `components/game/` and `hooks/useSnakeEngine.ts`. No game logic in page components.
2. **Strict Typings** — Import types from `types/` or `api/schema.d.ts`. No inline `any` or untyped API responses.
3. **Route Protection** — All gameplay and profile routes must be wrapped with `<PrivateRoute>` guards.

---

## 3. API Contract Synchronization (Type Sync)

The backend exposes an OpenAPI 3 spec at runtime. The frontend consumes it via auto-generated TypeScript types:

```mermaid
flowchart LR
    A["Backend DTOs & Controllers"] -->|"Springdoc generates"| B["OpenAPI JSON\n/v3/api-docs"]
    B -->|"npm run generate:types"| C["frontend/src/api/schema.d.ts"]
    C -->|"imports"| D["React Components & Services"]
```

> [!WARNING]
> Whenever a backend DTO or controller changes, you **must** regenerate types and verify the frontend:
> ```bash
> cd frontend && npm run generate:types
> cd frontend && npm run typecheck
> ```

---

## 4. Infrastructure

### Docker Compose Stack

| Service | Port | Description |
|---------|------|-------------|
| Backend | `8080` | Spring Boot REST API + Swagger UI |
| Frontend | `5173` | Vite dev server / Nginx production build |
| H2 Console | `8080/h2-console` | In-memory database browser (dev only) |

### CI Pipeline (GitHub Actions)

| Workflow | Trigger | Jobs |
|----------|---------|------|
| `ci.yml` | Push & PR to `main`, `dev/*` | Backend build/test (Java 21), Frontend typecheck + build (Node 20) |
| `spotless.yml` | PR (all branches) | Java code formatting check |
| `pr-lint.yml` | PR (all branches) | PR title & commit message format validation |
