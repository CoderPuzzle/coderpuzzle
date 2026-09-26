# Solutions — Subarray With Elements Greater Than Varying Threshold

## Monotonic Stack over Minimal Spans

A subarray of length `k` is valid when every element exceeds `threshold / k`, which is equivalent to its minimum element satisfying `min > threshold / k`, i.e. `min * k > threshold`, i.e. `k > threshold / min` or `k >= threshold // min + 1` in integer arithmetic. So for each candidate minimum value there is a smallest length that would work, and the question becomes: does any index have a wide-enough span in which it is the minimum?

For each index `i`, compute the maximal window in which `nums[i]` is the minimum: from just after the previous strictly-smaller element on the left (`prev_lt`) to just before the next smaller-or-equal element on the right (`next_le`), giving `span = next_le[i] - prev_lt[i] - 1`. Two monotonic stack sweeps build these arrays — the asymmetric conditions (`<` on one side, `<=` on the other) ensure each maximal window is attributed to exactly one occurrence of its minimum, avoiding double counting and tie pathology. If the required `k = threshold // nums[i] + 1` fits within `span`, then the subarray of that length centered anywhere around `i` inside the span is a valid answer.

![With nums = [1,3,4,3,1] and threshold = 6 the sweeps stamp spans 4, 2, 1, 3, 5 against required k = 7, 3, 2, 3, 7; only index 3 fits its k = 3, with the span-3 window [3,4,3].](figures/solution-span-monotonic-stamp.svg)

The algorithm scans all `n` indexes, tracks the smallest achievable `k` (any valid answer is accepted, and returning the minimal one is a convenient canonical choice), and returns `-1` when no index qualifies — which covers the case where every element is too small relative to any window it could anchor. Strictness of the inequality (`> threshold / k`, never `>=`) is handled by the `+ 1` in the floor-based formula, sidestepping floating-point division entirely for values up to `10^9`.

**Complexity:** `O(n)` time, `O(n)` space.
