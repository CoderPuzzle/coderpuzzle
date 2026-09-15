# Solutions — Minimum Time to Repair Cars

## Binary Search on the Answer

The answer is monotone: if every car can be repaired within `t` minutes, any larger time budget also suffices, since mechanics can always idle. That makes the minimum feasible time a perfect target for binary search over `[1, min(ranks) * cars^2]`, where the upper bound is what the single best mechanic needs when it repairs all cars by itself.

The feasibility check fixes `t` and asks whether the combined capacity of all mechanics reaches `cars`. A mechanic with rank `r` finishes `n` cars in `r * n^2` minutes, so within time `t` it completes exactly `isqrt(t // r)` cars. Summing these capacities across `ranks` and comparing against `cars` decides the check in one linear pass, exiting early once the running total already covers the demand.

The search keeps the invariant that the smallest feasible time lies in `[lo, hi]` and halves the interval until it collapses to a single value. With `min(ranks) * cars^2` reaching `10^14`, the loop runs about 47 iterations, each an `O(n)` scan, and no extra memory is needed beyond a few counters.

**Complexity:** `O(n log(min(ranks) * cars^2))` time, `O(1)` space.
