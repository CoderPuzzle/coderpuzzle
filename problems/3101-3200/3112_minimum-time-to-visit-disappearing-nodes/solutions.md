# Solutions — Minimum Time to Visit Disappearing Nodes

## Dijkstra with Disappearance Deadlines

Shortest paths from the single source `0` solve everything except the
disappearance rule, and that rule is purely a per-node deadline: arriving at
or after `disappear[i]` means node `i` was never visited at all. Because a
node that vanished under you offers no onward travel either, the deadline can
live inside one ordinary Dijkstra run — pop a settled `(distance, node)`
entry and relax out of it only when its distance strictly beats its
deadline, then report each final distance only if it also beats the deadline.

The strictness is load-bearing and matches the examples: reaching a node at
the exact instant it disappears counts as losing it (Example 3), so both the
"may I settle here" test and the final answer's comparison use `<`, never
`<=`. Stale heap entries are skipped against the current best distance;
multiple edges between a pair and self-loops need no special handling since
relaxation ignores anything that fails to improve. Deadlines never cut a
settlement short mid-relaxation — every label present in `dist` is already a
real arrival time of some path through visitable nodes, which is exactly what
the deadline filter must judge.

Every distance label comes from adding edge weights below `10⁵` to a value
below `max(disappear) <= 10⁵` before the entry is even pushed, so all values
stay under `2 * 10⁵`; `-1` markers replace unreachable or too-late nodes.
No recursion is involved — the heap drives the whole traversal.

**Complexity:** `O((n + E) log n)` time, `O(n + E)` space.
