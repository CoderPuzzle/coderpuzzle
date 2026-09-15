# Solutions — Remove All Ones With Row and Column Flips II

## Memoized recursion over the remaining ones

The board is tiny (`m * n <= 15`), so the whole game fits in a bitmask of
remaining 1-cells. From any position, some operation must clear a cell
that currently holds a 1, and trying every such cell as "the next
operation" covers all reachable plays: clearing row `i` and column `j`
removes exactly those cells from the mask, and the answer is one plus the
best continuation. A memo table keyed on the mask collapses the repeated
subpositions, giving at most `2^(m*n)` states with at most `m * n`
transitions each.

**Complexity:** `O(2^(m*n) * m * n)` time, `O(2^(m*n))` space.
