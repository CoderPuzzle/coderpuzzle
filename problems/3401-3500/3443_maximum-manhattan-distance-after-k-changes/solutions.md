# Solutions — Maximum Manhattan Distance After K Changes

The walk's Manhattan distance at any moment is the maximum of `sx*x + sy*y`
over the four quadrant signings `(sx, sy)`, so it suffices to optimize each
quadrant independently and take the best over all four. Within one quadrant
every step contributes exactly `+1` or `-1` to that signing, which turns the
question of where to spend `k` changes into simple bookkeeping.

## Quadrant scan with per-prefix change budget

Fix a quadrant `(sx, sy)` and walk `s`, accumulating `cur = sx*x + sy*y` and
counting `mis`, the steps whose contribution was `-1`. A change repairs one
such step to `+1`, a gain of exactly 2, and repairing the earliest misaligned
steps dominates every other spending: it maximizes the corrected value at
every prefix simultaneously. The best distance reachable in this quadrant at
prefix `i` is therefore `cur + 2 * min(k, mis)`.

Taking the maximum of that expression over all prefixes and all four
quadrants yields the answer: the greedy earliest-repair string is optimal for
its quadrant, and the overall optimum is the best single quadrant. Every
value stays within `[-n, n]`, so plain 32-bit integers suffice, and the
change budget `k` is capped against `mis` at each prefix.

**Complexity:** `O(n)` time, `O(1)` space.
