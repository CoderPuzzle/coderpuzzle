# Solutions — Minimum Number of Seconds to Make Mountain Height Zero

## Binary Search on Time with a Closed-Form Worker Capacity

The finish time is monotone: if the mountain can be leveled within `T` seconds, it can be leveled within any larger budget, since workers can always do less work. That monotonicity makes the answer binary-searchable between `0` and the time a single worker needs for the whole mountain, `max(workerTimes) · H·(H+1)/2`, which is a safe upper bound because the slowest worker could handle every unit alone.

The feasibility test counts, for a deadline `T`, how many height units the full workforce can remove. A worker with time `wt` who removes `x` units spends `wt · x·(x+1)/2` seconds (an arithmetic series), so the maximum `x` within `T` solves `x·(x+1) ≤ 2T/wt`. The check computes this in closed form with an integer square root — `(isqrt(1 + 4c) - 1) // 2` where `c = 2T // wt` — avoiding any floating-point rounding, which matters because the return value is compared exactly. Summing capacities over all workers (with early exit once the total reaches the target) decides whether deadline `T` suffices.

Any assignment where each worker removes whole units can be shuffled into one where faster-deadline contributions align, and the sum of capacities is always realizable: units are interchangeable, so if the total capacity is at least `mountainHeight`, some split of the units among workers respects each worker's individual cap.

Edge cases: a single worker degenerates to the triangular-number sum; huge upper bounds (`10⁵` height, `10⁶` time) make the search range about `5·10¹⁵`, i.e. roughly 53 iterations. With `w` workers and `T` the maximum candidate time, the search runs `O(log T)` checks of `O(w)` each.

**Complexity:** `O(w log T)` time, `O(1)` space.
