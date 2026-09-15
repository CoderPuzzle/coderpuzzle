# Solutions — Design A Leaderboard

## One map of scores, sorted on demand

The call profile settles the data-structure choice: up to a thousand calls,
a hundred distinct players at most mattering at once, and `top(K)` needing
the K largest scores. A plain map from player id to score makes `addScore`
and `reset` single hash operations, and `top` simply sorts the current score
values — descending — and sums the first `K`. A thousand players' worth of
values sorts in microseconds, far under any limit, so the heavier ordered
structures (a sorted multiset maintained incrementally, or a bucket count of
the 1..100 score range for constant-time `top`) buy nothing at these bounds.

`reset` removes the entry rather than storing a zero: the statement erases
the player from the leaderboard, so a later `top(K)` must not see a zero
competing for a top slot, and `K <= current player count` stays meaningful.

Sum type note: with `1000` players capped at `100` per call, repeated
`addScore` calls on one player can push a score to `100 * 1000 = 10⁵` and a
`top` sum past `10⁸` — inside 32 bits, but the method still returns a 64-bit
integer so no port ever has to think about the ceiling.

**Complexity:** `O(1)` per `addScore`/`reset`; `O(p log p)` per `top` for
`p` tracked players; `O(p)` space.
