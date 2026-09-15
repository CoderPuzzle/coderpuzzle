# Solutions — Snake in Matrix

A cell's flat index is completely determined by where the snake sits: a
position `(row, col)` names the cell `row * n + col`. So tracking the snake
is the same as tracking two small counters, and the answer falls out of
them at the end.

## Row-and-column walk

Each command shifts exactly one coordinate by one step — "UP" and "DOWN"
change the row, "LEFT" and "RIGHT" change the column — so simulating the
walk needs nothing more than a row and a column updated once per command.
Because the statement guarantees the snake never leaves the grid, no
boundary checks are required: every intermediate coordinate stays within
`[0, n)`.

The code starts from cell 0, i.e. `(0, 0)`, scans `commands` in order, and
applies the matching delta for each of the four directions. After the last
command the two counters hold the final cell's row and column, and the
answer is their flattened index `row * n + col`. Commands may cancel out —
a "RIGHT" followed by a "LEFT", or a full trip around the perimeter — but
the counters handle that naturally; the walk simply revisits cells it has
been to before.

With at most 100 commands, the work is one linear scan with constant work
per command and two integers of state. The result is bounded by
`9 * 10 + 9 = 99`, nowhere near any integer limit.

**Complexity:** `O(m)` time, `O(1)` space.
