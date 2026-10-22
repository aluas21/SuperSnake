# SuperSnake Agent Memory

## Repository Overview
- Backend: Java Spring Boot 3 application in `/backend`.
- Frontend: React 18 + TypeScript + Vite application in `/frontend`.

## Encapsulation Protocol
- Keep JPA `@Entity` classes package-private inside their feature module package whenever cross-module access is not required.
- Keep Spring Data `@Repository` interfaces package-private inside their feature module package whenever cross-module access is not required.
- Keep Service Implementation classes package-private within their feature module.

## Type Sync Mandate
- Run `npm run generate:types` in `/frontend` whenever backend DTOs or API contract changes.

## Verification Commands
- Backend verification: `cd backend && ./mvnw clean test package`
- Frontend verification: `cd frontend && npm run typecheck && npm run build`
