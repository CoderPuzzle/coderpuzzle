# Problem bundle format

Each CoderPuzzle problem is one directory under a problem-set root such as
this repository's `problems/`, named `<zero-padded id>_<slug>`,
inside an inclusive id-range shard directory of 100 problems
(`<lo>-<hi>`, e.g. `0001-0100` for ids 1-100) — the directory name is
the single source of the problem key:

```text
problems/
└── 0001-0100/           inclusive id-range shards of 100
    └── 0001_two-sum/
        ├── problem.json     machine data: metadata, invocation, limits
        ├── cases.json       testcase corpus ({public, hidden} display grouping)
        ├── statement.md     the human-readable problem statement
        ├── starter.py       generated — never handcrafted
        ├── starter.java     generated
        ├── starter.cpp      generated
        ├── starter.go       generated
        ├── starter.rs       generated
        ├── starter.js
        ├── starter.ts
        ├── solution.py      authored — must match the starter signature and pass
        ├── solution.java    every case in cases.json
        └── ...
```

Starters are always generated from `problem.json` by
`scripts/gen_starters.py`. Editors handwrite only non-derived content: the
statement, the invocation schema, the cases, and the solution bodies.
Solutions are authored on top of the generated starters.

## problem.json

```json
{
    "schema_version": 2,
    "reference_solution": "",
    "id": 1,
    "slug": "two-sum",
    "title": "Two Sum",
    "difficulty": "Easy",
    "tags": ["Array", "Hash Table"],
    "topics": ["Array", "Hash Table"],
    "type": "Algorithms",
    "invocation": { "...": "see below" },
    "limits": { "time_ms": 1500, "memory_mb": 256, "output_kb": 64 }
}
```

- `id` matches the numeric directory prefix; `slug` and `title` match the
  directory and the statement's `# Title` heading.
- `reference_solution` designates the time-cost baseline: `""` names the
  canonical `solution.<ext>` files, a variant slug names
  `solution_<variant>.<ext>`. It is always the optimal approach — the
  section the worst-to-best `solutions.md` ordering ends with — and the
  judge runs exactly this one reference alongside the submission when
  scoring the time-cost percentage.
- `difficulty` is the original source difficulty — one of `Easy`,
  `Medium`, `Hard`, mirrored from the upstream crawl catalog (never a
  re-evaluation); `tags` is a non-empty array of strings.
- `topics` is a non-empty array naming the techniques the problem tests,
  from the upstream crawl's LeetCode topic vocabulary; it classifies the
  bank for browsing and is not consumed by the judge.
- `type` is one of `Algorithms` (programming-language bundles),
  `Database` (SQL), or `Shell`, mirroring `invocation.type`.
- `invocation.type` is `function`, `sql`, `shell`, `design`, `interactive`,
  or `concurrent`.

### Function invocation

LeetCode-style, with a neutral `value_type` tree shared by every language:

```json
{
    "type": "function",
    "class_name": "Solution",
    "method": "twoSum",
    "parameters": [
        {
            "name": "nums",
            "codec": "json",
            "value_type": {
                "kind": "array",
                "items": { "kind": "integer", "bits": 32 }
            }
        },
        {
            "name": "target",
            "codec": "json",
            "value_type": { "kind": "integer", "bits": 32 }
        }
    ],
    "return_codec": "json",
    "return_type": {
        "kind": "array",
        "items": { "kind": "integer", "bits": 32 }
    },
    "entrypoints": { "go": "twoSum", "rust": "two_sum", "typescript": "twoSum" },
    "comparison": "exact"
}
```

