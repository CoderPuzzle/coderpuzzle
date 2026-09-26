# Solutions — Count the Number of K-Free Subsets

## Chains by Difference k with Fibonacci Counting

Two elements conflict only when they differ by exactly `k`, and that relation chains values into arithmetic sequences: scanning the sorted array, each value `x` joins the group of `x - k` when that predecessor exists and otherwise starts a new group. Different groups never conflict, because any pair differing by `k` would have been captured into the same chain by this construction, so the answer is the product of the per-group counts.

Inside a chain of length `l` listed in increasing order, a k-free subset is exactly a subset containing no two chain-adjacent members — the classic independent-sets-of-a-path count. The recurrence `dp[i] = dp[i - 1] + dp[i - 2]` (skip element `i`, or take it and forgo its immediate predecessor) is a Fibonacci shift; the code runs it as a two-variable loop initialized with `a = b = 1` so that after `l` steps `b` equals the number of valid subsets of the chain, including the empty one.

![Sorted, nums [5, 4, 6] form one chain 4-5-6 under k = 1, whose k-free subsets are exactly the no-two-adjacent picks {}, {4}, {5}, {6}, {4, 6} — the Fibonacci run dp = 1, 2, 3, 5 counts them, and independent chains would multiply.](figures/solution-chain-fibonacci-count.svg)

The product starts at 1, which counts the empty subset of the whole array, and every group contributes independently. Sorting dominates the runtime; with `n <= 50` the counts stay small enough that no overflow concerns arise in Python.

**Complexity:** `O(n log n)` time, `O(n)` space.
