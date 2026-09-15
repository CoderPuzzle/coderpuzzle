# Solutions — Minimum Time to Reach Target With Limited Power

The solution runs Dijkstra's algorithm on states that include the signal's
remaining power.

## Dijkstra over node and remaining-power states

Represent a state as `(u, p)`, meaning the signal has reached node `u` with
`p` power left. If `p >= cost[u]`, every outgoing edge reaches its endpoint
with `p - cost[u]` power, and the edge time is added to the distance.
Because `cost[u] >= 1`, the power component strictly decreases along every
transition, so the state graph has no cycles and plain Dijkstra order by
time settles each state once. Lazy deletion (skip popped entries whose
distance has improved) keeps the queue small without a decrease-key.

Positive traversal times make the ordering valid. After all reachable
states are settled, scan the target's power states for the smallest time
and choose the greatest power among ties. Distances use 64-bit arithmetic
because a path of a thousand edges of `10⁹` seconds each exceeds the
32-bit range.

**Complexity:** `O((n + e) p log(n p))` time, `O(n p + e)` space.
