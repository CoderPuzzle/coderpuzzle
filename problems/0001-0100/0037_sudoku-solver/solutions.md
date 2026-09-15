# Solutions — Sudoku Solver

## Backtracking with bitmask constraint sets

One pass over the grid collects the coordinates of every empty cell into a list and records the digits already used in 27 bitmasks — one per row, one per column, one per 3×3 box, with box index `(r // 3) * 3 + c // 3` and digit `d` encoded as the bit `1 << d`. The solver then fills the empty cells in list order: for cell `k` it tries each digit `1..9` whose bit is clear in that cell's row, column, and box masks, which turns the legality check into three constant-time ANDs instead of re-scanning 27 cells.

![The first empty cell (0,1) sees row-0, column-1 and box-0 masks {3,5,7}, {3,6,9} and {3,5,6,8,9}, leaving candidates {1,2,4}.](figures/solution-constraint-masks.svg)

Choosing a digit sets its three bits and writes it into the board; the recursion then attacks cell `k + 1`. If every choice downstream fails, the placement is undone — the bits are cleared with XOR and the cell reverts to `.` — and the next digit is tried. The first call that runs past the last empty cell returns `True`, and that `True` unwinds the whole stack immediately, so the solver stops at the first complete consistent assignment. That assignment is the answer because the puzzle is guaranteed to have exactly one solution; the board has been mutated in place and is returned as-is.

In the worst case each of the `m` empty cells branches over at most 9 digits (the bitmask pruning cuts real instances down far below that bound); the recursion is `m` frames deep, and the 27 masks are constant space.

**Complexity:** `O(9^m)` time, `O(m)` space.
