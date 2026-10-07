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

## Error line numbers

Runtime errors carry a structured `error_line` field pointing at the
submission source line where the error occurred. The mechanism is
language-specific:

- **Python**: the harness catches the exception and walks the traceback for
  the innermost `solution.py` frame, emitting `error_line` in the protocol.
- **Java**: compiled with `-g:source,lines` (keeping source-file and
  line-number tables) and `-XX:-OmitStackTraceInFastThrow` (preventing the
  JIT from eliding stacks on repeated throws). The harness walks the stack
  for the deepest `solution.java` frame.
- **Go**: the wrapper's deferred recover calls a helper that scans
  `debug.Stack()` for the first `main.go:NNN` frame past the wrapper
  preamble. The preamble line count is computed at prepare time and baked
  into the generated source as a constant.
- **Rust**: the panic hook prints the source location to stderr before the
  catch_unwind boundary; the worker's decoration extracts it from the
  merged process output.
- **JavaScript/TypeScript**: the wrapper's catch block extracts the line
  from `error.stack` (TypeScript uses `--sourceMap` + node
  `--enable-source-maps` to map compiled frames back to the .ts source).
  The preamble line offset is baked into the wrapper as a constant.
- **C++**: compile errors carry line numbers from the compiler diagnostics.
  Runtime throws use a terminate handler (`execinfo.h` backtrace) plus `-g`
  for addr2line resolution in the worker. C++ is the most limited: the
  exception's stack has unwound by the time the wrapper catches it, so
  runtime throw sites require the terminate-handler path.
- The worker's `_decorate_runtime_error` applies per-language patterns and
  subtracts `PreparedProgram.source_line_offset` (the preamble line count)
  to map generated-file coordinates back to the submitted source.
