# Solutions — Finish Time of Tasks II

One rerooting sweep pair that plays every node as the root in a single pass.

## Rerooting DP

Root the tree at node 0 and take one BFS order in which parents precede
children. Sweeping that order in reverse computes `down[v]`, the finish time
of the branch hanging below `v`: a childless `v` reports `baseTime[v]`;
otherwise, with `low` and `high` the smallest and largest child finish times,
the rule gives `high + (high - low) + baseTime[v]`.

A forward sweep over the same order then plays each node `v` as the root. At
that moment every direction feeding `v` is known: `down[c]` for each child
`c`, plus `up[v]` from the parent side. Keeping the two smallest and two
largest incoming values, tagged by slot so duplicated extremes survive,
allows any child branch to be excluded in constant time when computing its
`up` value. Both sweeps are iterative, so a tree of depth `10⁵` is safe.

**Complexity:** `O(n)` time, `O(n)` space.
