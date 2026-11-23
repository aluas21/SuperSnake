# Git Workflow & Branching Ruleset

> SuperSnake Reloaded — Engineering Team Standard

---

## 1. Issue Naming & Project Board Structure

All tickets in GitHub Projects follow a strict bracketed title schema for instant visual scanning:

```
[<Type>] [<Domain>] <Imperative Action Title>
```

| Type | Prefix | Purpose & Scope | Example Title |
|------|--------|----------------|---------------|
| Epic | `[EPIC]` | High-level feature container or architecture milestone | `[EPIC] [BE] Architecture Modernization` |
| Task | `[TASK]` | Technical setup, maintenance chore, or engineering task | `[TASK] [BE] Configure Spotless Plugin` |
| Story | `[STORY]` | End-user visible feature deliverable | `[STORY] [FE] Add 2-Player Canvas Controls` |
| Bug | `[BUG]` | Defect or unexpected runtime behavior fix | `[BUG] [BE] Token Refresh 401 Error` |

> [!NOTE]
> Use `[BE]` for Backend, `[FE]` for Frontend, or omit the domain tag if cross-cutting (e.g., CI/CD).
> Tasks and Stories must be linked as native **Sub-issues** under their parent Epic.

### Project Board Views

The GitHub Projects board uses **two views**:

| View | Purpose |
|------|---------|
| **Board** | Kanban columns (`Backlog → In Progress → In Review → Done`) for sprint tracking |
| **Table** | Flat list with sortable fields (Assignee, Priority, Epic link) for backlog grooming |

---

## 2. Branch Naming & Target Branch Routing

Branch names must be concise and strictly adhere to `<type>/<issue-number>` — **no description text**.

| Branch Type | Naming Syntax | Target Branch (PR into) | Branch Off From |
|-------------|--------------|------------------------|-----------------|
| Epic Branch | `epic/<number>` | `main` | `main` |
| Fix / Bug Branch | `fix/<number>` | `main` | `main` |
| Task Branch | `task/<number>` | `epic/<epic-number>` | `epic/<epic-number>` |
| Story Branch | `story/<number>` | `epic/<epic-number>` | `epic/<epic-number>` |

> [!IMPORTANT]
> **Never** push directly to `main` or `epic/*` branches. All changes go through Pull Requests.

### Examples

```text
epic/116          → PR targets main
task/120          → PR targets epic/116
story/125         → PR targets epic/116
fix/134           → PR targets main
```

---

## 3. Mandatory Pre-PR Workflow (Rebase & Single Commit)

Before opening a Pull Request, you **must** rebase onto your target branch and perform an interactive rebase locally so your branch contains **exactly 1 squashed commit**.

### Why Rebase BEFORE Pushing/Opening a PR?

| Reason | Explanation |
|--------|-------------|
| **Prevents Hidden CI Breaks** | Tests run against the exact target code, preventing broken builds upon merge |
| **Eliminates PR Merge Conflicts** | All conflicts are resolved locally in your editor prior to code review |
| **Avoids Force-Push Friction** | Pushing un-rebased code requires forced pushes later, disrupting active reviews |

### Command Execution

Example for `task/101` targeting `epic/100`:

```bash
# 1. Fetch latest remote branches
git fetch origin

# 2. Rebase onto target branch (main for fix/epic, epic/100 for task/story)
git rebase origin/epic/100

# 3. Interactively squash working commits into 1 single commit
git rebase -i HEAD~3
# → Keep first commit as 'pick', change rest to 'squash' (or 's')

# 4. Push clean single-commit branch to remote
git push -u origin task/101
```

---

## 4. PR & Squash Commit Rules

| Rule | Detail |
|------|--------|
| **PR Header Check** | GitHub PR must state **"1 commit"** before requesting review |
| **Merge Strategy** | Always select **Squash and Merge** on GitHub |
| **Final Commit Format** | `#<Issue Number> <Full Issue Title>` |

**Example final commit message:**

```
#101 [Task] [BE] Configure Spotless Plugin & Format Java Codebase
```

> [!NOTE]
> GitHub's squash-and-merge uses the **PR title** as the commit message (when the repo is configured with *"Pull request title"* as the default squash commit message). Ensure your PR title matches the format `#<number> <Full Issue Title>` exactly.

---

## 5. Handling PR Review Feedback

If changes or bug fixes are requested during code review, follow this 3-step workflow to preserve the single-commit rule:

### Step 1 — Commit Fixes Locally

```bash
# Implement requested changes, then commit
git commit -m "fix review comments"
```

### Step 2 — Rebase & Squash

```bash
# Interactively rebase to combine the fix into your original commit
git rebase -i HEAD~2
# → Keep first commit as 'pick', change second to 'squash' (or 's')
```

### Step 3 — Safely Force Push

```bash
# Push the updated single commit to remote
git push --force-with-lease
```

> [!CAUTION]
> Always use `--force-with-lease` instead of plain `--force` to ensure you never accidentally overwrite remote commits pushed by a teammate.

---

## Quick Reference Cheat Sheet

```text
1.  git fetch origin
2.  git rebase origin/<target-branch>
3.  git rebase -i HEAD~<n>           # squash to 1 commit
4.  git push -u origin <branch>      # first push
    git push --force-with-lease      # subsequent pushes after squash
```
