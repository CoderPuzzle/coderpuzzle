# Solutions — Count Submatrices With All Ones

## Column Heights With Running Minimum

Enumerating submatrices by their four corners is quartic; the efficient anchor is the bottom edge. For each row r, let height[c] be the number of consecutive ones ending at row r in column c. Then for a fixed bottom row and a fixed column span, the number of all-ones submatrices with that bottom row and span equals the minimum height over the span: the submatrix must be one block of ones of some height h, and every h from 1 up to that minimum works. Summing this minimum over all rows and all column spans counts each submatrix exactly once, since a submatrix has a unique bottom row and column span.

The height array is maintained incrementally: a one extends the previous column run, a zero resets it to zero. For the inner enumeration, the left column is fixed and the right edge sweeps outward while a single running variable tracks the minimum height of the growing span — the minimum over a span only decreases as the span widens, so no recomputation is needed, and each visited span contributes its current minimum to the total.

The double loop per row visits every span of every row exactly once, which replaces the naive per-span minimum rescan with constant amortized work per span. All-zero rows simply contribute zero, and single cells are covered as spans of length one whose minimum is the column height itself.

**Complexity:** `O(m · n²)` time, `O(n)` space.
