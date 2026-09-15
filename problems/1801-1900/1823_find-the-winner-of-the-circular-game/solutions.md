# Solutions — Find the Winner of the Circular Game

## Simulation with index arithmetic

Keep the surviving friends in a list in circle order, plus an index marking the friend where the next count begins. Counting `k` friends clockwise including the current one lands exactly on `(idx + k - 1) % len(friends)` — the `-1` accounts for the starting friend being counted, and the modulo implements the wrap-around, including the cases where `k` exceeds the circle size and friends are counted more than once.

That friend leaves via `pop`, and the beauty of the bookkeeping is that nothing else needs to change: the friend immediately clockwise of the removed one shifts into the vacated slot, so the same `idx` now points at exactly where the rules say the next count must start. The loop repeats `n - 1` times, and the single remaining friend is the winner.

![Five friends in a circle with k = 2: counting arrows land on friends 2, 4, 1, and 5 in order — each crossed out as they leave — leaving friend 3 alone in the circle as the winner.](figures/solution-circle-count.svg)

Starting with `idx = 0` handles the rule that the first count starts at friend 1. Because `n` is at most 500, the `O(len)` cost of each list removal — Python must shift the tail of the list left — is irrelevant here. (The classic Josephus recurrence `f(n, k) = (f(n-1, k) + k) % n` would give `O(n)` time and `O(1)` space, but the canonical solution is the direct simulation.)

**Complexity:** `O(n^2)` time, `O(n)` space.
