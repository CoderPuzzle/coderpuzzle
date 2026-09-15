# Solutions — Minimum Time to Finish the Race

## Precompute single-tire runs, then DP over laps

Because every ratio is at least 2, lap times on one tire double (or
worse) each successive lap, so a run is only worth continuing while its
next lap costs less than `changeTime` plus the fastest first lap — at
most ~18 laps ever matter. First compute `best[x]`, the cheapest time to
run exactly `x` consecutive laps without changing (minimum over tires of
the geometric sum). Then a linear DP over laps finishes it: `dp[i] =
min over x of dp[i - x] + best[x] + changeTime`, with the change fee
skipped when the run covers the whole race.

**Complexity:** `O(T * K + numLaps^2)` time for `T` tires and the capped
run bound `K (~18)`, `O(numLaps)` space.
