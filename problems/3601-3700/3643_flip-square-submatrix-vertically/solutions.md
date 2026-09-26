# Solutions — Flip Square Submatrix Vertically

## Two-pointer row swaps

Reversing the order of the square's rows is exactly what a pair of pointers
moving inward from its top and bottom edges achieves: swap the two rows the
pointers sit on, step both toward the middle, and stop once they meet or
cross. Only rows strictly inside the square are ever touched; a middle row
of an odd-sided square ends up paired with itself and needs no work.

![On Example 1's 4 x 4 grid, the pointers pair the 3 x 3 square's outer rows and swap rows 1 and 3 across columns 0-2, leaving middle row [9,10,11] untouched: row 1 becomes [13,14,15,8] and row 3 becomes [5,6,7,16].](figures/solution-two-pointer-row-swaps.svg)

Each row exchange moves exactly the k columns the square spans, so cells
outside it are never read or written and survive verbatim. The swaps run in
place on grid itself, and the method hands back that same matrix once the
pointers meet.

**Complexity:** `O(k^2)` time, `O(1)` space.
