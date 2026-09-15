# Solutions — Minimum Operations to Achieve At Least K Peaks

On a circle no two peaks can be adjacent, so at most `⌊n/2⌋` of the positions
can ever be peaks — anything above that is impossible and returns `-1`. Making
a position a peak only involves raising that position: its two neighbours are
never peaks themselves (they sit next to it), so they keep their original
values, and the cost is `max(0, max(prev, next) + 1 - nums[i])` with `prev` and
`next` the circular neighbours. Costs are therefore independent of every other
choice, and the problem becomes a minimum-cost independent-set problem on the
circle with a cardinality target.

## Dynamic programming on the circle

The circle is handled by fixing the fate of index `0` and treating the rest as
a line. If index `0` is a peak, its two neighbours — index `1` and index `n-1`
— are forced to stay unpicked, the peak itself costs `max(0, max(nums[n-1],
nums[1]) + 1 - nums[0])`, and the remaining positions `2..n-2` form a line that
must supply the other `k-1` peaks. If index `0` is not a peak, all positions
`1..n-1` form an ordinary line that must supply all `k` peaks. Whichever case
is cheaper is the answer.

A capped knapsack solves each line. Reading positions left to right, the scan
keeps, for each count `j` up to the target, the cheapest way to reach `j` peaks
with the current position left unpicked, and the cheapest way with it picked —
the picked state can only be entered from the previous position's unpicked
state, since two peaks cannot be adjacent. Every count beyond the target folds
into the top cell, so the scan needs only `O(k)` cells. The values are bounded
(`n ≤ 5000`, `|nums[i]| ≤ 10⁵`) so each individual cost is at most about
`2·10⁵` and the answer fits comfortably in 64 bits.

**Complexity:** `O(n·k)` time, `O(k)` space.
