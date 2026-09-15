# Solutions — Arithmetic Slices

## Counting slices by their right end

Every arithmetic subarray sits inside a maximal run of equal consecutive
differences, and a run of length `L` contains exactly `(L-1)(L-2)/2` of
them: `L-2` slices of length 3, `L-3` of length 4, and so on down to the
single whole run. Rather than locating runs and applying that formula, the
count can be accumulated one element at a time by fixing where each slice
ends. When `nums[i]` keeps the run arithmetic, every slice that ended at
`i - 1` extends to end at `i`, and one new length-3 slice appears — so the
number of slices ending at `i` is exactly one more than ended at `i - 1`.
A constant array qualifies here too: a difference of 0 is a difference
like any other.

The loop keeps that per-end count in `current`, folding it into `total` as
it goes and resetting it to 0 wherever the difference changes, since no
slice may cross a break. Over a run the successive values of `current` are
`1, 2, 3, …`, which telescope to `L-2, L-3, …, 1` and sum to
`(L-1)(L-2)/2` — the closed form falls out of the same additions, and
separate runs (even ones sharing the break element) contribute
independently, nothing double-counted. Arrays shorter than three elements
never enter the loop and return 0.

Two integers of state carry the whole computation, so the space is
constant. The largest possible total is the all-equal array of 5000
elements, whose 12,492,501 slices sit far below any overflow bound.

**Complexity:** `O(n)` time, `O(1)` space.
