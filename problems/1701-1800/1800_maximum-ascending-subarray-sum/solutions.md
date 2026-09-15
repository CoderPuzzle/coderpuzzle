# Solutions — Maximum Ascending Subarray Sum

Every value in `nums` is positive, so extending an ascending run can
only grow its sum: the best subarray ending at each index is the entire
strictly increasing run that ends there. The answer is the heaviest of
those runs, and one left-to-right sweep finds it.

## Running-reset sweep

Keep `cur`, the sum of the strictly increasing run that ends at the
current element. It extends the previous run whenever the current
element is strictly greater than its predecessor, and otherwise
restarts as the bare element — equal or smaller neighbours break the
run, and a lone element is itself a (trivially) ascending subarray.
`best` tracks the largest run sum seen; since every value is at least
1, no prefix of a run can outrank the whole run, so weighing each run
exactly once at its right end misses nothing.

On `[10,20,30,5,10,50]` the sweep holds 60 over `[10,20,30]`, resets
at 5, then climbs to 65 over `[5,10,50]` — the answer. On
`[12,17,15,13,10,11,12]` the last run `[10,11,12]` sums to 33. With
`n <= 100` and `nums[i] <= 100` the naive product bound is `10^4`, and
strict ascent forces distinct values inside a run, so the true ceiling
is `1 + 2 + ... + 100 = 5050` — comfortably inside 32-bit integers and
exact as a JS `number` far below `2^53`.

**Complexity:** `O(n)` time, `O(1)` extra space.
