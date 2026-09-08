# Trust boundaries of the judging pipeline

Who is trusted with what, stated deliberately. This document exists
because the bundle-carried-code move (per-problem `provided/` sources
assembled into every submission) made a previously implicit assumption
explicit; writing it down is the point.

The judge holds no predefined data structures of its own — every
well-known type a bundle's wire needs (`ListNode`, `TreeNode`, ...) is
that bundle's own `provided/` source, self-contained. There used to be
a second, shared `common/` library assembled into every submission
unconditionally; it is gone (docs/CODECS.md documents the wire→class
convention that replaced it). Assembly now reads exactly one
well-known directory.

## The layers

| code | origin | runs | trust class |
| --- | --- | --- | --- |
| runner harness, executors, codecs | the coderpuzzle repo (`runner/`) | inside the sandbox, beside the submission | **framework** — trusted absolutely, versioned with the repo |
| `provided/<language>/` types, oracles & helpers | each problem bundle (`problems/<key>/provided/`) | inside the sandbox, beside the submission | **problem-set content** — same trust as the bundle's own cases |
| the submission | a solver | inside the sandbox, unprivileged | **untrusted** |
| output validators | the coderpuzzle repo (`api/app/validators.py`) | in the API process, after the run | **framework** — same tier as the judge itself |

The validator row deserves its own sentence: a bundle can point at a
validator by name, but it cannot SHIP one — the registry is judge code
reviewed with this repo, running outside any sandbox on already-produced
output. If validators were bundle-carried they would be problem-set
content deciding correctness, which would let case data grade its own
homework. Extending the registry is therefore a coderpuzzle-repo change, and
`judge._compare` refuses unknown names loudly.

Interactive oracles are the deliberate contrast: they must be
problem-specific, so they ship with the bundle and run inside the
sandbox at the same trust tier as its cases. What keeps an oracle from
dominating a case is the same thing that keeps a submission in line —
the query budget and the case's ordinary limits:

- `invocation.query_limit` (default 1 000 000) is handed to the oracle's
  constructor as the budget; enforcing it (decrementing per query,
  raising when exhausted) is the oracle's own code, reviewed with the
  bundle that benefits from it;
- the case's time and memory limits cap the whole confined process —
  oracle, submission, and their interaction — so even an oracle that
  ignores its budget cannot run away.

## What "trusted like cases.json" means

Testcase data has always been problem-author-controlled and has always
run inside (or directly driven) the sandbox. `provided/` sources
occupy exactly that position: they are authored in the problems repo,
reviewed with it, and versioned with it. A malicious author of problem
content can already shape case data; giving that same author a
compiled class does not cross a new boundary — but it does raise the
stakes, which is why this is written down rather than inherited.

Concretely, the existing protections all still apply:

- submissions execute under the unprivileged runtime sandbox (rlimits,
  restricted privileges, no network) — the **submission** is confined
  there;
- `provided/` code is judged code, not judge code: it runs in the same
  confined process as the submission, so a hostile oracle cannot reach
  the worker, the host, or other jobs;
- the framework itself (`runner/`) never executes anything from the
  problems repo beyond what the executors explicitly assemble, and the
  assembly surface is exactly `problems/<key>/provided/<language>/`
  files, concatenated or compiled — never arbitrary paths, never build
  scripts, never a second shared directory.

## What is deliberately NOT done (yet)

- No per-problem resource accounting for `provided/` code beyond the
  submission's own limits — the oracle shares the case's time and
  memory budget, which is the intended constraint.
- No code signing or provenance chain on the problems repo; the git
  history and review process are the provenance. If the problem set is
  ever sourced from third parties, revisit this section first.

## Where the boundary is enforced in code

- `api/app/main.py` `_assembly_sources` — the only place the judge
  request is populated with library sources; it reads exactly one
  well-known directory (`provided/<language>/`) and nothing else.
- `runner/executors/*_interactive.py`, `*_design.py` — assembly is
  concatenation/compilation of the received sources; no path from the
  request is ever executed or included by reference.
- `runner/compiler_sandbox.py` / `runtime_sandbox.py` — the privilege
  split between compiler, runtime, and supervisor.
- **Shared Go build cache (accepted risk).** `go` compiles read and
  write one shared `GOCACHE` (`/tmp/openoj-gocache`, mode 0o1777) so a
  cold stdlib build is paid once, not per submission. A hostile compiler
  could in principle poison cached entries for later submissions (Go's
  read-side integrity check is size+mtime, both writer-controlled);
  the runner has no network and every verdict is recomputed from the
  submission's own output, so the exposure is sabotage of other users'
  compile times/outputs, judged against frozen cases. Accepted as the
  cost of warm Go compiles; the worker sweeps untrusted leftovers from
  `/tmp` between jobs, and a full cache reset is a container restart.
- `runner/leetcode_codecs.py` (Python) and `OpenOJJavaHarness`'s
  reflective codecs (Java) — the two harnesses that are not per-job
  generated source resolve every well-known class from the submission's
  own assembled namespace/classpath at decode/encode time; neither
  holds a definition of its own.
- `api/app/judge.py` + `api/app/validators.py` — validator dispatch:
  names only cross the boundary (a case's expected slot carries
  `{"mode": "validator", "name": ...}`), never validator code; the
  implementation always resolves from the app-side registry.

## Provided code: inspection and override are out of scope by construction

`provided/<lang>/` sources compile and run **in the same process as the
submission** — that is their purpose (self-contained problem content).
Within that trust domain, dynamic languages make both inspection and
override unavoidable: Python/JS sources sit on disk and are one
`inspect`/attribute-write away; Java classes decompile; only the
compiled languages (cpp, go, rust) hide implementations in-process, for
free. This is accepted, not an oversight, because of where verdicts are
decided:

- **The judge never executes in the submission's runtime.** The harness
  serializes whatever the submission returns and `api/app/judge.py`
  compares it against the frozen expected values from `cases.json`.
  Patching a provided class can only change the patcher's own outputs —
  wrong answers, judged wrong. There is no provided-land handle that
  flips a verdict.

The rule that follows — and the one review enforces:

- **Provided code is non-secret by construction.** It may carry data
  structures, utilities, and case carriers the submission is meant to
  use; it may never carry state whose disclosure would answer the
  problem. Hidden state belongs to the judge/harness side, exposed —
  when the genre needs it — only through a mediated interface
  (interactive-style), never as data inside `provided/`.

The one known state-bearing exception is 0843 (`unmask-the-hidden-
word`): its oracle necessarily holds the hidden word at runtime — that
is the genre. In dynamic languages the secret is one attribute read
away, and even faking the verdict record is a plain attribute set.
Accepted risk for a learning site: the only person a cheat deceives is
the cheater, and the alternative (judge-side mediation for every
language) would turn a 20-line guessing-game oracle into a protocol
service. Static analysis of submissions for patching/reflection is
deliberately deferred — detection is cat-and-mouse, and the stakes do
not justify it.
