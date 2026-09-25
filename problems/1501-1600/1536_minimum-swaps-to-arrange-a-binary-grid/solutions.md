# Solutions — Minimum Swaps to Arrange a Binary Grid

## Trailing-zero counts with a greedy bubble-up

Row `i` (0-indexed) is only allowed to have `1`s in its first `i + 1`
columns, so it needs at least `n - i - 1` trailing zeros to be legal in
that position. For each row, precompute how many zeros trail after its
last `1` — a single right-to-left scan per row. This number is exactly
what stays unchanged no matter how far the row is bubbled up or down by
adjacent swaps, since a swap only moves whole rows and never touches
their contents.

Rows are then placed greedily from top to bottom. If the row already
sitting at position `i` has enough trailing zeros, nothing needs to move.
Otherwise, scan downward from `i` for the nearest row with at least
`n - i - 1` trailing zeros and swap it upward one adjacent pair at a
time until it reaches position `i`, adding one to the answer per swap.
Picking the _nearest_ qualifying row is what keeps the swap count
minimal: any row with enough trailing zeros would satisfy row `i`'s
requirement, but a farther one only costs more swaps to bring up, and
rows already placed above `i` are never disturbed again. If no row from
`i` onward has enough trailing zeros, the grid can never be made valid
and the answer is `-1`.

![On Example 1's grid [[0,0,1],[1,1,0],[1,0,0]] the trailing-zero counts 0, 1, 2 are fixed per row, so row [1,0,0] bubbles up 2 adjacent swaps into row 0 and row [1,1,0] with 1 trailing zero needs 1 more swap to cover row 1 — 3 swaps in total.](figures/solution-trailing-zero-bubble.svg)

**Complexity:** `O(n^2)` time, `O(n)` space.
