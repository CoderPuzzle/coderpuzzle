# Solutions — Minimum Cost Tree From Leaf Values

## Interval Dynamic Programming

Every binary tree over the leaves corresponds to a way of recursively splitting the leaf array `arr[i..j]` into a left part `arr[i..k]` and a right part `arr[k+1..j]`: the leaves of the left subtree are a contiguous block, as are those of the right. The root's cost for a given split is `max(arr[i..k]) * max(arr[k+1..j])` — the product of the largest leaves on each side — plus the optimal costs of the two subtrees. So `dp[i][j]`, the minimum non-leaf sum for the subarray `arr[i..j]`, satisfies `dp[i][j] = min over k of maxi(i,k) * maxi(k+1,j) + dp[i][k] + dp[k+1][j]`, with single leaves costing 0.

To keep each transition cheap, a companion table `maxi[i][j]` stores the maximum leaf in the subarray, filled first for all intervals by a similar length sweep: `maxi[i][j] = max(maxi[i][j-1], arr[j])`. With both tables indexed the same way, the main DP fills intervals in order of increasing length so that the two smaller intervals in any split are already solved, and the answer is `dp[0][n-1]`.

The shortest intervals come first for both tables: length-1 entries need no work (`dp[i][i] = 0`, `maxi[i][i] = arr[i]`), and the loops start at length 2. A two-leaf array hits the length-2 sweep with a single split point, giving `max(arr[0], ...)`, i.e. the unavoidable `arr[0] * arr[1]` product, which matches the `n = 2` example. Large leaf values end up multiplied at few nodes and small values at many, which is exactly the trade-off the minimization explores.

![The two trees over leaves [6, 2, 4]: pairing the 2 with the 4 below the 6 costs 32 instead of 36.](figures/solution-leaf-trees.svg)

The constraint `arr.length <= 40` is what makes the cubic sweep practical.

**Complexity:** `O(n^3)` time, `O(n^2)` space.
