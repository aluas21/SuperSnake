# Skill: dev-workflow

## Step-by-step execution guide
1. Backend Verification
   - `cd backend && ./mvnw clean test package`
2. OpenAPI Generation
   - `cd frontend && npm run generate:types`
3. Frontend Verification
   - `cd frontend && npm run typecheck && npm run build`
4. Local Stack Test
   - `docker compose up --build`
