---
name: codebase-map
description: Map backend and frontend modules, directory layout, and architectural boundary rules for SuperSnake Reloaded.
---

# Codebase Map & Boundary Rules

This skill outlines the codebase architecture, module responsibilities, directory structure, and access rules for SuperSnake Reloaded.

## 1. Backend Module Architecture (`/backend`)

The backend follows a Spring Boot 3 modular package structure located under `com.supersnake`:

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

### Backend Boundary & Encapsulation Rules:
1. **Service Implementations are package-private**: Expose only the service interface (`public interface UserService`) when cross-module calls are needed.
2. **Controllers are public**: Expose REST APIs with OpenAPI annotations.
3. **DTOs are public**: The only data types allowed to cross module boundaries.
4. **Entities, Repositories, and Mappers**: Currently `public` due to sub-package layout (Java package-private does not extend to sub-packages). **Must not be imported by other modules** — this is a convention-enforced boundary.

---

## 2. Frontend Module Architecture (`/frontend`)

The frontend is a React 18 / 19 single-page application built with TypeScript, Vite, and Tailwind CSS:

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

### Frontend Boundary Rules:
1. **Game Engine Isolation**: Canvas drawing functions and collision loops should be isolated in `components/game/` and `hooks/useSnakeEngine.ts`.
2. **Strict Typings**: Type definitions should be imported from `types/` or `api/schema.d.ts`.
3. **Route Protection**: All gameplay and profile routes must be wrapped with `<PrivateRoute>` guards.
