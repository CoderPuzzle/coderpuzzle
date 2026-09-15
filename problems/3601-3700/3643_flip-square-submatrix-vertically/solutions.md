# Solutions — Flip Square Submatrix Vertically

## Two-pointer row swaps

Reversing the order of the square's rows is exactly what a pair of pointers
moving inward from its top and bottom edges achieves: swap the two rows the
pointers sit on, step both toward the middle, and stop once they meet or
cross. Only rows strictly inside the square are ever touched; a middle row
of an odd-sided square ends up paired with itself and needs no work.

Each row exchange moves exactly the k columns the square spans, so cells
outside it are never read or written and survive verbatim. The swaps run in
place on grid itself, and the method hands back that same matrix once the
pointers meet.

**Complexity:** `O(k^2)` time, `O(1)` space.
