# Solutions — Kth Smallest Subarray Sum

## Binary Search on the Answer with a Sliding Window

Generating and sorting all `n(n+1)/2` subarray sums is quadratic and hopeless for `n` up to 2·10^4. Instead the solution binary-searches the value of the answer. Because every `nums[i]` is positive, the function `f(x)` = number of subarrays with sum at most `x` is non-decreasing in `x`, and it jumps only at values that are actual subarray sums. Therefore the smallest `x` with `f(x) >= k` is itself the k-th smallest sum, achieved by a real subarray.

`f` is computed with a classic sliding window: extend the right end accumulating `window_sum`, shrink from the left while the sum exceeds `limit`, then add `right - left + 1`, the number of subarrays ending at `right` whose sum fits. Each element enters and leaves the window at most once, so each evaluation is linear. Positivity is essential — it guarantees that shrinking monotonically reduces the sum and that the subarrays counted at each step are exactly those bounded by the current window.

The binary search runs over `[min(nums), sum(nums)]`: the smallest candidate is the minimum single element, the largest is the whole array. The loop invariant keeps the answer inside `[lo, hi]` and terminates with `lo == hi`. Edge cases fall out naturally — `k = 1` converges to `min(nums)`, `k = n(n+1)/2` to `sum(nums)`, and duplicate sums (ties) cause no trouble because the predicate counts multiplicities.

**Complexity:** `O(n log S)` time (where `S = sum(nums)`), `O(1)` space.
