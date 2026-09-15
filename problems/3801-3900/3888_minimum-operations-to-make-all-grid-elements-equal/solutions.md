# Solutions — Minimum Operations to Make All Grid Elements Equal

## Affine target with a 2D prefix sum

Once a target value `T` is fixed, the operation counts are forced. Process
cells in row-major order. A cell `(i, j)` that can be the top-left corner of
a `k x k` block (that is, `i <= m - k` and `j <= n - k`) must receive exactly
`T` minus its current value in operations started there, because every other
block that could cover it has already been decided. Cells in the last `k - 1`
rows or columns cannot start a block, so they must already equal `T`.

Rather than guess `T`, track it symbolically. Every operation count `X[i][j]`
is an affine function `A * T + B` of the target, and the same is true of the
coverage a cell already receives from earlier blocks. A 2D prefix sum over
the `A` and `B` arrays answers that coverage query in `O(1)` per cell. The
coefficient `A` is always `0` or `1`, so the constraint `X[i][j] >= 0` is a
single lower bound on `T`, and each boundary cell imposes a linear equation
on `T`: it fixes `T` to one value, or requires a constant to vanish, or
leaves `T` free.

Feasibility therefore reduces to one pass. If the boundary equations
conflict, or any required operation count is negative at the chosen `T`, no
target works and the answer is `-1`. Otherwise the total number of operations
grows with `T`, so the minimum is attained at the smallest feasible target,
and the answer is `(sum A) * T + (sum B)`.

**Complexity:** `O(m * n)` time, `O(m * n)` space.
