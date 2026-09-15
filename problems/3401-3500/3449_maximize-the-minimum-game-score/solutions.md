# Solutions — Maximize the Minimum Game Score

## Binary Search with a Left-to-Right Feasibility Greed

Whether a target minimum score `x` is achievable is monotone (any walk attaining `x` also attains every smaller target), so binary search the answer between `0` and `max(points) * m`, and test each candidate with a greedy that computes the minimum number of moves needed. Since every point value is positive, the optimal walk for a fixed target never backtracks more than one step: it sweeps left to right, and whenever index `i` still lacks enough visits it bounces across the `i`/`i+1` boundary, because each round trip costs 2 moves and grants one extra visit to both endpoints.

The check simulates exactly that. Sweeping `i` from left to right, `prev` holds the number of visits already banked at index `i` by the oscillation around the previous boundary; index `i` needs `ceil(target / points[i])` visits in total. If `remain = needed - prev >= 1`, the walker performs `remain` crossings costing `2 * remain - 1` moves and banks `remain - 1` extra visits at `i + 1`. If the quota is already met and `i` is not the last index, a single forward move suffices with nothing banked; the last index needs no trailing move. The target is feasible iff the running move total stays within `m` (the check aborts early once it overflows).

Correctness of the greedy rests on two facts: entering at any position and ending anywhere is equivalent to prefixing/suffixing a left-to-right sweep, and hoarding visits via immediate back-and-forth steps is never worse than detouring later, since `points[i] > 0` makes every banked visit pure profit toward the current index's quota. Any walk respecting the move budget can be rearranged into this canonical form without increasing its move count.

Edge cases: `n = 2` with tiny budgets (example 1's bounce `0 -> 1 -> 0`), immediate lane-entry switches covered by banking at the first index, and `m` as large as `10^9` — the binary search range `max(points) * m` fits easily in Python integers, and the check is linear.

**Complexity:** `O(n log(max(points) * m))` time, `O(1)` space.
