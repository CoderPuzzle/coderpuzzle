# Solutions — Can Place Flowers

## Greedy planting in one pass

Only the bed's capacity matters, so scan left to right and plant the moment a
plot qualifies: a plot is plantable exactly when it is empty and both of its
neighbors are empty, reading a missing neighbor at either end as empty. The
scan carries the previous plot's value after any planting and looks at the
next plot directly, so every decision is made from full context and planting
is only ever a counter bump.

Planting greedily is safe because a flower placed now can rule out nothing
except its two immediate neighbors, and each of those neighbors could itself
have enabled at most one later plant — a spot planted now never blocks more
than it enables, so the running count is the bed's true capacity. The input
guarantee does the rest: no two existing flowers are adjacent, so the scan
never walks into a pattern that an earlier plant would have to be undone for.

After the pass the counted capacity is compared with `n`: `count >= n` is the
answer. The ends are where the off-by-one slips live — an empty bed of length
`len` holds `ceil(len / 2)` flowers because every other plot can be planted,
and `[0]` with `n = 1` is `true` only when a missing neighbor counts as empty.

**Complexity:** `O(len)` time, `O(1)` space.
