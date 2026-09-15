# Solutions — Maximum Number of Jumps to Reach the Last Index

## Dynamic programming over the jump graph

Draw an edge from `i` to `j` whenever `i < j` and
`-target <= nums[j] - nums[i] <= target`. Every edge points strictly
forward, so the jump graph is a DAG and index order is a topological
order — that is what lets a single left-to-right sweep compute longest
paths. Let `dp[j]` be the maximum number of jumps in any sequence that
starts at index 0 and ends at index `j`, with unreachable positions kept
in a "not reached" state. Then `dp[0] = 0`, and for each later `j` we
scan every earlier `i`: if `i` is reachable and the value gap fits, the
path through `i` extends to `j` with `dp[i] + 1` jumps, and `dp[j]` keeps
the best such offer. The recurrence is sound because any optimal path to
`j` decomposes into an optimal path to its immediate predecessor `i` plus
the final edge — and since `i < j`, `dp[i]` is already final when `j` is
processed. The answer is `dp[n - 1]`, or -1 when the last index was never
reached.

The sentinel matters: -1 means the last index is genuinely unreachable
(for instance `target = 0` only permits jumping between equal values, so
`[1,3,6,4,1,2]` collapses immediately), not merely reachable in few
jumps. Greedy shortcuts fail in both directions. Jumping to the nearest
valid index can strand you — from `[-2, 6, -3]` with `target = 8` it hops
to the 6 and dies there, while the direct jump `-2 -> -3` finishes — and
even when greed still arrives, it can arrive too early to be maximal.
The DP never commits: every reachable predecessor gets to bid.

Trying every predecessor pair costs `O(n²)` time on `n ≤ 1000`, at most
about half a million relaxations, and `O(n)` space for the table.

**Complexity:** `O(n²)` time, `O(n)` space.
