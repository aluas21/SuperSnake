---
name: codebase-map
description: Map backend and frontend modules, directory layout, and architectural boundary rules for SuperSnake Reloaded.
---

# Codebase Map & Boundary Rules

This skill outlines the codebase architecture, module responsibilities, directory structure, and access rules for SuperSnake Reloaded.

## 1. Backend Module Architecture (`/backend`)

The backend follows a Spring Boot 3 modular package structure located under `com.supersnake.app`:

```
backend/src/main/java/com/supersnake/app/
├── SnakeApplication.java                # Spring Boot Entry Point (@SpringBootApplication)
├── shared/                              # Shared cross-cutting components
│   ├── exception/                       # Common domain exceptions
│   └── security/                        # SecurityConfig, JWT Filter, Token Provider
└── modules/
    ├── auth/                            # Module: Authentication & Registration
    │   ├── AuthController.java          # REST: /auth/login, /auth/register
    │   ├── AuthService.java             # Public service interface
    │   ├── AuthServiceImpl.java         # Package-private service implementation
    │   └── dto/                         # LoginDto, RegisterDto, UserWithTokenDto
    ├── user/                            # Module: User Profile, Coins, Stats
    │   ├── UserController.java          # REST: /users/**
    │   ├── UserService.java             # Public service interface
    │   ├── UserServiceImpl.java         # Package-private service implementation
    │   ├── UserEntity.java              # Package-private JPA Entity (@Table "users")
    │   ├── UserRepository.java          # Package-private Spring Data Repository
    │   ├── UserConvertor.java           # Internal entity <-> DTO mapper
    │   └── dto/                         # UserDto, ChangePasswordDto
    ├── game/                            # Module: Game Engine Configs & Match History
    │   ├── Game.java                    # Package-private JPA Game Entity
    │   ├── GameSettings.java            # Package-private JPA GameSettings Entity
    │   ├── GameRepository.java          # Package-private Spring Data Repository
    │   ├── GameService.java             # Public service interface
    │   ├── GameServiceImpl.java         # Package-private service implementation
    │   └── dto/                         # GameDto, GameSettingsDto
    └── shop/                            # Module: Items, Skins & Inventory
        ├── Item.java                    # Package-private JPA Item Entity
        ├── Inventory.java               # Package-private JPA Inventory Entity
        ├── ItemRepository.java          # Package-private Spring Data Repository
        ├── InventoryRepository.java     # Package-private Spring Data Repository
        ├── ItemService.java             # Public service interface
        ├── ItemServiceImpl.java         # Package-private service implementation
        ├── ItemConvertor.java           # Internal entity <-> DTO mapper
        └── dto/                         # ItemDto, InventoryDto
```

### Backend Boundary & Encapsulation Rules:
1. **No direct Entity references across modules**: Entities must be package-private to their module slice. Cross-module references must use primitive IDs (e.g., `userId: Long`) or DTOs.
2. **Repositories are package-private**: Never make `@Repository` interfaces `public`. All database operations are encapsulated in their respective module service.
3. **Service Implementations are package-private**: Expose only the service interface (`public interface UserService`) when cross-module calls are needed.
4. **Controllers are public**: Expose REST APIs with OpenAPI annotations.

---

## 2. Frontend Module Architecture (`/frontend`)

The frontend is a React 18 / 19 single-page application built with TypeScript, Vite, and Tailwind CSS:

```
frontend/src/
├── api/                                 # OpenAPI generated contracts
│   ├── client.ts                        # Axios HTTP client configuration
│   └── schema.d.ts                      # Generated TypeScript schema from backend OpenAPI
├── components/                          # Reusable UI & Game components
│   ├── game/                            # Canvas game engine components
│   │   ├── GameCanvas.tsx               # HTML5 2D Canvas rendering grid, snake, apples, coins
│   │   ├── GameOverModal.tsx            # Modal displayed upon snake collision
│   │   ├── Score.tsx                    # Score, Coins, Cash display panel
│   │   └── TimerBar.tsx                 # Real-time bonus duration progress bar
│   ├── Carousel/                        # Skin/Inventory carousel slider
│   ├── DialogWindow/                    # General dialog / modal component
│   ├── GameChat/                        # Multiplayer room chat component
│   ├── GameRoomInfo.tsx                 # Match room code and player status
│   ├── Header.tsx                       # Global navigation header with avatar & title
│   ├── Menu.tsx                         # Menu button layout grid/list
│   ├── MenuButton.tsx                   # Interactive tile menu button
│   ├── PersonalData/                    # User profile editing sub-component
│   ├── Routes/                          # Protected & Public route guards
│   └── Slider.tsx                       # Range slider configuration widget
├── pages/                               # Route entry pages
│   ├── Game/                            # Game page (/game)
│   ├── Profile/                         # Profile management (/profile)
│   ├── GameModes.tsx                    # Game mode selection (/game-modes)
│   ├── GameSettings.tsx                 # Game options & lobby (/game-settings)
│   ├── Home.tsx                         # Dashboard home (/home)
│   ├── Login.tsx                        # Login page (/login)
│   ├── Register.tsx                     # Registration page (/register)
│   ├── Shop.tsx                         # Shop / Inventory page (/shop)
│   └── Logout.tsx                       # Session termination page (/logout)
├── hooks/                               # Custom hooks
│   └── useSnakeEngine.ts                # Modular hook isolating game loop, collision, timers
├── context/
│   └── AuthContext.tsx                  # Global authentication state & session storage
├── services/
│   └── api.ts                           # API service functions wrapping Axios
├── types/
│   └── userTypes.ts                     # User and domain interfaces
├── assets/                              # Static image assets (app logo, default avatar)
├── App.tsx                              # React Router route tree
├── main.tsx                             # Application bootstrapping
└── index.css                            # Tailwind CSS 4 root styles
```

### Frontend Boundary Rules:
1. **Game Engine Isolation**: Canvas drawing functions and collision loops should be isolated in `components/game/` and `hooks/useSnakeEngine.ts`.
2. **Strict Typings**: Type definitions should be imported from `types/` or `api/schema.d.ts`.
3. **Route Protection**: All gameplay and profile routes must be wrapped with `<PrivateRoute>` guards.
