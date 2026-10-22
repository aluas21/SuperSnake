# Skill: codebase-map

## Backend Map (`/backend`)
- `com.supersnake.app.modules.auth`: authentication endpoints, login/register DTOs, JWT components, security config.
- `com.supersnake.app.modules.user`: user profile DTOs/controller/service/entity/repository and user conversion.
- `com.supersnake.app.modules.game`: game entities, game DTOs, game repository.
- `com.supersnake.app.modules.shop`: item/inventory entities, repositories, service, DTOs, and converters.

## Frontend Map (`/frontend/src`)
- `api/`: generated API schema and contract types.
- `components/`: reusable UI and canvas rendering components.
- `pages/`: routed feature pages such as auth, game, profile, home, and settings flows.
- `hooks/`: custom hooks for game loop and domain behavior.

## Dependency and Boundary Rules
- Keep each backend feature module internally cohesive and avoid direct access to package-private internals from other modules.
- Prefer DTO-based communication at module boundaries.
- Keep frontend page components delegating rendering concerns to `components` and logic concerns to `hooks`.
- Keep generated API types in `src/api` as the shared frontend contract source.
