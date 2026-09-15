# Solutions — Minesweeper

## Breadth-first flood reveal

Each square's fate is decided by one local fact: the number of mines among
its eight neighbors. A click on a mine ends the game at once — stamp `'X'`
and stop, nothing else changes. A clicked `'E'` with a positive count
becomes that digit and reveals nothing else. A zero count turns the square
`'B'` and hands the reveal to every adjacent unrevealed square, which is
what makes the reveal a flood: it spreads from blank to blank and stops the
moment it reaches a digit, so the digit ring around each mine is exactly
the frontier where the flood dies.

The fill runs on an explicit queue rather than recursion, because a blank
region can span every cell of a `50 x 50` board, deeper than a call stack
safely allows. A cell may enter the queue twice — two blanks can share it
as a neighbor — but the still-`'E'` check on dequeue drops the stale copy,
so the first processing decides the face and no sentinel marking is needed.
Digits never enqueue their neighbors: the flood's stopping rule is the
control flow itself.

The reveal rewrites the input allocation in place and returns the same
`board`, now revealed — mine squares stay `'M'` (never revealed), and
squares beyond a digit frontier stay `'E'` for a later click. A click on an
already-revealed square would lie outside the stated click domain and
leaves the board unchanged, since only `'E'` squares are ever rewritten.

**Complexity:** `O(mn)` time (each cell is revealed at most once), `O(mn)`
space in the worst case (the queue).
