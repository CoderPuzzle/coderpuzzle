# Solutions — Find the Sum of Subsequence Powers

## Threshold-count DP over distinct differences

After sorting `nums`, a subsequence's power — the minimum pairwise absolute difference — equals the minimum gap between its consecutive chosen elements. So for a threshold `d`, let `f(d)` count the length-`k` subsequences whose consecutive gaps are all at least `d`; those are exactly the subsequences with power `>= d`. Enumerating the distinct pairwise differences in descending order, `f(d) - f(next larger d)` is the number of subsequences whose power is exactly `d`, and the answer is the sum of `d * that count` modulo 10^9 + 7. Every possible power is itself one of the pairwise differences, so nothing is missed.

`f(d)` is a length-bounded count DP on the sorted array. For each index `j`, a binary search finds `splits[j]`, the number of earlier indices `i` with `nums[i] <= nums[j] - d` — exactly the predecessors allowed to sit immediately before `j` in a gap-respecting subsequence. Starting from `prev[j] = 1` (length-1 subsequences ending at `j`), each additional chosen element updates `prev[j]` to the prefix sum of the old `prev` over `[0, splits[j])`; one exclusive-prefix pass makes a whole round O(n), and `k - 1` rounds finish the count, with an early 0 when a round sums to zero.

There are at most `n(n-1)/2` distinct differences (1225 for `n = 50`), each costing an O(nk) DP plus O(n log n) of binary searches — comfortably small at these constraints. Writing `D` for the number of distinct differences, the three nested factors multiply as below; sorting first is safe because subsequences are index sets and power depends only on the multiset of values.

**Complexity:** `O(D * n * k)` time, `O(n^2)` space.
