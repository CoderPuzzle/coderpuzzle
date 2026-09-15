# Solutions — Make a Square with the Same Color

## Three-of-a-kind square scan

One recolor can only repair a 2 x 2 square that is already _almost_
monochrome. If a square's four cells are split 2-2 between 'B' and 'W', a
single flip turns it into a 3-1 split, still not uniform — so 2-2 squares
are hopeless. Any other composition (4-0, or 3-1 in either direction)
already has one color owning at least three cells, and flipping that odd
cell — doing nothing when it is 4-0 — finishes the square. The condition
therefore collapses to: some 2 x 2 square holds at least three cells of
one color.

The grid has exactly four candidate 2 x 2 squares, anchored at top-left
corners `(0,0)`, `(0,1)`, `(1,0)`, `(1,1)`. Counting how many of each
square's cells are 'B' answers everything: if that count is exactly 2 the
square is split 2-2 and cannot be fixed by one change; any other count (0,
1, 3, 4) means the majority color owns three or more cells and the answer
is true. Example 2's checkerboard splits every square 2-2 and returns
false; example 1 hides a square with three 'B' cells under `grid[0][2]`.

**Complexity:** `O(1)` time and `O(1)` space — sixteen cell reads over
four fixed windows.
