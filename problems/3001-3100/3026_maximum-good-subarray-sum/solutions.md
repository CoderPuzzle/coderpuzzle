# Solutions — Maximum Good Subarray Sum

## Prefix sums keyed by the best matching start

A good subarray `[i..j]` has sum `P[j+1] - P[i]` where `P` is the prefix-sum array, and its first element must equal `nums[j] - k` or `nums[j] + k` (that is exactly `|nums[i] - nums[j]| = k`). So while scanning endpoints left to right, the best partner for each endpoint is the matching start value whose prefix sum `P[i]` is smallest — maximizing the difference.

Keep a hash map from value to the minimum prefix sum seen before any start holding that value: initialize it with `nums[0] -> 0`, and after finishing index `j`, offer the running prefix `P[j+1]` as a start candidate for `nums[j+1]`, keeping the smaller entry. Registering starts only after processing the current endpoint correctly excludes the degenerate single-element start at `j` itself, which is never good since `k >= 1`.

At each `j`, look up both `nums[j] - k` and `nums[j] + k`; a hit gives candidate `P[j+1] - best[value]`. The best-so-far starts as "none" rather than 0 because every good subarray might have a negative sum (example 3), and the function returns 0 only when no good subarray exists at all.

**Complexity:** `O(n)` time, `O(n)` space.
