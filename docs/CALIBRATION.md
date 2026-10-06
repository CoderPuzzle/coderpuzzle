# Calibration

Judging compares each submission against the problem's built-in reference
timing, and the per-case deadlines come from the same measurement — so
production runs on a deployment-local **calibration file**: one record per
`(problem, language)` pair, measured on the serving host.

## Requirement semantics

With the compose default `CODERPUZZLE_REQUIRE_CALIBRATION=1`, registration,
login, and judging return `503` until a calibration file is published;
browsing problems and reading statements always work. A calibration that
covers most of the set still serves — only the problem/language pairs it
lacks return `503`. `CODERPUZZLE_REQUIRE_CALIBRATION=0` drops the
requirement entirely for a quick local spin.

## Building it

```bash
docker compose exec api python -m app.calibrate
```

The sweep measures every problem × language pair against the recorded
`reference_solution` and atomically publishes
`/calibration/calibration.json` (the `coderpuzzle_calibration_data`
volume). Resume an interrupted sweep with `--force`; a consecutive-failure
circuit breaker aborts without publishing when the runner host is broken.

Per pair the sweep records the reference wall time, the per-case deadline
(ten times the slowest measured case), and the reference algorithm time —
the denominator of the score ratio (see
[JUDGE-RESOURCES.md](JUDGE-RESOURCES.md) for the measured fields, the
resource profiles, and the tuning knobs). The deadline formula and its
long-tail caveats are in [api-and-cli.md](api-and-cli.md).

## Placement rule

Every problem-bank repository carries its own `calibration/` directory at
the repo root, sibling of `problems/` — one artifact per tree, keeping the
served directory pure bundles. The bank repos
([PROBLEM-SETS.md](PROBLEM-SETS.md)) commit the artifact for review;
deployments serve it from the `coderpuzzle_calibration_data` volume seeded
from that file.

## Production notes

The serving tree and the calibration must agree: a calibration built for
one problem set does not cover a different tree, and a tree that changed
its reference solutions re-runs the sweep (`--force`). The deployment-local
file is an operational artifact — keep it out of the repository and back it
up beside the deployment.
