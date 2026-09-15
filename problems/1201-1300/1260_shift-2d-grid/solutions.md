# Solutions — Shift 2D Grid

## Flattened rotation via modular arithmetic

Row-major order turns the grid into a single list of `m*n` cells, and one
shift is exactly a cyclic right-rotation of that list: the shift rule moves
each cell one slot forward with wraparound at the end. Applying it `k` times
rotates by `k`, so every source cell `p` lands at destination `(p + k) mod
(m*n)` — no intermediate grids, no per-step copying.

Write each flattened value back at its shifted index, reshaped to `m` rows of
`n`.

**Complexity:** `O(m*n)` time, `O(m*n)` space for the output.
