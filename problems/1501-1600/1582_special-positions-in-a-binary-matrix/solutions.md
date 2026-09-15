# Solutions — Special Positions in a Binary Matrix

## Row and column counts first

Whether a `1` at `(i, j)` is special depends on every other cell in its
row and its column, so checking cells one at a time against the whole
matrix would recheck the same rows and columns over and over. Precomputing
how many `1`s sit in each row and in each column removes that repetition:
a single pass over `mat` fills `rowCount[i]` and `colCount[j]`, and after
that a cell's status is a lookup rather than a scan.

With both tallies in hand, a second pass over the matrix counts the
special positions directly. A cell qualifies when it holds a `1` and its
row's total and its column's total are each exactly `1` — that single `1`
is unmatched by any other in its row or column, which is exactly the
special-position condition from the statement. No cell needs to inspect
its neighbors individually; the row and column counts already summarize
everything a check would need.

**Complexity:** `O(m*n)` time, `O(m+n)` space.
