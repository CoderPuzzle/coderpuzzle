# Solutions — Maximum Score from Performing Multiplication Operations

## Dynamic Programming over Ends Taken

Greedy picking of the larger end fails on negative multipliers, but the state space is tiny: after `i` operations, if `l` elements were taken from the left then exactly `r = i - l` were taken from the right, and the remaining array is fully determined — its next left candidate is `nums[l]` and its next right candidate is `nums[n - 1 - r]`. So the pair `(i, l)` is a complete state, and an `O(m^2)` dynamic program over it replaces the exponential tree of choices.

The code runs the recurrence bottom-up in reverse operation order, keeping only the next stage as a rolling array. For operation `i` and each `l` from 0 to `i`, it takes the better of taking the left end (`prev[l + 1] + multipliers[i] * nums[l]`) or the right end (`prev[l] + multipliers[i] * nums[n - 1 - (i - l)]`), where `prev` holds the optimal future score for stage `i + 1`. Slots with `l > i` are unreachable at that stage and stay at negative infinity so they can never win a max. The base case is the all-zero array after all `m` operations, where no further score remains.

![The example's rolling-array stages drawn as a triangle over states (i, l): the base row is 0, stage i = 2 holds 1, 2, 3, stage i = 1 holds 5 and 8, and the root resolves to 14 with a dashed path that corresponds to taking the right end three times for 9 + 4 + 1.](figures/solution-dp-stages.svg)

Processing `i` downward from `m - 1` to 0 fills each stage from the one below it, and the final `prev[0]` is the best score from the state "zero operations used, nothing taken from the left" — exactly the answer. Only `m + 1` values are kept per stage because the state after operation `i` never needs more than `i + 1` left-counts, and the unused `n - m` middle elements of `nums` are simply never referenced.

**Complexity:** `O(m^2)` time, `O(m)` space.
