# Solutions — Difference Between Ones and Zeros in Row and Column

## Row and column one-counts, then a closed-form cell

Every cell shares its row's one-count with the rest of that row and its
column's one-count with the rest of that column, so recomputing those
counts per cell would repeat the same work `m + n` times per cell. The
first pass instead records each row's one-count in `rowOnes` and each
column's one-count in `colOnes`, two cheap sweeps over the matrix.

A row of width `n` holding `rowOnes[i]` ones holds `n - rowOnes[i]` zeros;
a column of height `m` holding `colOnes[j]` ones holds `m - colOnes[j]`
zeros. Substituting both into the statement's definition collapses the
four terms into two:

```
diff[i][j] = rowOnes[i] + colOnes[j] - (n - rowOnes[i]) - (m - colOnes[j])
           = 2 * rowOnes[i] + 2 * colOnes[j] - m - n
```

The second pass fills the result matrix with this constant-time formula,
touching each cell exactly once. Every intermediate and answer is tiny
relative to `10⁵`, so 32-bit arithmetic is exact in every language; the
largest magnitude is `m + n`, bounded by `10⁵ + 1` given `m * n <= 10⁵`.

**Complexity:** `O(m * n)` time, `O(m + n)` space for the two count
arrays (besides the required output matrix).
