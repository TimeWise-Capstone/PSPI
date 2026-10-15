# TimeWise PSPI

UI-focused prototype for the TimeWise Inception release (hardcoded data, no backend).

## Run

```
npm install
npm run dev
```

## Pages

Each page lives in `src/pages/` and is owned by one team member. The sidebar nav is defined in `src/pages.js` and routes in `src/App.jsx`.

| Page | File | Owner |
| --- | --- | --- |
| Dashboard (main page) | `MainDashboard.jsx` | Zain/Nawaf |
| Courses (FA1) | `AcademicIntake.jsx` | Marcel |
| Study Plan (FA2) | `TaskPriority.jsx` | Nawaf |
| Analytics (FA3) | `Dashboard.jsx` | Rowan |
| Resources (FA4) | `ResourceRequest.jsx` | Zain |

## Branch and PR conventions

`main` is protected. Direct pushes to `main` are blocked, so every change goes in through a pull request.

Each team member works on their own lowercase branch:

| Member | Branch |
| --- | --- |
| Rowan | `rowan` |
| Marcel | `marcel` |
| Nawaf | `nawaf` |
| Zain | `zain` |

Branch names are lowercase only. Mixed-case names (`Zain` vs `zain`) cause duplicate branches on Windows and Git.

### Workflow

1. Update your branch from `main` before you start:
   ```
   git checkout your-branch
   git pull origin main
   ```
2. Work in your own file under `src/pages/` and commit often with a clear message that says what changed.
3. Push your branch:
   ```
   git push origin your-branch
   ```
4. Open a pull request into `main` on GitHub.
5. A teammate reviews it. Changes are merged only after the review is approved.
6. After the merge, pull `main` again before your next change.

### Rules

- Do not push to `main` directly.
- Do not review or merge your own pull request.
- Only edit your own page file. If you need to change a shared file (`App.jsx`, `pages.js`, `styles.css`), tell the team first.
- Keep pull requests small and focused on one change.
