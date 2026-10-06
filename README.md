# CoderPuzzle

CoderPuzzle is a containerized coding judge with a LeetCode-style
class-and-method workflow: pick a problem, write a solution in the browser
editor, run it against the visible examples, submit it to the full hidden
judge, and get calibrated algorithm-time verdicts. Submissions execute in a
locked-down sandbox, problem packages stay outside the application images,
and submission history persists in a Docker volume.

The REST API and the image's authoring CLI are documented in
[docs/api-and-cli.md](docs/api-and-cli.md); the problem-set model in
[docs/PROBLEM-SETS.md](docs/PROBLEM-SETS.md).

## Start it

```bash
docker compose up --build
```

Open <http://localhost:8081>. Ports, environment variables, and the
calibration requirement are covered in
[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) and
[docs/CALIBRATION.md](docs/CALIBRATION.md).

## Adding your problems and solutions

The app serves whatever directory `CODERPUZZLE_PROBLEMS` points at — one
variable selects the tree, nothing is fetched or cached. This repository
ships a five-bundle exemplar set under `problems/` (served by default):
one bundle per typical shape — a plain function problem, a linked-list
parameter, a binary tree, a design class, an interactive oracle — ready
to be read as templates for composing and plugging in new problems. The
selection variable, the layout rules, and how to validate a set are
described in [docs/PROBLEM-SETS.md](docs/PROBLEM-SETS.md); the
authoritative bundle reference is [docs/FORMAT.md](docs/FORMAT.md).

## Authoring a problem

[docs/AUTHORING.md](docs/AUTHORING.md) is the end-to-end loop — statement,
invocation schema, cases, generated scaffolding, per-language solutions —
with the exemplar bundles as worked templates. Validation runs inside the
judge image, not in CI:

```bash
docker run --rm --user 0:0 -v "$PWD":/tools \
  ghcr.io/coderpuzzle/coderpuzzle:latest coderpuzzle check   # static bundle gate
docker run --rm --user 0:0 -v "$PWD":/tools \
  ghcr.io/coderpuzzle/coderpuzzle:latest coderpuzzle judge problems/0001-0100/0001_pair-sum
```

The editor carries real IntelliSense (the TypeScript language worker for
JS/TS, curated method tables with hover and parameter hints for the other
languages) — designed and maintained per
[docs/EDITOR-AUTOCOMPLETE.md](docs/EDITOR-AUTOCOMPLETE.md).

## How it is built

Three cooperating pieces — the FastAPI app, the sandboxed multi-language
runner, and the React editor — plus the tooling in `scripts/` and the
pluggable problem bank. The component tour, the trust model, persistence,
and the judging/timing design are in
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md); the doc index lives there
too.
