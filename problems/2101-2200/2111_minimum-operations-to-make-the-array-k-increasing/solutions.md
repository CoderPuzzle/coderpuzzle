# Solutions — Minimum Operations to Make the Array K-Increasing

## Longest Non-Decreasing Subsequence per Residue Class

The constraint `arr[i-k] <= arr[i]` only relates indices that are congruent modulo `k`, so the array decomposes into `k` independent subsequences `arr[start::k]`. Making the whole array K-increasing is exactly making each of these subsequences non-decreasing, and changes to one class never affect another, so the answer is the sum of the per-class minimum changes.

For a single sequence, the elements left unchanged must already form a non-decreasing subsequence, so the fewest operations keeps a longest non-decreasing subsequence (LNDS) and rewrites everything else: `len(sub) − LNDS(sub)`. Since values can be set to any positive integer, any subsequence can always be completed into a fully non-decreasing sequence. The LNDS is computed with the classic patience trick: maintain the list `tails` of smallest possible tail values per length, and for each value replace the first tail that is strictly greater — `bisect_right` rather than `bisect_left`, which is what allows equal elements to extend the subsequence (non-decreasing, not strictly increasing).

Each of the `k` classes is processed independently, and slicing `arr[start::k]` plus the binary-search insertion keeps each class at `O(len · log len)`. Summed over all classes the lengths add up to `n`.

**Complexity:** `O(n log n)` time, `O(n)` space.
