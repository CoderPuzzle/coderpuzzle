# Solutions — Largest Plus Sign

## Four-direction run-length dynamic programming

A plus sign lives or dies by its shortest arm: the largest order centered at a
cell is the number of consecutive `1`'s leaving it in the most blocked of the
four directions, the center included. What a cell needs is therefore not the
whole grid but four run lengths — how many consecutive `1`'s start at the cell
and walk left, right, up, and down before a `0` or the border stops them.

Each of the four lengths is a running counter. One grid `dp` starts with every
cell uncapped at `n`, and the mines drop their cells to `0`; a cell is free
exactly while its entry is positive, through every sweep. A left-to-right pass
over a row carries the length of the current run of free cells and lowers each
entry to it; the right-to-left, top-to-bottom, and bottom-to-top passes do the
same from their sides. After the four sweeps `dp[i][j]` is capped by all four
arm lengths, which is precisely the order of the largest plus centered at
`(i, j)` — and a mined cell stays `0`, because every counter restarts at it.

Each sweep reads and writes each cell once, so the four passes together do
`O(n²)` work over one `n x n` grid; the answer is the maximum entry.

**Complexity:** `O(n²)` time, `O(n²)` space.
