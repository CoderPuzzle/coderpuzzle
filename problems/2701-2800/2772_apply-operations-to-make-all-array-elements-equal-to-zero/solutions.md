# Solutions — Apply Operations to Make All Array Elements Equal to Zero

## Difference Array Sweep

Operations can be assumed to run left to right: the leftmost nonzero element can only be reduced by windows covering it, and among those the window starting exactly there is the canonical choice, so any successful multiset of operations can be replayed in left-to-right order. Executing that schedule naively is quadratic, but only the residual value at the current front matters, and a difference array recovers each position's residual in constant time.

Maintain `running`, the net number of still-active operations covering position `i`, by adding `diff[i]` upon arrival; the residual is `cur = nums[i] - running`. A negative residual means earlier windows over-decremented this cell, which no later operation can undo, so the answer is false. A positive residual demands exactly `cur` new windows starting at `i` — nothing further left can help — so if `i + k > n` those windows would run off the array and the answer is again false; otherwise bump `running` by `cur` and plant `diff[i + k] -= cur` so the extra decrements stop precisely at the window boundary. A zero residual needs no new windows.

![The sweep over [2,2,3,1,1,0] with k = 3: two windows start at i = 0 and one at i = 2, and the running coverage 2,2,3,1,1,0 matches nums exactly.](figures/solution-difference-sweep.svg)

One pass decides feasibility for every input, including edge cases like an all-zero array (always true) and windows that no longer fit near the right end. The difference array of length `n + 1` is the only auxiliary state.

**Complexity:** `O(n)` time, `O(n)` space.
