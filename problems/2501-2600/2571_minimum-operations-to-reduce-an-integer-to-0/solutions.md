# Solutions — Minimum Operations to Reduce an Integer to 0

Any sequence of operations turns into arithmetic on powers of two: adding
`2ᵏ` `a` times and subtracting it `b` times nets out as a signed multiple
`(a − b) · 2ᵏ`, and every single operation costs one step. So minimizing
the number of operations is exactly finding the signed binary
representation of `n` — coefficients `dₖ ∈ ℤ` with `Σ dₖ·2ᵏ = n` — whose
sum `Σ |dₖ|` is smallest.

## Signed-digit greedy (non-adjacent form)

Reitwiesner's classic construction settles each column from the bottom up.
When the current value is even, that column carries no term and we shift
right; when it is odd, the next two bits pick the cheaper sign — an
`...01` ending subtracts a `+1`-term, an `...11` ending adds a `+1`-term so
the carry collapses the whole run of ones into a single higher column. This
produces the **non-adjacent form** of `n`, whose weight is provably minimal
among all signed binary representations, hence the operation count is
optimal. The loop runs `O(log n)` iterations with O(1) work per bit — for
this problem's bound `n ≤ 10⁵` barely 17 columns — and the counts stay
tiny (well under 20), leaving both integer safety and runtime trivial. The
same idea scales unchanged to the hint's bonus range: everything fits any
64-bit integer through `n ≤ 10¹⁸`.

An independent way to sanity-check the greedy is BFS over the graph whose
nodes are integers and whose edges jump by any power of two: distances
from `n` down to `0` agree with the NAF weights across the entire
constraint domain, which the case generator asserted exhaustively.

**Complexity:** `O(log n)` time, `O(1)` space.
