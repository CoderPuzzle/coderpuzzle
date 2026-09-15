# Solutions — Maximum Subarray Sum With Length Divisible by K

## Prefix Sums Bucketed by Index Modulo K

A subarray `nums[l..r-1]` has length `r - l`, divisible by `k` exactly when `l ≡ r (mod k)`. Writing the subarray sum as `prefix[r] - prefix[l]`, the divisibility condition becomes: both prefix indices share a residue modulo `k`. So the problem decomposes into `k` independent residue classes, and within each class it is the classic "maximize the difference of a later prefix minus the smallest earlier prefix."

The algorithm sweeps the prefix indices `0..n` once, keeping `min_pref[r]` = the smallest prefix sum seen so far at an index congruent to `r` modulo `k`. At each index it first forms the candidate `prefix[i] - min_pref[i % k]` (comparing before updating, so subarrays stay non-empty), then refreshes the bucket minimum with `prefix[i]`. The best candidate over the sweep is the answer; since the first index of each residue class has no bucket entry yet, no empty subarray is ever considered.

Correctness of "subtract the minimum" holds for arbitrary signs because the constraint attaches only to the endpoints' residues, not to any interior structure — any earlier prefix in the same residue class yields a valid subarray, and the minimum maximizes the difference.

Edge cases: all-negative arrays force a negative answer, which is why the running best starts as `None` rather than `0`; `k = 1` degenerates to the ordinary maximum subarray; `k > n`... cannot occur since `k ≤ n`. Buckets are stored in a small dictionary of size at most `k`, alongside the `O(n)` prefix array.

**Complexity:** `O(n)` time, `O(n)` space.
