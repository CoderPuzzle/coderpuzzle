# Solutions — Shortest Path With At Most K Consecutive Identical Characters

The solution runs Dijkstra's algorithm while recording the current suffix run
length in each state.

## Dijkstra over node and run-length states

Use a state `(u, run)` for a path ending at node `u` whose final `run` labels
are all `labels[u]`. Traversing an edge resets the run to 1 when the label
changes and increments it otherwise; a transition whose run would exceed `k`
is discarded.

All edge weights are positive, so Dijkstra's algorithm settles these expanded
states in increasing total weight. The answer is the least distance among the
`k` possible states at node `n - 1`, or `-1` if none was reached. Distances use
64-bit arithmetic because a valid path's total can exceed the 32-bit range.

**Complexity:** O((n k + e k) log(n k)) time and O(n k + e) space.
