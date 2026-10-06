# Architecture

CoderPuzzle is three cooperating pieces plus the pluggable problem bank
([PROBLEM-SETS.md](PROBLEM-SETS.md)); this file introduces the moving parts
and where implementation details live.

## Pieces

- **`api/` — the FastAPI app.** Sessions, problems, drafts, run, submit,
  submissions, progress, and the auth-provider catalog. It holds the
  expected answers (they never enter a runner request), compares verdicts,
  and stores history. Auth is a provider interface — password today;
  OAuth, OpenID, and email OTP plug in without new routes
  ([AUTH.md](AUTH.md)).
- **`runner/` — the executor plugins, harnesses, and privilege-split
  sandboxes**, shipped as the pinned toolchain image
  (`ghcr.io/coderpuzzle/coderpuzzle`). Each executor prepares or compiles a
  submission, returns a per-test command, and encodes the neutral testcase
  payload into the typed binary stream
  ([CODECS.md](CODECS.md) is the kind-to-class table). The runner has no
  network, mounts no problem or persistence volumes, and never sees
  expected values.
- **`frontend/` — the React SPA.** Monaco-based editor with real
  IntelliSense ([EDITOR-AUTOCOMPLETE.md](EDITOR-AUTOCOMPLETE.md)), verdict
  and testcase panes, the Solutions tab, and drafts that survive refreshes.
- **`scripts/` — the authoring toolchain and gates** (formatter loaders,
  the starter generator, the static bundle gate, the corpus consistency
  check); [scripts/README.md](../scripts/README.md) is the tooling map.

## Trust boundaries

The assertion system is deliberately outside the execution container:
expected data never crosses to the runner, the runner is networkless and
read-only, every testcase starts a fresh isolated process under a
non-root UID with dropped capabilities and independent resource limits, and
hidden inputs, expected values, and per-case timing never reach the
browser. The full statement — the supervisor's capability set, the compiler
inventory, and what is deliberately trusted — is
[TRUST-BOUNDARIES.md](TRUST-BOUNDARIES.md).

## Judging and timing

Each testcase runs in its own sandboxed process; per-language deadlines are
scaled by a startup benchmark and clamped, and an isolated resource profile
(cpu-isolated, fresh cgroup per case) is available for comparable
measurements. Accepted submissions are additionally scored as a percentage
of the problem's built-in reference algorithm time. The calibration sweep,
the measured fields, and the tuning knobs are in
[JUDGE-RESOURCES.md](JUDGE-RESOURCES.md).

## Persistence

SQLite data lives at `/data/coderpuzzle.sqlite3` in the `coderpuzzle_data`
named volume. Normal `docker compose down` and image rebuilds preserve it.
The judge queue is a separate transient volume and contains no expected
answers.
