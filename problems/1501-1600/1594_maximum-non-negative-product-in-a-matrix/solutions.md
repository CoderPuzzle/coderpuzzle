# Solutions — Maximum Non Negative Product in a Matrix

## Track both the max and min product reaching each cell

A path's product can flip sign at any negative cell, so tracking only the
best product seen so far at each cell is not enough: a very negative
running product, multiplied by another negative cell, can become the
largest positive product reachable there. The fix is to carry two values
per cell — the maximum and the minimum product of any path ending there —
computed with a rolling pair of rows. Each cell has at most two
predecessors (the cell above and the cell to its left), so its new
maximum and minimum are just the largest and smallest of the (up to) four
products formed by multiplying each predecessor's max and min by the
current cell's value; no case analysis on the current cell's sign is
needed, since taking a global max/min over all four candidates handles
sign flips automatically.

The only subtlety is how large these running products get: a path visits
at most `m + n - 1` cells (at most `29` for the `15 x 15` bound), and
every cell magnitude is at most `4`, so the largest possible product
magnitude is `4^29`, about `2.9 * 10^17`. That comfortably fits a 64-bit
signed integer (max `~9.2 * 10^18`), so the DP can accumulate exact
products the whole way through and reduce modulo `10^9 + 7` only once,
on the final answer — taking the modulo at every step would corrupt the
max/min comparisons, since a reduced value no longer reflects which of
two products is actually larger. In JavaScript and TypeScript, where the
native number type only represents integers exactly up to `2^53`, the
running products are kept as `BigInt` instead of `number` for the same
reason. If the best product at the destination cell is negative, no
path has a non-negative product, so the answer is `-1`; otherwise the
final modulo reduction is applied to that single maximum.

**Complexity:** `O(m * n)` time, `O(n)` space.
