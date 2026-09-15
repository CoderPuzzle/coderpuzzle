# Solutions — Earliest Possible Day of Full Bloom

## Greedy Sorting by Grow Time

Since exactly one seed is worked on per day, the total planting time is fixed at the sum of all `plantTime` values no matter the order; only when each seed finishes planting changes. Splitting a seed's planting across interruptions never helps, so an optimal schedule plants seeds back to back in some order. Under a fixed order, seed `i` finishes planting after the sum of `plantTime` of it and everything before it (call it `prefix`), then blooms at `prefix + growTime[i]`, and the answer is the maximum bloom day over all seeds.

The only choice is the ordering, and an exchange argument shows it is optimal to plant seeds in decreasing `growTime`: swapping two adjacent seeds where the earlier one has the smaller grow time never delays the later seed's finish and can only improve or keep the earlier one's bloom constraint. Intuitively, seeds that grow slowly must be finished early so their long growth overlaps the planting of the others.

The solution sorts `(plantTime, growTime)` pairs by descending grow time and folds over them, accumulating `prefix` and tracking `max(prefix + grow)`. Note the answer is the maximum over all seeds, not the last one planted — a long-growing seed finished early can still be the one blooming last. Sorting creates the pairs copy; the sweep itself is a single pass.

**Complexity:** `O(n log n)` time, `O(n)` space.
