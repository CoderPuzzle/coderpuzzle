# Solutions — Design File System

## Hash Table of Full Paths

The tempting shape is the one the problem describes: a tree of directories,
each node holding children keyed by name. But every operation arrives as a
complete absolute path, and the two rules that govern `createPath` — no
duplicates, parent must exist — can both be checked against a flat set of
the paths created so far. A full path is unique exactly when no equal string
has been stored, and its parent exists exactly when the path with its last
`/name` segment sliced off is already present (or the slice is empty, which
means the new path hangs directly off the root).

So the whole file system is one map from path strings to values.
`createPath` rejects a repeat or an orphan outright; otherwise it records
the value and reports success. `get` looks the string up, answering `-1`
when absent. No traversal, no per-node bookkeeping — the slash-separated
structure lives entirely inside the key strings. The parent slice is taken
with a search for the last `/`, so a path like `/leet/code` checks `/leet`,
and a top-level path like `/a` has nothing to check: the root needs no entry
of its own.

**Complexity:** each call does one hash lookup (plus one more on
`createPath`) against keys of length at most 100 — `O(L)` time for path
length `L`, `O(1)` amortized; the map holds at most one entry per successful
create, `O(n · L)` space for `n` paths.
