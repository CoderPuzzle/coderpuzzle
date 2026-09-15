# Solutions — Partition Array for Maximum Sum

## Prefix DP with a running block maximum

Let `dp[i]` be the largest attainable sum for the first `i` elements. The final block of an optimal partition of that prefix is some `arr[i - j .. i - 1]` of length `j` with `1 <= j <= min(k, i)`; it contributes its maximum element times `j`, and everything before it must itself be optimal: `dp[i] = max(dp[i - j] + max(arr[i-j..i-1]) * j)`. The partition is into contiguous blocks, so this decomposition over the last block covers every legal partition exactly once.

Evaluating each candidate naively would rescan the block for its maximum; instead the inner loop extends the block leftward one element at a time, sweeping `j` from 1 upward and folding each entering element into `running_max`. One running maximum then serves every candidate, so each prefix costs `O(k)` rather than `O(k^2)`. `dp[0] = 0` seeds the recursion, and the answer is `dp[n]`.

`k = 1` degenerates to the identity partition — every element alone — and returns the plain sum, and blocks are never forced to be maximal, since the max over `j` freely chooses smaller blocks when a larger maximum times a shorter length wins.

**Complexity:** `O(n * k)` time, `O(n)` space.
