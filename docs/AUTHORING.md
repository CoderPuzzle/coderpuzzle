# Authoring a problem, end to end

This is the whole loop for creating a new problem for CoderPuzzle. The
toolchain is the runner image — pull it and every step below runs
identically on any machine with Docker; no local compilers, formatters,
or generators are needed.

```bash
docker pull ghcr.io/coderpuzzle/coderpuzzle:latest   # :latest tracks main
alias coderpuzzle='docker run --rm --user 0:0 \
  -v /path/to/coderpuzzle-problems:/tools \
  -v /path/to/my-bundle:/bundle:rw ghcr.io/coderpuzzle/coderpuzzle:latest coderpuzzle'
```

`/tools` is a checkout of the problems repo (its `scripts/gen_starters.py`
is the standard); `/bundle` is the problem directory you are authoring.

## 1. Write the statement

`statement.md`, in the house voice — `# <Title>`, `## Description` with
`### Example N` fenced blocks, `### Constraints` (same numeric domain as
the source of the task, freshly presented), optional `### Follow-up` and
`## Hints`. See `FORMAT.md` in the problems repo for the grammar and
`problems-adapt/0001-0100/0001_pair-sum/statement.md` for the register: plain,
direct, no invented scenarios.

## 2. Declare the language-agnostic signature

`problem.json` carries one schema; every language's code derives from it.
The heart is `invocation`:

```json
{
  "schema_version": 2,
  "reference_solution": "",
  "id": 9999, "slug": "probe-sum", "title": "Probe Sum",
  "difficulty": "Easy", "tags": ["Array"],
  "topics": ["Prefix Sum"], "type": "Algorithms",
  "invocation": {
    "type": "function",            // function | design | interactive | concurrent
    "class_name": "Solution", "method": "probeSum",
    "parameters": [
      {"name": "nums",   "codec": "json", "value_type": {"kind": "array", "items": {"kind": "integer"}}},
      {"name": "target", "codec": "json", "value_type": {"kind": "integer"}}
    ],
    "return_type": {"kind": "integer"}
  },
  "limits": {"time_ms": 1000, "memory_mb": 256, "output_kb": 64}
}
```

The `value_type` kinds are the vocabulary — the full kind list (25 kinds,
including `nary_tree`, `quad_tree`, `nested`, `graph`, `doubly_list`, and
`json` beyond the scalar/array basics) is the table in `CODECS.md`. One
declaration, seven languages — names follow it into
each (go camelCase, rust snake_case) via `entrypoints` when they must
differ.

## 3. Provide testcases and expected results

`cases.json` — `public` cases mirror the statement's examples (exactly
`input` and `expected`), `hidden` cases are the judging corpus. Inputs
and expected values are language-agnostic JSON in the same wire
representation the judge uses:

| structure | representation |
| --- | --- |
| linked list | array of node values, `[]` = empty |
| binary tree | level-order array with `null` for absent children, trailing nulls trimmed |
| graph | adjacency rows by node index, 0-based (`[[2,4],[1,3]]`); row i lists node i's neighbors |
| design problem | `actions` (method names, `params[0]` constructs) + `params` rows |
| interactive | the oracle's construction keys (`grid`, `arr`, …) per its manifest |

Expected values come from a reference implementation you trust — never
by hand. A tiny local script against your own algorithm is the norm.

## 4. Generate the scaffolding

```bash
coderpuzzle gen-starters /bundle/problem.json
```

writes `starter.<ext>` for every offered language from the schema —
signatures, class shells, `raise NotImplementedError` bodies. Copy each
starter to `solution.<ext>`; at this moment solutions equal starters,
awaiting your implementation. (For an interactive problem you also author
`provided/<language>/` — the oracle the judge assembles with every
submission, declared by `invocation.provided.oracle`.)

## 5. Implement the solutions — every offered language

A problem is not done until every language the starters offer has a
solution. Port the algorithm faithfully and idiomatically per language,
matching each starter's public API exactly (constructor names, method
names, signatures). The bank's convention for unimplemented bodies is
`raise NotImplementedError` / `panic!` / `throw` — keep that until the
port lands.

## 6. Format, then judge against your own cases

```bash
coderpuzzle format /bundle/solution.py /bundle/solution.ts ...
coderpuzzle judge /bundle
```

`judge` runs **every** `solution.*` through the real executors — same
toolchain, same assembly of your `provided/` sources, same comparison
semantics as a solver's live submission — and prints per-case pass/fail
per language. **Only when every solution in every language passes every
case is the problem successfully created.**

A failing case is a real verdict: read the status (`wrong_answer`,
`runtime_error`, `time_limit_exceeded`), fix the artifact — solution,
case, or schema — and judge again. When the sweep is green, the bundle
is ready for the problems repo's own `check.py` and review.
