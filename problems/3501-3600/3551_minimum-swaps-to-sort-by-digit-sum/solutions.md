# Solutions — Minimum Swaps to Sort by Digit Sum

## Permutation-Cycle Swaps

The target order is fixed by the key `(digit sum, value)` — the value
tiebreak is what makes the order total, since equal digit sums must end
up in increasing value order. Any rearrangement of distinct elements into
a fixed target decomposes uniquely into permutation cycles: an element at
position `i` belongs at target position `pos[i]`, and following `pos`
partitions all positions into disjoint cycles. A cycle of length `L` is
resolved by exactly `L - 1` swaps — each swap can place at most one
element into its final position, and the cycle's last element falls into
place for free — so the minimum total is `n - (number of cycles)`.

Computing it takes one sort of index array by the key plus one linear
pass: walk each unvisited cycle to its full length, marking positions as
they are visited, and accumulate `length - 1`. The walk is iterative —
with `n` up to `10⁵` a recursive traversal would blow the stack — and
digit sums are peeled arithmetically (`% 10`, `/ 10`), at most nine
digits for values up to `10⁹`, so every key fits comfortably in a 32-bit
integer.

**Complexity:** `O(n log n)` time, `O(n)` space.