- `kind` is one of `integer` (`bits` 32 or 64), `number` (finite float),
  `boolean`, `string` (UTF-8), `array` (with `items`), `linked_list`,
  `binary_tree`, `nary_tree`, `quad_tree`, `nested` (NestedInteger),
  `next_tree` (parent/next tree), `circular_list`, `doubly_circular`,
  `multi_list` (LC 430 child chains), `alias_list` (LC 160 intersection,
  with a non-negative `alias` naming the parameter it splices into),
  `graph`, `random_list` (each optionally naming a provided `class`),
  `doubly_list` (LC 3263, optional provided `class`), `doubly_list_node`
  (LC 3294, wire `{"values": [...], "node": v}`, optional provided
  `class`), `random_tree` (LC 1485, optional provided `class`),
  `special_tree` (LC 2773 leaf ring on a `TreeNode` display),
  `nary_tree_nodes` (LC 1506 node-list handover), `nary_tree_ref` (LC
  1516, value + `alias` naming the `nary_tree` parameter it resolves
  into), `json` (generic any-shaped value; JavaScript/TypeScript only),
  or `struct` (a provided record class with declared `fields`). The node
  kinds take integer `items` (32-bit by convention across these node
  types) and may omit the implied spec. The wire formats and per-kind
  serialization invariants are documented in the coderpuzzle repo's
  `docs/CODECS.md`.
- `entrypoints` override the entry name per language (Go/Rust/TypeScript
  follow their casing conventions; Python/Java/C++/JavaScript use `method`).
  Keying differs by invocation type: function invocations use plain
  language keys (`{"go": "twoSum"}`); design invocations key per method
  (`{"go.solve": "Solve"}`) because one design class carries many methods;
  interactive invocations use plain language keys again (one entry per
  language).
- `comparison` is `exact` (default), `sorted`, `multiset`, or `set`. Anything
  but `exact` must be justified by the statement ("in any order").

### SQL invocation

```json
{
    "type": "sql",
    "parameters": [{ "name": "dataset", "codec": "sql_setup" }],
    "return_codec": "rows",
    "comparison": "set"
}
```

The table DDL lives in `invocation.sql.schema`; each case's `dataset` value
seeds the tables with `INSERT` statements.

### Shell invocation

```json
{ "type": "shell", "comparison": "exact" }
```

The submission is a bash script; each case's input is the raw file text
fed on stdin, and the script's stdout (trailing newlines stripped) is the
expected value — stored without its trailing newline. Starters are
`starter.sh` only, solutions `solution*.sh`; wire details live in the
coderpuzzle repo's `docs/CODECS.md`.

### Design and interactive invocations

Design problems declare `class_name`, `constructor.parameters`, and
`methods`; each case's `input` is an `{"actions": [...], "params": [...]}`
sequence. Interactive problems declare `parameters`, `provided.oracle`
(`class`, `construct`, `auxiliary`), and `query_limit`; an out-buffer
parameter carries `out_buffer.capacity_from`. Both run in every language
the bundle offers. Full wire contracts, the per-language oracle
construction table, and the statistical/validator judging modes live in
the coderpuzzle repo's `docs/CODECS.md`.

Every class a problem's wire needs — `ListNode`, `TreeNode`, and the
rest of the coderpuzzle repo's `docs/CODECS.md` wire→class table, a named
graph/list node, a struct record, a design class's helper types, an
interactive oracle — ships as source under the bundle's own
`provided/<language>/`. There is no shared library: the judge holds no
predefined data structures of its own, so every bundle is
self-contained. Copy a well-known type's shape from a sibling bundle
using the same kind — never hand-invent one, never share a definition
across bundles. These sources are problem-set content (see the coderpuzzle
repo's `docs/TRUST-BOUNDARIES.md`), assembled into every submission by
the judge, and they follow each language's assembly rules (Rust sources
use fully-qualified paths and no `use` lines; positional construction
matches declared field/parameter order in every language).

## cases.json

```json
{
    "public": [{ "input": [[2, 7, 11, 15], 9], "expected": [0, 1] }],
    "hidden": [{ "input": [[3, 2, 4], 6], "expected": [1, 2] }]
}
```

`input` is the positional argument array (design problems use an
`{"actions": [...], "params": [...]}` sequence instead). `public` cases are
the statement's examples and are shown in the problem pane; `hidden` cases
are everything else. **The grouping is display-only — all case data is public
by design.** This is a self-hosted, self-motivated learning framework:
nothing is secret. Every `expected` value must be produced by running a
reference solution, never hand-computed. A bundle normally has at least ten
cases across the two display groups. A smaller suite is valid when it exhausts
a finite single-integer input domain.

## statement.md

Pure prose, one required grammar:

