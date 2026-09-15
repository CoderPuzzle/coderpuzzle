# Solutions — Longest Arithmetic Subsequence

## DP keyed by common difference

The natural DP state must remember the step as well as the endpoint: `dp[i]` is a dictionary mapping a common difference `d` to the length of the longest arithmetic subsequence that ends at index `i` using that difference. Every subsequence of length at least two has a well-defined difference, and single elements act as the implicit length-1 base case via the `get(d, 1)` defaults.

Transitions consider every earlier index `j < i`: with `d = nums[i] - nums[j]`, the best chain ending at `j` with difference `d` extends by one, and the result replaces `dp[i][d]` if it is longer. Iterating `i` upward and `j` over the indices before it guarantees `dp[j]` is final before it is read, and `best` tracks the maximum length seen anywhere — the answer is a maximum over endpoints and differences, both of which the double loop visits.

Storing dictionaries instead of a full `n` by range-of-differences table keeps memory proportional to the differences that actually occur; since values lie in `[0, 500]`, each dictionary holds at most about a thousand entries in practice, far below the worst-case bound.

**Complexity:** `O(n^2)` time, `O(n^2)` space in the worst case.
