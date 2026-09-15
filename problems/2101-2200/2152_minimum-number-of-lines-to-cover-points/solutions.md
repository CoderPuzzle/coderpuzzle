# Solutions — Minimum Number of Lines to Cover Points

With at most 10 points, the whole question is small enough to search
exhaustively — but not so small that trying every way of drawing lines
blindly is pleasant. The insight that tames it: a line is only ever
justified by the points it covers, so the set of points already covered
is a complete description of where a partial solution stands.

## Bitmask dynamic programming over covered points

Encode the covered points as a bitmask and let `dp[covered]` be the
fewest lines that cover exactly that subset, built forward from
`dp[0] = 0`. In any state, the lowest still-uncovered point `i` has to
be on the next line drawn, so it suffices to branch on how that line
looks: either it covers `i` alone (needed when `i` is the last point
left), or it passes through one more uncovered point `j` — and then it
may as well cover _every_ point collinear with the pair, since extra
coverage is free. A cross-product comparison `(j - i) × (k - i) = 0`
decides collinearity in pure integer arithmetic, dodging slopes and
division; with coordinates bounded by 100 every product stays far
inside a 32-bit integer.

Precomputing the full collinear mask for each ordered pair makes each
transition a table lookup, so the sweep over all `2^n` covered-sets
does `O(n)` pair transitions apiece. The answer lands in
`dp[(1 << n) - 1]`; the loop is flat and iterative, no recursion
anywhere. Ten points mean 1024 states and at most 100 pair masks — a
few tens of thousands of integer operations in the worst case.

**Complexity:** `O(2ⁿ · n²)` time, `O(2ⁿ + n²)` space.
