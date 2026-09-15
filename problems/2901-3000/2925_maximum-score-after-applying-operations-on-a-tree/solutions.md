# Solutions — Maximum Score After Applying Operations on a Tree

Every value is at least 1, so a root-to-leaf path sums to zero exactly
when every node on it was zeroed. Staying healthy therefore means: the
nodes we skip (leave un-taken) must touch every root-to-leaf path — a
minimum-weight hitting set over paths, or equivalently, maximize what we
take subject to each path keeping one node. Subtree DP resolves the
tension locally: each node either serves as its subtree's kept node or
delegates the obligation to its children.

## Subtree DP, iterative post-order

Let `dp[x]` be the best score obtainable inside `x`'s subtree while every
`x`-to-leaf path is still required to keep an un-taken node. At an
internal node the choice is exactly two-sided: keep `x` (its value stays,
the obligation is discharged for every path through it, and everything
below is free — the child subtree sums) or take `x` (collect
`values[x]`, and each child subtree must now solve the same obligation
for itself — the children's `dp`). So `dp[x] = max(values[x] + Σ dp[y],
Σ sum[y])` over direct children `y`; a leaf has no descendants to
discharge the duty, so it keeps itself and `dp[leaf] = 0`. The answer is
`dp[0]`, since the root's obligation is precisely the statement's health
condition.

A path-shaped tree with n up to 2·10⁴ nodes would overflow any recursive
walk, so both passes are iterative: a BFS from the root fixes parents and
an order in which parents precede children, and the reverse order lets
each finished node hand its subtree sum and dp value up to its parent —
`O(n)` time, `O(n)` space. Scores reach `2·10⁴ · 10⁹ = 2·10¹³`, past
32-bit range, so the accumulators are 64-bit; JavaScript Numbers stay
exact because 2·10¹³ < 2⁵³.

**Complexity:** `O(n)` time, `O(n)` space.
