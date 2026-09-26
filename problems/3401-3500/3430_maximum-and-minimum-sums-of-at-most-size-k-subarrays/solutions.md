# Solutions — Maximum and Minimum Sums of at Most Size K Subarrays

## Monotonic Stack Contribution Counting

Instead of enumerating subarrays, count for each element how many subarrays of length at most `k` have it as their maximum, and separately as their minimum, then add `nums[i] * count` for both roles. Four monotonic-stack passes compute `L_max[i]`, `R_max[i]` (how many consecutive elements to the left/right are usable before hitting an element that beats `i` as maximum) and the analogous `L_min`, `R_min`. Asymmetric tie-breaking (`<=` when scanning left, `<` when scanning right for maxima, and mirrored for minima) ensures every subarray's maximum is credited to exactly one index even with duplicate values.

The size cap is the subtle part. A subarray where `i` is the maximum is determined by choosing `a` elements to the left (`0 <= a <= L_max[i]`) and `b` to the right (`0 <= b <= R_max[i]`), and it qualifies exactly when `a + b <= K` where `K = k - 1` (the element itself contributes one to the length). The helper `_count_pairs(A, B, K)` counts these pairs in closed form: if the full rectangle fits (`A + B <= K`) it is `(A+1)(B+1)`; otherwise it sums a full strip of width `t = K - B` plus an arithmetic series for the clipped corner. This keeps the per-element contribution `O(1)`.

![On nums = [1,2,3], k = 2, each element's max and min dominance spans (L, R) are brackets over the array, and the cap a + b <= 1 clips them — e.g. index 0 as min keeps [1] and [1,2] but drops [1,2,3] — for contributions 1·3 + 2·4 + 3·3 = 20.](figures/solution-span-cap-contribution.svg)

Finally the answer is the sum over all indices of `nums[i] * (_count_pairs(L_max[i], R_max[i], K) + _count_pairs(L_min[i], R_min[i], K))`. Values may be negative, which is exactly why both roles must be counted by the same mechanism — the total can be negative and uses 64-bit arithmetic implicitly through Python integers.

Edge cases: `k >= n` makes the cap inactive (every pair counts), duplicates are split between indices by the strict/non-strict stack conditions, and the empty-side cases `L = 0` or `R = 0` fall out of the closed-form count naturally.

**Complexity:** `O(n)` time, `O(n)` space.
