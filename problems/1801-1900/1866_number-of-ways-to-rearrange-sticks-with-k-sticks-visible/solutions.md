# Solutions — Number of Ways to Rearrange Sticks With K Sticks Visible

## DP on the shortest stick

Classify arrangements of `i` sticks by where the shortest stick (length 1) sits. If it is in the leftmost position it is visible — nothing longer stands before it — and it contributes nothing else, leaving a subproblem with `i - 1` sticks and `j - 1` visible: `f(i-1, j-1)` ways. If it sits in any of the other `i - 1` positions, some longer stick stands to its left, so it is hidden; removing it changes neither what is visible nor the relative order of the rest, giving `(i-1) · f(i-1, j)` ways. Hence `f(i, j) = f(i-1, j-1) + (i-1)·f(i-1, j)`, with the base `f(0, 0) = 1`.

The implementation keeps only one row: `cur[j]` holds `f(i, j)` for the current `i`, and each pass builds the next row from it, taking every term modulo `10^9 + 7`. The row is indexed by visibility count up to `k`, which is all that is ever needed since `j` never exceeds `k`. After `n` passes, `cur[k]` is the answer.

The boundary `k = n` illustrates the recurrence collapsing correctly: every arrangement must be fully increasing, and indeed only the leftmost-shortest branch can fire until the single increasing order is produced. The other boundary `j = 1` counts arrangements where only the longest stick is visible.

**Complexity:** `O(nk)` time, `O(k)` space.
