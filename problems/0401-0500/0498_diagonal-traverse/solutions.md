# Solutions — Diagonal Traverse

## Anti-diagonal walk, direction by parity

Every cell `(i, j)` lies on the anti-diagonal `i + j`, and the traversal
walks those diagonals in order, `d = 0` through `m + n - 2`. Which way each
diagonal is read is decided by its parity alone: even diagonals run up-right,
leaving from their bottom-most cell and climbing toward the top-right corner,
odd diagonals run down-left. That single rule reproduces the zig-zag of the
first example — `[1]`, then `[2, 4]`, then `[7, 5, 3]`, then `[6, 8]`, then
`[9]` — one anti-diagonal after another.

The code never steps cell to cell, so it never needs border checks or
direction flips. Diagonal `d` contains exactly the rows `i` from
`max(0, d - n + 1)` to `min(d, m - 1)` — a row belongs only when the column
`d - i` also stays inside the matrix — and the loop emits that row range
bottom-up on even `d`, top-down on odd `d`. Every element is appended exactly
once, and the only state beyond the output is the diagonal index and its two
row bounds.

The degenerate shapes need no special handling. A single row or a single
column makes every diagonal one cell long, so the alternating directions
never actually turn and the output is just that row or column in order; the
`m · n <= 10⁴` ceiling is what bounds the output at ten thousand values,
whatever the rectangle's proportions.

**Complexity:** `O(m · n)` time — each element is appended exactly once — and
`O(1)` extra space beyond the output list.
