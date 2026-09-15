# Solutions — Maximum Number of Consecutive Values You Can Make

## Greedy on sorted coins

The whole problem reduces to one invariant: track the largest value `reachable` such that every integer in `[0, reachable]` can be formed as a subset sum. That range starts at 0 (the empty selection) and grows coin by coin. If the next smallest unprocessed coin `v` satisfies `v <= reachable + 1`, the range extends to `reachable + v`: any target `t <= reachable` is already covered, and any target `t` in `(reachable, reachable + v]` is `v` plus a remainder in `[0, reachable]`, both makeable. Note that the extended range is again contiguous, so the invariant survives.

Sorting the coins first makes this argument apply to the cheapest remaining coin at each step. The code scans the sorted array, adding each coin to `reachable` as long as the condition holds. The moment a coin exceeds `reachable + 1`, the scan stops: every remaining coin is at least as large, so any non-empty subset of remaining coins sums to at least `reachable + 2`, while subsets drawn from the processed coins only cover `[0, reachable]`. Hence `reachable + 1` is provably unmakeable and no later coin can repair the gap.

The answer is `reachable + 1`, the number of consecutive values `0..reachable`. Edge cases fall out naturally: duplicates are fine (each copy is just another step in the scan), and a first coin of value 1 immediately lifts the count from 1 to 2, while an input whose smallest coin is 2 leaves the answer at 1 because only 0 is makeable.

**Complexity:** `O(n log n)` time, `O(n)` space.
