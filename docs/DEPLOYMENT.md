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
| `CODERPUZZLE_REQUIRE_CALIBRATION` | `1` | when `1`, registration, login, and judging return `503` until a calibration file is published; browsing problems and reading statements always work |

The problem set selected this way is what the API serves; selection is a
filesystem path and nothing is fetched at startup.

## Calibration

Judging compares each submission against the problem's reference timing, so
production requires a deployment-local calibration file. With the compose
default `CODERPUZZLE_REQUIRE_CALIBRATION=1`, publish one before serving:

```bash
docker compose exec api python -m app.calibrate
```

The sweep measures every problem × language pair and atomically publishes
`/calibration/calibration.json` (the `coderpuzzle_calibration_data`
volume). A calibration covering most of the set still serves: only the
problem/language pairs it lacks return `503`. For a quick local spin
without one:

```bash
CODERPUZZLE_REQUIRE_CALIBRATION=0 docker compose up --build
```

Resume an interrupted sweep with `--force`; the measured fields, the
resource profiles, and every tuning knob are documented in
[JUDGE-RESOURCES.md](JUDGE-RESOURCES.md).
