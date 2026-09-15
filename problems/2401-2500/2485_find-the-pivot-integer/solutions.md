# Solutions — Find the Pivot Integer

## Collapse both halves into one square

The condition `sum(1..x) == sum(x..n)` looks like it needs two separate
sums, but both have closed forms: the left side is `x(x+1)/2`, and the
right side is the total `T = n(n+1)/2` minus `sum(1..x-1) = (x-1)x/2`.
Setting the two equal gives `x(x+1)/2 = T - (x-1)x/2`, and the `x²` terms
on the left combine to exactly `2x² = n(n+1)` — the `+x` and `-x` cancel.
So a pivot exists precisely when `T` is a perfect square, and that pivot is
its square root.

The whole task reduces to a single integer square root: compute `T`, take
`r = √T` with the language's exact-integer or exactly-rounded square root,
and return `r` if `r² == T`, otherwise `-1`. The four pivot inputs within
`n <= 1000` are 1, 8, 49 and 288, corresponding to the square-triangular
totals 1, 36, 1225 and 41616.

This sidesteps hint 2's prefix-sum machinery entirely, but that machinery
still works as a fallback: a linear scan of `x` comparing `sum(1..x)`
against `sum(x..n)` would also terminate at the pivot or run off the end.
Since `T` never exceeds 500500, every value in the closed-form path fits
comfortably in a 32-bit integer.

**Complexity:** `O(1)` time, `O(1)` space.
