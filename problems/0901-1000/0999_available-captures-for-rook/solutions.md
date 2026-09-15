# Solutions — Available Captures for Rook

## Scan the four directions from the rook

The board is a fixed 8 x 8 grid with exactly one `R`, so the first step is
a single pass over all 64 cells to find its row and column. From there
the method walks outward in each of the four cardinal directions in
turn — up, down, left, right — stepping one square at a time while the
square ahead is empty (`.`). The walk in a direction stops as soon as it
either steps off the board or lands on a non-empty square: a `p` counts
as a capture, and a `B` (or the edge) yields nothing for that direction,
exactly matching the rule that a rook cannot move through another piece.

Because each of the four scans is independent and bounded by the board's
fixed 8-square width, the whole method runs in constant time regardless
of how many pieces are on the board.

**Complexity:** `O(1)` time, `O(1)` space (the board is always 8 x 8).
