# Deployment

## Starting the stack

```bash
docker compose up --build
```

Open <http://localhost:8081>. Environment variables (compose level, or a
`.env` file beside `compose.yaml`):

| variable | default | meaning |
| --- | --- | --- |
| `CODERPUZZLE_PORT` | `8081` | published host port for the web UI |
| `CODERPUZZLE_PROBLEMS_PATH` | `./problems` | host directory bind-mounted read-only at `/problems` — see [PROBLEM-SETS.md](PROBLEM-SETS.md) for plugging in a full problem bank |
| `CODERPUZZLE_REQUIRE_CALIBRATION` | `1` | when `1`, registration, login, and judging return `503` until a calibration file is published — see [CALIBRATION.md](CALIBRATION.md) |

The problem set selected this way is what the API serves; selection is a
filesystem path and nothing is fetched at startup.

## Calibration

Production requires a deployment-local calibration file; building,
resuming, and the requirement semantics are documented in
[CALIBRATION.md](CALIBRATION.md).
