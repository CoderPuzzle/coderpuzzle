# Problem sets

**A problem set is always a directory on disk.** The app fetches nothing:
there is no remote problem set, no clone, no cache. One variable selects the
tree, and the bank is pluggable — pointing the variable at a different
checkout serves a different corpus.

- `CODERPUZZLE_PROBLEMS` — the path the app reads inside its container
  (compose sets it to `/problems`).
- `CODERPUZZLE_PROBLEMS_PATH` — the host path compose bind-mounts there
  (default `./problems`).

The path must name an existing directory and it is the package root — the
directory whose children are the id-range shards. Anything else (a GitHub
`owner/name`, a git URL, a missing path) is a startup error rather than
something the app goes and fetches.

```bash
docker compose up --build                                                # default: ./problems
CODERPUZZLE_PROBLEMS_PATH=/absolute/path/to/other-set docker compose up --build
CODERPUZZLE_PROBLEMS=/srv/problem-sets/lc uvicorn app.main:app           # outside compose
```

## The trees

| repository | contents | role |
| --- | --- | --- |
| this repo's `problems/` | five exemplar bundles | served when nothing is configured; the templates for writing new problems |
| [`CoderPuzzle/lc-original`](https://github.com/CoderPuzzle/lc-original) | the complete 4,031-bundle original-source corpus | the tree production serves |
| [`CoderPuzzle/lc-adapt`](https://github.com/CoderPuzzle/lc-adapt) | the copyright-free adaptation (modern Python) | the working adaptation tree |

The exemplar set covers the typical bundle shapes, one each: a plain
function problem with no hidden types (`0001_pair-sum`), a linked-list
parameter (`0025_reverse-in-groups-of-k`), a binary tree
(`0104_binary-tree-height`), a design class over the `NestedInteger` API
(`0341_nested-sequence-iterator`), and an interactive problem with a
provided oracle (`0278_first-failing-build`). Read them beside
[docs/AUTHORING.md](AUTHORING.md) when writing a new problem — each shows
the statement grammar, the invocation schema, the case layout, the
per-language solutions, and the `provided/` assembly its shape needs.

## Getting a set onto a host

Getting a problem set onto a host is an explicit operator step, not
something the service does at startup: clone the set's repository into the
parent directory of the `coderpuzzle` checkout and point compose at it.

```bash
# katze-style layout: both checkouts side by side
git clone git@github.com:CoderPuzzle/lc-original.git ../lc-original
CODERPUZZLE_PROBLEMS_PATH=../lc-original/problems docker compose up -d
```

Bundle validation is deliberately not a CI step for these trees — the bank
and the system live in different repositories. Validation is an on-demand
authoring command run inside the judge image with the problem repo mounted
at `/tools` (see [AUTHORING.md](AUTHORING.md)):

```bash
docker run --rm --user 0:0 -v "$PWD":/tools \
  ghcr.io/coderpuzzle/coderpuzzle:latest \
  coderpuzzle check --tree /tools/problems            # static bundle gate
docker run --rm --user 0:0 -v "$PWD":/tools \
  ghcr.io/coderpuzzle/coderpuzzle:latest \
  coderpuzzle judge /tools/problems/0001-0100/0001_pair-sum
```
