# Solutions — Lonely Pixel I

## Row and column counts

A pixel is lonely exactly when it is the only `'B'` in its row and the only
`'B'` in its column — two facts about the pixel's row and column rather than
about the pixel itself. So the question for every cell can be answered from
just two tables of totals: how many black pixels row `i` holds, and how many
column `j` holds.

The first pass walks the whole picture once and tallies both tables at the
same time: a `'B'` at `(i, j)` increments `row_count[i]` and `col_count[j]`.
The second pass revisits the cells and counts the black ones whose row and
column totals are both exactly `1` — no other `'B'` shares either line, which
is precisely the definition. White cells are never lonely, so only `'B'`
cells are ever tested.

Each pass touches every cell once, and the only storage beyond scalars is the
`m` row counters plus the `n` column counters. The answer is at most
`min(m, n)`, because no two lonely pixels can share a row or a column — at
the `500 x 500` ceiling that is far inside a 32-bit integer.

**Complexity:** `O(mn)` time, `O(m+n)` space.
