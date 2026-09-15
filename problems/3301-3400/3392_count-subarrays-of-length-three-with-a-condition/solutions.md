# Solutions — Count Subarrays of Length Three With a Condition

## Fixed-window scan

The window starting at `i` qualifies exactly when
`nums[i] + nums[i + 2]` equals half of `nums[i + 1]`. Halving is the only
subtlety: the pair sum is an integer, so an odd middle value can never
qualify. Comparing twice the pair sum against the middle value decides
that in exact integer arithmetic — `2 * (nums[i] + nums[i + 2]) ==
nums[i + 1]` — with no division and no floating point.

Length-3 windows share no work with their neighbors, so a single
left-to-right scan that tests each window and counts the hits is all the
structure there is. With `n <= 100` there are at most `n - 2` windows to
check, and the pass touches each element a constant number of times.

**Complexity:** `O(n)` time, `O(1)` space.
