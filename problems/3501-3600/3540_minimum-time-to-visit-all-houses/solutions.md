# Solutions — Minimum Time to Visit All Houses

## Prefix sums, cheaper direction per move

Between two consecutive stops the walk never benefits from switching
direction: any detour repeats edges, and every road costs at least one
meter. So each move costs the cheaper of exactly two candidates — the
clockwise distance, which spends `forward[a], forward[a+1], ...` walking
from house `a` forward to house `b`, and the counterclockwise distance,
which spends `backward[a], backward[a-1], ...`. Both roads sets carry their
own weights, so neither distance can be read off the other's array.

Build one prefix sum per direction. The forward distance from `a` to `b` is
`F[b] - F[a]` when `a < b`, wrapping as `total - F[a] + F[b]` otherwise; the
backward distance from `a` to `b` spends the descending edges
`backward[a] ... backward[b+1]`, which is `B[a+1] - B[b+1]` when `a > b`,
wrapping as `B[a+1] + total - B[b+1]`. Each move is then two lookups and a
subtraction — O(1) — and the answer accumulates over the queries starting
from house 0.

Lengths reach `10^5` meters over up to `10^5` roads, so a single distance
can hit `10^10`; totals reach `10^15`. Both exceed 32 bits, so prefix sums
and the running answer are 64-bit throughout.

**Complexity:** `O(n + q)` time, `O(n)` space.
