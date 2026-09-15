# Solutions — Coin Path

## Suffix-cost DP, rebuilt greedily from the front

Work right to left. `cost[i]` is the cheapest total for the rest of the walk
when standing on index `i`, `coins[i]` included, so it is `coins[i]` plus the
smallest `cost[j]` over the window `i+1 .. i+maxJump`; cells holding `-1`, and
cells whose whole window is dead, keep an `UNREACHABLE` sentinel that is never
added to, so a blocked or stranded index can never look cheap. `next[i]`
records which `j` supplied that minimum, and the answer is read off by
starting at index 1 and following `next` until index `n`.

The tie rule needs no extra machinery. Any two minimum-cost paths from the same
index agree up to their first divergence, and lexicographic comparison is
settled right there — both paths end at `n`, so the shorter-prefix clause of
the definition never triggers. The lexicographically smallest optimal path
therefore always takes the SMALLEST index achieving the minimum continuation:
every completion behind a smaller next index beats every completion behind a
larger one. Scanning the window in increasing index order and replacing the
best only on a strict improvement stores exactly that choice in `next[i]`, and
the front walk inherits it. On the first example `cost` prefers index 3 (total 6) over index 2 (total 8), giving `[1,3,5]`; with `maxJump = 1` the `-1` at
index 4 strands everything left of it, the sentinel survives at index 1, and
the answer is empty.

Every path total is bounded by `100 * 1000 = 100000`, comfortably inside
32-bit arithmetic in the fixed-width ports and exact as a double in the
JavaScript ones; the sentinel `101001` sits above any real total, so a true
cost can never be mistaken for unreachable.

**Complexity:** `O(n * maxJump)` time, `O(n)` space.
