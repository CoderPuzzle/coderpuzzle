# Solutions — Minimum Incompatibility

Each of the `k` groups takes exactly `n/k` elements and may not repeat a
value, so a group is a set of `n/k` indices carrying pairwise-distinct
values — the order inside a group never matters, only which elements share
one. Greedy pairing is not safe: taking the smallest available partner
first pairs `{1,2}` in `[1,2,3,3,5,6]` with `k = 3` and pays 6, where the
optimum 4 keeps `{1,3}`, `{2,3}`, `{5,6}`. With `n <= 16` the whole array
is a bitmask, so price every legal group once and sweep all partitions.

## Valid-group table with a lowest-bit mask DP

Start by pricing every legal group once. Scan all `2^n` index masks and
keep those holding exactly `n/k` pairwise-distinct values — the values live
in `1..n`, so distinctness is itself a 16-bit set check — recording each
survivor with cost `max - min`, bucketed under every index it contains.
There are at most `C(16, n/k)` such groups (12870 at the widest, `n/k = 8`)
and duplicates prune the table further.

Then fill `dp[mask]`, the minimum total incompatibility for distributing
exactly the elements of `mask`. Only masks whose size is a multiple of the
group size ever leave the infinity sentinel; every other state removes the
one group that covers its lowest-indexed element,
`dp[mask] = min(dp[mask ^ g] + cost[g])` over the bucketed groups `g` that
fit inside `mask`. Forcing the lowest remaining element's group first
collapses the `k!` orderings of one partition — each partition is built
exactly once, through the order its smallest free members dictate.

The table bottoms out at `dp[0] = 0`, and a state no group ever fits simply
stays at infinity — in particular the pigeonhole dead end, a value copied
more than `k` times that can never sit in `k` distinct-valued groups, never
reaches a finite `dp[full]`, which is returned as `-1`.

**Complexity:** `O(2^n * G)` time (`G` = valid groups), `O(2^n + G)` space.
