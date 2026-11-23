<!-- PR Title Format: #<number> [Type] [Domain] <Title>
     Example:          #101 [Task] [BE] Configure Spotless Plugin & Format Java Codebase
     ⚠️  Set the PR title above — do NOT edit this template heading. -->

### 📋 Description
<!-- Briefly describe what this PR does and why. -->


---

### 🎯 Target Branch Routing

- [ ] **Epic / Fix branch** → targets `main`
- [ ] **Task / Story branch** → targets `epic/<epic-number>`

<!-- Verify your PR base branch matches the routing table in docs/git-workflow.md -->

---

### 🔢 Single-Commit Check

- [ ] This PR contains **exactly 1 commit** (squashed via interactive rebase)
- [ ] Commit message matches: `#<issue-number> <Full Issue Title>`

---

### 🛡️ Architecture & Encapsulation Checks

- [ ] **Backend Encapsulation**: JPA `@Entity` classes, `@Repository` interfaces, and `ServiceImpl` classes are **package-private**
- [ ] **Module Boundaries**: Domain modules (`auth`, `user`, `game`, `shop`) communicate only via public Service interfaces and DTOs
- [ ] **OpenAPI Sync**: If DTOs/controllers were changed, `npm run generate:types` was run to update `frontend/src/api/schema.d.ts`

---

### 🧪 Local Quality Verification

- [ ] **Backend**: `cd backend && ./gradlew clean build` passes
- [ ] **Frontend Typecheck**: `cd frontend && npm run typecheck` passes
- [ ] **Frontend Build**: `cd frontend && npm run build` passes
- [ ] **Docker Stack** *(if applicable)*: `docker compose up --build` boots without errors
