# Solutions — House Robber II

## Two linear streets

Arranging the street in a circle adds exactly one adjacency the line never had: the first house and the last house are now neighbors. That single extra edge is also the whole problem — any plan that robs both of them is forbidden, so every legal plan gives up the first house, gives up the last house, or gives up both. Plans that give up one end live entirely inside a linear street, so running the classic House Robber recurrence once on `nums[1:]` (first excluded) and once on `nums[:-1]` (last excluded) and keeping the larger answer covers every legal plan; the give-up-both plans are counted by both sweeps, so nothing is missed by not running a third.

Each sweep is the rolling two-variable dynamic program: `cur` holds the best loot through the previous house and `prev` the best through the one before, advanced by the simultaneous step `prev, cur = cur, max(cur, prev + money)`. Because the recurrence only looks two houses back, a single left-to-right pass finds each street's optimum with no table, and the answer fits comfortably in 64-bit arithmetic even at the ceiling of 100 houses holding 1000 each.

The one-house street needs special care: both `nums[1:]` and `nums[:-1]` are empty there, so both sweeps would return 0 — yet the lone house has no distinct neighbor to clash with, and robbing it is legal, so the answer is `nums[0]` itself. From two houses upward both subranges are non-empty and the max of the two sweeps is always correct.

**Complexity:** `O(n)` time, `O(1)` space.
