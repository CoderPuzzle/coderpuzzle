# Solutions — Minimum Operations to Equalize Binary String

## Interval BFS over zero counts

Track one number instead of the whole string: `z`, the count of '0's. An
operation chooses exactly `k` indices, of which `i` may fall on current
zeros and `k - i` on current ones; legality caps `i` between
`max(0, k - (n - z))` and `min(k, z)`. Flipping those changes the count to
`z' = z + k - 2 * i`, and as `i` sweeps its allowed range every value in
the single contiguous, same-parity interval `[z + k - 2 * min(k, z), z + k

- 2 * max(0, k - (n - z))]`is reachable in one step — positions never
matter, only counts do. The question becomes a shortest-path search on the
integers`0..n`from the starting count to`0`.

![For s = "0101" with k = 3 the zero-count BFS starts at z = 2, reaches the
odd counts 1 and 3 in one step, and from z = 3 the even interval [0, 2]
lands on the goal — 2 operations that the string's positions alone never
reveal.](figures/solution-zero-count-interval-bfs.svg)

That search is a plain BFS with unit edges: expand each dequeued count
into its interval and enqueue every unvisited state of the matching parity
inside it. Scanning each full interval per expansion would cost `O(n²)`,
so the unvisited states are held in two skip lists, one per parity: an
array where each slot points toward the next unvisited slot, with find
path-compressing the chain as it jumps over visited runs. Discovering a
state removes it from its list, so every state enters the queue exactly
once and the whole traversal stays near-linear. If state `0` is ever
reached its distance is the answer.

If the queue drains first, `0` was never reachable — some parity or range
obstruction walls off the goal (as when `k` is even and the starting zero
count is odd), and the answer is `-1`. A string that is already all ones
has zero zeros and needs no operations at all.

**Complexity:** `O(n)` time, `O(n)` space.
