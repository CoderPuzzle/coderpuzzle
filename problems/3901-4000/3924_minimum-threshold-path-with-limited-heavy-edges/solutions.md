# Solutions — Minimum Threshold Path With Limited Heavy Edges

Binary search the threshold and test each candidate with a zero-one shortest
path search.

## Binary search with zero-one BFS

For a fixed threshold, assign cost zero to every light edge and cost one to
every heavy edge. A path is valid exactly when its total cost is at most `k`.
A deque-based zero-one BFS finds the minimum heavy-edge count from `source`
to every node: zero-cost moves go to the front and one-cost moves go to the
back. If `target` remains unreachable even when every edge is light, the
answer is `-1`.

Feasibility is monotone as the threshold grows, so binary search the integer
range from zero through the largest edge weight. This includes threshold zero,
which is necessary when `source == target` or when the heavy-edge allowance
already permits a path without making any edge light.

**Complexity:** `O((n + m) log W)` time, `O(n + m)` space.
