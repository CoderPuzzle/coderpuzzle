# Solutions — Right Triangles

## Corner-cell counting

A right triangle always has exactly one cell that serves as its corner:
the statement requires one element sharing a row with another and a
column with the third, and only the corner of an L does both. (Two
corners would need four distinct cells; three collinear cells share rows
or columns but never both at once.) So it suffices to count, for every
cell of value 1 used as the corner, how many ways there are to pick the
horizontal leg endpoint — any _other_ 1 in that row — times the vertical
endpoint — any _other_ 1 in that column. Those picks are independent, so
a lone cell with `row[x]` ones in its row and `col[y]` ones in its column
contributes exactly `(row[x] - 1) * (col[y] - 1)`.

One pass over the matrix builds both count arrays; a second multiplies
and accumulates over the 1-cells. Nothing about order or distance matters
("may not be next to each other" simply permits gaps), so no pair loops
are needed beyond the products themselves. The densest 1000 x 1000 grid
caps the answer near `10^6 * 999^2 ≈ 9.98 × 10^11`, which is why the
accumulator must be 64-bit wide everywhere — and why JS stays exact
(`< 2^53`).

**Complexity:** `O(rows · cols)` time, `O(rows + cols)` extra space.
