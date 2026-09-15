# Solutions — Longest Square Streak in an Array

## Sorted distinct values with a hash-map chain length

A square streak read in sorted order is forced: from a value `v` the only
legal next element is `v * v`. So a streak is a chain in the "squaring"
graph, and each value belongs to at most one position of at most one
chain — its predecessor, if it exists at all, is exactly `sqrt(v)`. That
collapses subsequence reasoning into a walk over a functional map.

Deduplicate and sort the distinct values ascending; for each value look
up whether its integer square root is also present. When it is, the
chain length ending here is one more than the chain ending there; when
it is not, this value starts a fresh chain of length 1. A single hash
map carries `length[v]` along the scan and one running maximum answers
the question — return it only if it reached 2, else `-1`.

All inputs are below `10⁵`, so every intermediate product fits far under
both 32-bit range (roots stay below `317`) and JavaScript's exact-Number
bound `2⁵³`; floating-point `sqrt` of a perfect square in that range is
exactly an integer, which the explicit root-squared check confirms.

**Complexity:** `O(n log n)` time for the sort plus linear scanning,
`O(n)` space for the value list and chain-length map.
