# Solutions — Apply Operations to Maximize Score

## Prime Scores, Monotonic Stack, and Fast Exponentiation

An element `nums[i]` is selected by an operation exactly when the chosen subarray's highest prime score belongs to `i` (ties broken by smallest index). So instead of reasoning about subarrays, count for each index the number of subarrays in which it would be the winner: if `left[i]` is the nearest index to the left with a prime score greater than or equal to `score[i]`, and `right[i]` the nearest index to the right with a strictly greater score, then `ranges[i] = (i - left[i]) * (right[i] - i)` counts exactly those subarrays. The asymmetry (`>=` on one side, `>` on the other) breaks ties consistently with the smallest-index rule so each subarray is attributed to precisely one element. Both boundary arrays come from monotonic stacks in linear time.

Prime scores — the number of distinct prime factors — are computed with a smallest-prime-factor sieve up to `max(nums)`. Building the sieve once and then dividing each value by its smallest prime repeatedly yields each element's distinct prime count quickly, avoiding per-element trial division.

The selection is then greedy: to maximize the product under at most `k` picks, repeatedly take the largest available value. Sorting the `(value, ranges)` pairs by value descending, each element is used `min(ranges[i], remaining)` times — it cannot be picked more often than subarrays allow, and never more than the operations that remain. The product is assembled with modular fast exponentiation, so each element contributes one `pow(val, use, MOD)` call regardless of how many times it is used. The loop stops as soon as the operation budget is exhausted; `k` may be far larger than the total number of subarrays, which is why the count is capped rather than iterated.

**Complexity:** `O(n log n + V log log V)` time, `O(n + V)` space, where `V = max(nums)`.
