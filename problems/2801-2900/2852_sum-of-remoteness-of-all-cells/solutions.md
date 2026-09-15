# Solutions — Sum of Remoteness of All Cells

## Component totals over one pass of flood fills

Moves never leave the non-blocked cells, so the grid splits into connected
components and a cell can reach exactly the members of its own component.
Its remoteness is therefore the same number for every cell of one component:
the grand total `S` of all non-blocked values minus that component's own
value sum. Summing this per-cell value over every cell counts each component
once per member cell, which collapses the whole question to
`size_c * (S - values_c)` accumulated over components — blocked cells
contribute nothing.

So scan the grid, launch one iterative flood fill from every unvisited
non-blocked cell while collecting its size and value sum in the same walk,
then fold the closed-form accumulation at the end. The explicit stack marks
cells visited at push time, keeping the traversal flat on the 300 x 300
worst case instead of recursing to grid depth. Arithmetic must be 64-bit:
`S` reaches `300 * 300 * 10^6 = 9 * 10^10`, and the answer is bounded by
`n * S < 8.1 * 10^15`, far past 32-bit range yet exactly representable in a
double (`< 2^53`).

**Complexity:** `O(n²)` time, `O(n²)` space.
