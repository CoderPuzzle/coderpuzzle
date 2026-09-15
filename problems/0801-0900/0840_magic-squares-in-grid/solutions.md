# Solutions — Magic Squares In Grid

A magic square is a property of one `3 x 3` block alone, so the grid
contributes nothing but the places a block can sit: every top-left corner
`(r, c)` with room for two more rows and two more columns holds an
independent candidate, and the answer is the number of candidates that pass
one fixed test.

## Slide a 3 x 3 window and test it

The test runs three layers, each worth checking before the next. Arithmetic
first: nine distinct values from `1` to `9` total `45`, so each row of a
magic square sums to `45 / 3 = 15`, and the four lines through the center —
middle row, middle column, and both diagonals — together count every cell
once but the center four times, adding to `4 · 15 = 45 + 3 · center`. That
forces the center to be `5`, so a single comparison rejects any window
whose center is anything else. Survivors have their three rows, three
columns, and two diagonals checked against `15` directly.

Sums alone are not a verdict. The window `[[3,9,3],[5,5,5],[7,1,7]]` holds
every one of the eight lines at `15` with a `5` in the center, yet repeats
its values; `[[1,8,6],[10,5,0],[4,2,9]]` manages it with nine distinct
entries, but two of them — `10` and `0` — fall outside `1..9`, exactly the
freedom the statement's note grants the grid. The last layer is therefore a
seen-set over the nine entries, rejecting anything below `1`, above `9`, or
already present. A window passing all three layers is a permutation of
`1..9` with every line equal: the definition verbatim.

The sweep is a plain double loop over the `(row - 2) · (col - 2)` window
positions, accumulating a count; a grid with fewer than three rows or
columns leaves the range empty and returns zero. The seen-set is bounded by
ten flags, so nothing the scan allocates grows with the grid.

**Complexity:** `O(row·col)` time, `O(1)` space.
