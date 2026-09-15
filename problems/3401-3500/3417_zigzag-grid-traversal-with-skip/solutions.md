# Solutions — Zigzag Grid Traversal With Skip

## One walk with a take/skip toggle

The zigzag order is fixed by the grid alone: even rows are read
left-to-right and odd rows right-to-left, so a single sweep over the rows
— reversing every odd row on the way in — enumerates the cells in exactly
the order the traversal visits them. No coordinates need to be tracked;
the row index alone decides the direction.

The skip rule is the other half of the state. "Every alternate cell"
means the first visited cell is taken, the next skipped, and so on, which
is a boolean toggle that flips at every cell regardless of row
boundaries — the alternation continues across the drop from one row to
the next, which is what makes a per-row solution wrong and a single
global walk right. Whenever the toggle reads "take", the current value is
appended; either way the toggle flips before the next cell.

The result is built in one pass: at most 50 * 50 = 2,500 cells are
visited and every value fits comfortably in 32 bits, so the whole
traversal is `O(m * n)` time with `O(1)` state beyond the output list
itself.

**Complexity:** `O(m * n)` time, `O(m * n)` space for the output.
