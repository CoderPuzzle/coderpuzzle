# Solutions — Number of Nodes With Value One

## Ancestor-Flip Parity

Flips commute — every flip toggles the same fixed set of nodes, so the
final value of a node depends only on how many times it was covered,
never on the order. A query on `v` covers exactly the nodes of `v`'s
subtree: `v` itself and everything below. Working from the top down, a
node's total coverage count is its own query count plus its parent's
total, because every query that reached the parent also reaches the
child. One array pass in increasing label order does it: the parent of
label `v` is label `v / 2`, which a numeric sweep always visits first.

The answer counts nodes whose accumulated coverage is odd. That is hint
3 verbatim, and it replaces any actual simulation — no per-query subtree
walk (which costs `O(q · n)` at the constraints) and no DFS over an
explicit tree. The tree exists only as the parent formula; nothing is
built.

Counts fit easily in 32 bits: at most `10⁵` queries touch any node's
chain. The labels themselves stay under `10⁵`, so index arithmetic is
exact in every language with room to spare.

**Complexity:** `O(n + q)` time, `O(n)` space.
