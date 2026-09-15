# Solutions — Minimum Garden Perimeter to Collect Enough Apples

The plot is an axis-aligned square centered on the origin, so it is fully
described by its half-side `k`: it covers exactly the integer coordinates
`(i, j)` with `|i| <= k` and `|j| <= k`. The perimeter is `8 * k`, and the
problem reduces to finding the smallest `k` whose box holds at least
`neededApples` apples.

## Ring-count bound

Counting the apples in the box `[-k,k]^2` splits by row: every row contributes
`|i|` once per column, so the total is
`(2k+1) * 2 * (1 + ... + k)` for the row term plus the symmetric column term,
giving `apples(k) = 2k(k+1)(2k+1)`. The ring at half-side `k` adds
`apples(k) - apples(k-1) = 12k^2` apples, so apples grow strictly and
monotonically in `k`. Since `neededApples <= 10^15`, the answer never needs
`k` above `63000` (`2 * 63000 * 63001 * 126001 > 10^15`), so a small bound
always exists.

The solution first doubles `hi = 1, 2, 4, ...` until `apples(hi) >=
neededApples`, then binary searches the smallest `k` in `[1, hi]` with
`apples(k) >= neededApples` and returns `8 * k`. The doubling keeps the bound
tight for any input, and the whole search runs in about 40 arithmetic steps.
Every intermediate value fits in a 64-bit integer; in JavaScript and TypeScript
the largest term `apples(65536) ~ 1.13e15` stays below `2^53`, so plain
`Number` arithmetic is exact.

**Complexity:** `O(log k)` time, `O(1)` space.
