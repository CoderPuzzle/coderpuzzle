# Solutions — Maximum Subarray

Two ways to find the contiguous subarray with the largest sum: a single
greedy scan that tracks the best sum ending at each index, and a
divide-and-conquer recursion that merges range statistics over halves.
Both return the same maximum; they differ in how the global answer is
assembled from local information.

## kadane

The key idea is to reduce the global question to a local one: for each index, what is the largest sum of a subarray ending exactly there? Call it `current`. Any optimal subarray ends somewhere, so the answer is the maximum of `current` over all indices. This local quantity has a one-step recurrence — the best subarray ending at `i` either extends the best one ending at `i-1` by `nums[i]`, or starts fresh at `nums[i]` — which is exactly what a single left-to-right scan can maintain.

The code seeds `best` and `current` with `nums[0]` (not `0`), which is what makes all-negative inputs come out right: the answer for `[-3, -1, -2]` is `-1`, an empty-prefix sum of `0` would wrongly win. For each subsequent value, if the running sum `current` has gone negative it can only drag down whatever follows, so the code drops it and restarts at `value`; otherwise it extends to `current + value`. Either way `best` is raised whenever the new running sum beats it.

![The running best-sum-ending-here for [-2,1,-3,4,-1,2,1,-5,4] restarts at 1 and at 4, and peaks at 6 over the subarray [4,-1,2,1].](figures/solution-kadane-walk.svg)

Restarting on a negative prefix is the greed that makes this correct: a negative `current` contributes less to the future than an empty prefix does, so no optimal subarray extending past this point can include it. Both variables are plain scalars updated in one pass, with no dependence on the input size beyond the iteration itself.

Since every extension-or-restart decision is made from the running best and the current element alone, a single scan suffices — no sliding window, prefix array, or divide-and-conquer recurrence is needed.

**Complexity:** `O(n)` time, `O(1)` space.

## divide_and_conquer

Split the array in half, solve each half recursively, and glue the results. The glue needs more than each half's best subarray: it needs four statistics per range — the `total` sum, the best `prefix` (sum of a subarray touching the left edge), the best `suffix` (touching the right edge), and the best interior `best`. A single-element range is trivially `(x, x, x, x)`, and two sibling ranges merge in constant time:

- `total = left.total + right.total`
- `prefix = max(left.prefix, left.total + right.prefix)`
- `suffix = max(right.suffix, right.total + left.suffix)`
- `best = max(left.best, right.best, left.suffix + right.prefix)`

The one genuinely new case is the last: the optimal subarray may cross the seam, and then it must end with some suffix of the left half and start with some prefix of the right half, so the best crossing subarray is exactly `left.suffix + right.prefix`. Everything else stays within one half and is already answered by the recursion. The recursion bottoms out at single elements, so all-negative inputs work without any seeding trick — the comparisons never see an implicit `0`.

Each level of the recursion does `O(n)` merge work over `O(log n)` levels, and the recursion stack is only as deep as the halving — about 17 frames for `n = 10^5`, safe in every language here.

**Complexity:** `O(n log n)` time, `O(log n)` space for the recursion stack.
