# Solutions — Maximum Strength of K Disjoint Subarrays

## Suffix DP with rolling arrays

Let `dp[i][j][x]` be the maximum strength obtainable from the suffix `nums[i..]` when `j` subarrays still have to be placed, and `x = 1` means `nums[i]` is inside the leftmost of them. Counting the remaining subarrays from the right makes each one's coefficient trivial: the `j`-th remaining subarray carries coefficient `j` when `j` is odd and `-j` when even, because the last subarray gets `+1`, the one before `-2`, and so on up to `k` — exactly the alternating weights in the strength formula.

Three transitions per state cover all choices at position `i`. Taking `nums[i]` into the current subarray yields `nums[i] * coeff(j) + max(dp[i+1][j-1][0], dp[i+1][j][1])` — the first term closes the subarray and moves on to the next, the second extends it leftwards. Skipping `nums[i]` gives `dp[i+1][j][0]`, and `dp[i][j][0]` is the max of the two. The base case is `dp[n][0][0] = 0`, every other boundary state is negative infinity so it can never win a max, and the answer is `dp[0][k][0]`.

The iteration runs `i` from `n-1` down to 0 keeping only the previous row, so memory is a `(k+1) x 2` pair of layers. The constraint `n * k <= 10^6` bounds the state count, and since subarrays may be empty of gain but must be placed, the negative-infinity sentinels correctly forbid using fewer than `j` remaining subarrays.

**Complexity:** `O(n * k)` time, `O(k)` space.
