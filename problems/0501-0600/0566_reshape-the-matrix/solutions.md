# Solutions — Reshape the Matrix

## Flat index, division and modulus

A reshape can only move elements around, never create or destroy them, so an
`r x c` target is legal exactly when its area equals the source's:
`r * c == m * n`. That one comparison is the whole legality test — any pair
with the right product works, whatever the rectangle's proportions — and when
it fails the original matrix comes back untouched.

The fill is driven by a single flat index `i` running from `0` to
`m · n - 1`. In the source, element `i` sits at `mat[i / n][i % n]`; in the
target it belongs at `reshaped[i / c][i % c]`. Reading `i` upward enumerates
the source in row-traversing order — all of row 0, then all of row 1 — and
deposits those elements into the target in that same order, which is exactly
the rule the statement imposes. Division and modulus against each width do
all of the index arithmetic; there are no row or column counters to keep in
step.

The degenerate shapes are the same loop in miniature and need no special
cases: `r = m, c = n` copies the matrix, a one-row or one-column target
flattens or stacks it, and a single cell goes to another single cell. The
`m · n <= 10⁴` ceiling bounds the walk at ten thousand iterations.

**Complexity:** `O(m · n)` time, `O(1)` extra space beyond the returned
matrix.
