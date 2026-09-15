# Solutions — Sparse Matrix Multiplication

## Multiply only the nonzero pairs

A zero on either side of a product `mat1[i][p] * mat2[p][j]` makes that
product zero, so the classic triple loop spends most of its work multiplying
by nothing: a single zero in row `i` of `mat1` zeroes out an entire row of
`mat2`, and a zero in `mat2` contributes nothing to any entry. The fix is to
never touch those products at all. The code first compresses `mat2` into, for
each row `p`, the list of `(column, value)` pairs that are nonzero — the only
entries a nonzero `mat1` cell can ever pair with.

It then walks each row of `mat1` and skips its zero cells. Each nonzero
`mat1[i][p]` scatters `value * other` into `result[i][j]` over exactly the
nonzero pairs of `mat2`'s row `p`, accumulating into a result that starts
zeroed — so entries whose every contributing product had a zero on one side
are already correct without being touched. Degenerate shapes need no special
casing: `k = 1` is an outer product, a `1 x k` by `k x 1` pair a dot product,
and an all-zero row or column simply contributes nothing.

The magnitudes stay put: each product is at most `100 * 100` in absolute
value and at most `k = 100` terms meet, so no result entry exceeds `10^6` in
absolute value — comfortably inside a 32-bit integer.

**Complexity:** `O(mk + kn + P)` time, where `P` is the number of index
triples `(i, p, j)` with both `mat1[i][p]` and `mat2[p][j]` nonzero — at most
`mkn`, but proportional to the real work on sparse inputs; `O(mn + nnz(mat2))`
space for the result and the nonzero lists.
