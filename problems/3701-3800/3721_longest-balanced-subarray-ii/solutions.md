# Solutions — Longest Balanced Subarray II

## Balance segment tree over right endpoints

Give each value a sign — +1 when odd, −1 when even — and score a window by
`g`, the sum of signs of its _distinct_ values; balanced is exactly `g = 0`.
Fixing the left end `l` and sweeping the right end `r`, the score `g(l, r)`
changes only where the arriving value is new to the window: a value
contributes its sign precisely on the stretch of right ends that starts at
its first occurrence and stops just before its next occurrence, where a
later copy takes over the counting. One precomputation — the next occurrence
of each position's value — therefore turns distinct-value bookkeeping into
plain range additions.

A lazy segment tree over right endpoints holds every current score. Seeding
left end 0 costs one range add per distinct value: the value's sign lands on
every right end from its first occurrence onward. Sliding the left end past
position `l` withdraws `nums[l]`'s sign on `[l, next(l) - 1]` — exactly the
ends that were still counting this copy — after which entry `r` equals
`g(l, r)` for every `r >= l`, and entries left of `l` have returned to zero.
Each node stores the minimum and maximum of its segment under pending
additions, so "does any entry hold zero" is the test `min <= 0 <= max`.

The longest balanced window for left end `l` ends at the _rightmost_ zero
among entries `r >= l`. A descent finds it: at each node a child can be
skipped only when its minimum and maximum fail to straddle zero (a subtree
straddling zero may still hold none — think of a huge padding sentinel next
to a −1), so right children are tried first, bracketing left siblings are
stacked for backtracking, and leaves are verified outright. The largest
`r - l + 1` seen over the scan is the answer.

**Complexity:** `O(n log n)` time, `O(n)` space.
