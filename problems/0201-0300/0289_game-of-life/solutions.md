# Solutions — Game of Life

The simultaneity requirement is the crux for both variants: every cell's
next state must be derived from the _old_ states of its neighbors, yet each
must write its new state into the same board. Both walk every cell, count
live neighbors among the eight surroundings with bounds checks (cells
outside the board count as dead), apply the survival rule — live with 2 or
3 live neighbors stays live, otherwise dies — and the birth rule — dead
with exactly 3 live neighbors becomes live. They differ only in how the old
generation stays readable while the new one is written.

Edge cases fall out naturally in both: single-row or single-column boards
simply have most neighbors out of bounds, a 1×1 live board counts zero live
neighbors and dies, and the 2×2 all-live block survives because each cell
sees exactly three live neighbors.

## Copy

Take a snapshot of the whole board first, then read every neighbor count from the snapshot while writing the next states straight into the board. The two generations never interfere: reads always see time t, writes only ever land as final 0/1 values for time t+1, and no cleanup pass is needed.

The cost is the copy itself — an entire extra board, `O(m·n)` memory. It is the most direct expression of "apply the rules simultaneously" and a fine default when the follow-up's in-place constraint does not apply.

**Complexity:** `O(m·n)` time, `O(m·n)` space.

## State bits

The follow-up's in-place answer: let the same cell carry both generations. Two intermediate markers cover the two transitions — `2` means "was live, will die" and `3` means "was dead, will live" (in both, the low bit already holds the next state, so odd values end up live). While the first pass scans, a cell's original state can still be recovered: values `1` and `2` both mean the cell was live, `0` and `3` both mean it was dead. A live cell with fewer than 2 or more than 3 live neighbors becomes `2`; a dead cell with exactly 3 becomes `3`; cells keeping their state are left untouched. Because neighbor counting only looks for `1` or `2`, a cell already rewritten to `3` still correctly reads as "was dead" to later scans in the same pass.

A second pass normalizes the board: `1` and `3` become `1`, everything else becomes `0`. After this the board holds exactly the next generation, and the transformed board is returned. The encoding makes the update in-place with `O(1)` extra memory, and only integer arithmetic is involved, so the representation extends to larger or sparser boards without changes to the logic.

**Complexity:** `O(m·n)` time, `O(1)` space.
