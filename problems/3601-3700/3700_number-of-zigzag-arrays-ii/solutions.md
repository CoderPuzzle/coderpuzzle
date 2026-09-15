# Solutions — Number of ZigZag Arrays II

## Mirrored transfer matrix

Once an array has two elements, every later step is forced to turn, so a
growing array is fully described by its last value `v` and the direction its
next step must take. Counting arrays by that pair makes the evolution
linear: from "must rise at `v`" any `w > v` appends and lands in "must
fall", from "must fall" any `w < v` lands in "must rise". That is a `2m x 2m`
transfer matrix (`m = r - l + 1`) which, applied to the all-ones starting
vector once per element after the first, carries the total count in its sum.

The two direction blocks are redundant. Mapping every value `x` to
`l + r - x` exchanges "must rise" with "must fall" while leaving the
all-ones start vector unchanged, so the falling block is always the mirror
image of the rising one, entry for entry. One block therefore suffices, and
it evolves by the single `m x m` matrix `S` with `S[w][u] = 1` exactly when
`u + w <= m - 2` — a prefix-sum form of "step down to `w`". The answer is
twice the mass of `S^(n-1)` applied to all ones; binary exponentiation over
the at most 30 bits of `n - 1` supplies the power, applying `S^(2^i)` to the
working vector whenever bit `i` is set (powers of one matrix commute).

Both squarings and width need care. `S[w][u]` depends only on `w + u`, so
`S` is symmetric and stays symmetric under powers: each squaring is the Gram
matrix of the rows, computed on one triangle and mirrored, halving the work.
A dot product of up to 75 residue pairs reaches magnitude near `2^67`, past
64-bit range, so fixed-width languages reduce every eight additions
(`8 * (10^9 + 6)^2` still fits comfortably), JavaScript splits each row into
15-bit halves against a pre-scaled partner row to keep every partial below
`2^53`, and Python's integers need nothing special. Every intermediate is a
sum of nonnegative residues, so no remainder ever goes negative.

**Complexity:** `O(m^3 log n)` time, `O(m^2)` space.
