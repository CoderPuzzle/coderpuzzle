# Solutions — Minimum Health to Beat Game

Health only ever flows downward — every level subtracts, nothing ever adds — so
the whole game reduces to one inequality per level plus a single armor
discount. That collapses the search for the cheapest starting health into
three numbers gathered in one sweep.

## Total damage minus the best absorption

Starting with `H` health and never using the armor, the tightest constraint is
the last level: health must stay positive through the full total
`Σ damage[i]`, so `H ≥ total + 1`. Spending the armor on level `j` shaves
exactly `min(damage[j], armor)` off that total — the ability absorbs "at most
`armor`" damage, so a level smaller than `armor` only gives back its own size.
The best placement is therefore the level with the largest damage, and the
answer is `total + 1 - min(armor, max(damage))`.

One pass accumulates the running total and the maximum element together; no
extra structure is needed. The total reaches `10⁵ · 10⁵ = 10¹⁰`, past 32-bit
range, so the fixed-width languages accumulate in 64-bit integers
(`long` / `long long` / `int64_t` / `i64`), while JavaScript's `number` stays
exact because `10¹⁰ + 1` sits far below the `2⁵³` exact-integer ceiling.

**Complexity:** `O(n)` time, `O(1)` space.
