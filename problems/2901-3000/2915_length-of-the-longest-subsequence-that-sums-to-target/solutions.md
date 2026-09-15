# Solutions — Length of the Longest Subsequence That Sums to Target

## 0-1 knapsack over the target sum

Whether a value is achievable depends only on which sums are reachable, not
on which elements produced them, so order is irrelevant and the subsequence
constraint collapses into plain subset selection. That makes the problem a
0-1 knapsack whose capacity is `target` and whose "weight" and "profit" are
both the element value — maximizing the profit here maximizes the number of
chosen elements, which is exactly the longest subsequence.

Let `dp[s]` be the longest subsequence length that sums exactly to `s`, with
unreachable sums marked `-1` and `dp[0] = 0` for the empty subsequence. Each
element either joins a subsequence or does not, so processing one element
means replacing every `dp[s]` with `max(dp[s], dp[s - num] + 1)`. Walking `s`
from `target` down to `num` inside the element loop is what makes the update
read only pre-element states, so no element is ever applied twice to the same
subsequence. Elements larger than `target` simply fall outside the inner
range and drop out on their own. The answer is `dp[target]`; a `-1` there
means no subsequence reaches the target.

Every intermediate value is bounded by `target <= 1000` or the length bound
`n <= 1000`, so plain 32-bit integers carry the whole computation in every
language. The `n × target` state space is at most 10^6 entries with O(1)
work each.

**Complexity:** `O(n × target)` time, `O(target)` space.
