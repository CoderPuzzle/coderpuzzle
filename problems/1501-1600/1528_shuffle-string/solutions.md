# Solutions — Shuffle String

## Direct placement

Each character's destination is given outright: `indices[i]` says exactly
where `s[i]` belongs in the answer, so there is nothing to search for or
deduce. Allocating a result buffer of the same length and writing
`result[indices[i]] = s[i]` for every position reconstructs the shuffled
string in a single pass.

Because `indices` is a permutation of `0 .. n - 1`, every slot of the
result buffer is written exactly once, so no position is left empty and
none is overwritten by a later assignment. The loop can walk `s` and
`indices` together in any order — each iteration only touches the one
output slot named by the current `indices[i]`.

**Complexity:** `O(n)` time, `O(n)` space.
