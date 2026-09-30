# Profile README Audit

Phase 0 audit for `hamzakhan-std25/hamzakhan-std25`, based on the current repository contents and `docs/ARCHITECTURE.md`.

## Current repository

| Path | Current state | Phase 0 decision |
|---|---|---|
| `README.md` | Existing hand-written profile README with badges, project bullets, activity graph, contribution snake, and contact links | Replace in the planned README phase; preserve the snake reference and migrate supported facts only |
| `docs/ARCHITECTURE.md` | Present runbook and source of truth | Reuse as the governing specification |
| `.github/workflows/snake.yml` | Existing scheduled contribution-snake workflow | Keep untouched |
| `assets/` | Not present | Add during asset-generation phases; resume PDF remains a manual prerequisite |
| `data/` | Not present | Add in Phase 1 with the documented profile data |
| `scripts/` | Not present | Add in later generation and validation phases |
| `.github/copilot-instructions.md` | Not present | Add verbatim in Phase 1 |
| `package.json` | Not present | Add in Phase 1; no validation command exists yet |
| `.github/workflows/metrics.yml` | Not present | Add in Phase 6 after checking the action input names |
| `.github/workflows/validate.yml` | Not present | Add in Phase 6 |

## Existing README image URLs

These are all external image URLs currently referenced by `README.md`:

| URL | Use |
|---|---|
| `https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61dafb` | React badge |
| `https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white` | Next.js badge |
| `https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white` | Tailwind CSS badge |
| `https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white` | Node.js badge |
| `https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white` | Express badge |
| `https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white` | MongoDB badge |
| `https://img.shields.io/badge/Firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black` | Firebase badge |
| `https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white` | Git badge |
| `https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white` | GitHub badge |
| `https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white` | Docker badge |
| `https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white` | Vercel badge |
| `https://github-readme-activity-graph.vercel.app/graph?username=hamzakhan-std25&theme=github-dark` | Activity graph |
| `https://raw.githubusercontent.com/hamzakhan-std25/hamzakhan-std25/output/github-contribution-grid-snake-dark.svg` | Dark contribution snake |
| `https://raw.githubusercontent.com/hamzakhan-std25/hamzakhan-std25/output/github-contribution-grid-snake.svg` | Light contribution snake; also the fallback image |
| `https://github-readme-stats.vercel.app/api?username=hamzakhan-std25&show_icons=true&theme=github_dark` | Commented-out GitHub stats image |
| `https://github-readme-stats.vercel.app/api/top-langs/?username=hamzakhan-std25&layout=compact&theme=github_dark` | Commented-out top-languages image |
| `https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white` | LinkedIn contact badge |
| `https://img.shields.io/badge/Portfolio-000?style=for-the-badge&logo=vercel&logoColor=white` | Portfolio contact badge |
| `https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white` | Email contact badge |

The planned README should remove the third-party activity graph and badge-image dependency. The snake image should remain referenced from the `output` branch, as required by the runbook. The commented-out stats URLs are not active content and should not be restored.

## Existing workflow inventory

### `.github/workflows/snake.yml`

- Name: `Generate Snake`.
- Runs every 12 hours and supports manual dispatch.
- Uses `Platane/snk@v3` for GitHub user `hamzakhan-std25`.
- Publishes `github-contribution-grid-snake.svg`, its dark variant, and a GIF to the `output` branch through `crazy-max/ghaction-github-pages@v3.1.0`.
- Uses `GITHUB_TOKEN` only through the workflow environment.
- Reuse decision: keep the file, schedule, output branch, generated filenames, and README snake URLs unchanged. Do not edit or delete this workflow.

No `metrics.yml` or `validate.yml` exists yet.

## Reuse and migration notes

- Reuse the existing GitHub identity, LinkedIn URL, email address, and snake workflow.
- Replace the current generic/badge-heavy presentation with the architecture-defined local SVG assets, Markdown details, project links, Mermaid diagrams, and accessibility text.
- Replace the obsolete portfolio URL `https://hamzakhan-std25.github.io/Portfolio-html-css/` with `TODO_PORTFOLIO_URL` until Hamza supplies the current portfolio URL. Do not carry the obsolete URL into the new README.
- Remove the unconfirmed “Kia Motors Metropolis” project unless Hamza confirms it; it is not in the architecture facts.
- Do not restore claims such as “MERN” as a project-wide identity unless they are supported by the architecture facts. Use the documented title and stack descriptions.

## Risks and open prerequisites

1. The portfolio URL is unknown and must remain `TODO_PORTFOLIO_URL` in data until supplied.
2. The resume file `assets/Hamza_Khan_CV.pdf` is not present and must be added manually with the documented typo correction.
3. ProfileIQ has no confirmed repository URL; omit its Code link and label planned TikTok/AI functionality as in development.
4. The metrics workflow requires Hamza to create the `METRICS_TOKEN` repository secret. A local placeholder metrics SVG is needed before that first run.
5. The current README relies on external image hosts and does not provide the planned local assets, architecture diagrams, validation, or image-disabled fallback content.
6. The existing snake workflow writes to the `output` branch; README migration must preserve those exact generated paths.
7. The current README includes a project and portfolio link that conflict with the runbook’s source of truth.

## Phase 0 result

Only this audit file is added in Phase 0. No existing README, workflow, or source file was modified. `npm run validate` cannot run yet because `package.json` and the validation script are intentionally deferred to Phase 1 and Phase 6.