````text
# <Title>                       required — no numbering
## Description                  required
### Example N                   required (N counts from 1), a ```text block
### Constraints                 required, bullet list (#### Constraint N optional)
### Follow-up                  optional
## Hints                        optional
### Hint 1, ### Hint 2, …       hints, when present, use this form
````

The `# <Title>` heading must equal `problem.json`'s `title`. Example inputs
must correspond one-to-one, in order, to the `public` cases. SQL problems
state their contract as the schema DDL, so `### Constraints` is optional for
them and required for every function problem.

## Starters and solutions

`scripts/gen_starters.py` writes `starter.*` from `problem.json`; the file
extension selects the language (`py`, `js`, `ts`, `java`, `cpp`, `go`,
`rust`, `sql`, `sh`). The set of `starter.*` files defines the
languages the problem offers. Never edit a starter by hand — change
`problem.json` and regenerate.

Every problem must carry `solution.<ext>` for **every** `starter.<ext>`. A
solution matches its starter's signature exactly and must pass every case in
`cases.json`; `scripts/check.py` and `coderpuzzle judge` run the whole
corpus, while a served submission judges a bounded subset of it
(docs/api-and-cli.md).

## Formatting

Every file in the repository is formatted by **one toolchain, owned by the
coderpuzzle runner image**: `coderpuzzle/runner/formatters.py` (in the coderpuzzle repo)
holds the implementation and every version pin, and this repo's
`scripts/format.py` is only a loader that imports it — from inside the
image in CI, or from a sibling coderpuzzle checkout locally (`CODERPUZZLE_RUNNER_DIR`
to point elsewhere). Generation (`gen_starters.py`), checking
(`check.py`), CI, the editor's Format button, and the `coderpuzzle format` CLI
all format through that single module, so output is byte-identical
everywhere. This repo deliberately tracks no formatter pins or
`node_modules` of its own (a gitignored `node_modules/.bin` may exist
for sibling-checkout formatting runs; the tracked `package.json` pins
its three packages to the image's exact versions so a local
`npm install` cannot drift the gate).

| Files    | Formatter                                 | Language key in formatters.py |
| -------- | ----------------------------------------- | ----------------------------- |
| `*.py`   | `ruff format` (line length 120)           | `python3`                     |
| `*.go`   | `gofmt`                                   | `go`                          |
| `*.rs`   | `rustfmt --edition 2021` (width 120)      | `rust`                        |
| `*.cpp`  | `clang-format` (LLVM style, indent 4)     | `cpp`                         |
| `*.js`   | `prettier`                                | `javascript`                  |
| `*.ts`   | `prettier`                                | `typescript`                  |
| `*.java` | `prettier` + `prettier-plugin-java`       | `java`                        |
| `*.sql`  | `sql-formatter` (sqlite dialect)          | `sql`                         |
| `*.sh`   | `shfmt` (`-ln bash -i 4`)                 | `shell`                       |
| `*.json` | canonical 2-space JSON + trailing newline | `json`                        |
| `*.md`   | `prettier` (`proseWrap: preserve`)        | `markdown`                    |

Tool versions are pinned in the runner image's Dockerfile (the same build
the editor's Format button runs on). Run `python3 scripts/format.py` to
format everything or `--check` to verify without writing; equivalently,
from the image:

```bash
docker run --rm --user 0:0 -v "$PWD":/repo:rw \
  ghcr.io/coderpuzzle/coderpuzzle:latest coderpuzzle format --check /repo/problems /repo/docs/FORMAT.md
```

When you add or edit a solution, run the formatter before pushing — CI
rejects unformatted files.

## Checking

```bash
python3 scripts/check.py --problems=all
python3 scripts/check.py --problems=0001_two-sum,0002_add-two-numbers
```

The static tier (bundle completeness, schema conformance, statement grammar,
duplicate ids/slugs, `solution.* ⊇ starter.*`, starter generator round-trip)
always runs over the whole set regardless of the filter. The runtime tier
(executing each selected problem's solutions against its cases through
CoderPuzzle) runs only on the selected problems. CI runs the static tier
over the whole `problems/` tree on every relevant push (with the format
check), and a sharded judge sweep of every bundle on demand and weekly.
`scripts/verify_solution.py` remains the focused local gate for one bundle.
