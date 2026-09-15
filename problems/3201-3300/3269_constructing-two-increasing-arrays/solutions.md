# Solutions — Constructing Two Increasing Arrays

Read the finished numbers in increasing order and any valid replacement
becomes a merge of the two arrays: each number, smallest to largest,
fills the next open slot of one of them, and each array's slots fill left
to right. Which numbers get spent is then dictated by parity alone, so
the only real decision is the interleaving — the task is to pick the
merge whose bit pattern wastes the least headroom.

## Merge-order dynamic programming

For a fixed merge of bits `b_1 … b_m`, the cheapest realization replays a
greedy rule: give the first slot the smallest positive integer of its own
parity (`1` if `b_1` is odd, else `2`), and each later slot the smallest
value above its predecessor with parity `b_t` — an increase of 1 when
consecutive bits differ and 2 when they repeat. That replay is optimal
for the merge because any legal assignment realizing it, read in
increasing order, is exactly such a parity-obeying increasing sequence,
and induction shows the replay's `t`-th value never overshoots the
assignment's `t`-th one; leaving bigger gaps can only push later values
higher. Since every assignment induces some merge this way, minimizing
the replay maximum over all interleavings yields the true optimum.

Dynamic programming over partial merges finds that minimum. Let
`dp[i][j][f]` be the smallest possible largest value after filling the
first `i` slots of `nums1` and `j` slots of `nums2`, where `f` names the
array that received the last (largest) value. The bases seed single
prefixes at cost `1` or `2` by parity, and each state extends by one
element: appending `nums1[i]` after a state whose last bit was `p` costs
1 if `nums1[i] ≠ p` else 2, arriving from `dp[i-1][j][0]` (same array)
or `dp[i-1][j][1]` (switching), symmetrically for `nums2[j]`. The answer
is the smaller of the two final states. Only the previous row is read
while sweeping row-major, so two rolling rows of pairs suffice.

Purely local strategies fail here: spending a cheap number early can
strand the other array's parity later — with
`nums1 = [0], nums2 = [0,0,0,1]` grabbing the even `2` up front forces
`[4,6,8,9]` and a maximum of 9, while holding it back until after
`[2,4,6,7]` finishes at 8. Values stay small regardless: the first slot
costs at most 2 and each of the `m ≤ n + m ≤ 2000` steps adds at most 2,
so the answer is bounded by `2(n+m) ≤ 4000`, far inside 32-bit range
(and trivially exact for JavaScript's Number).

**Complexity:** `O(mn)` time, `O(m)` space.
