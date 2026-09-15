# Solutions — Probability of a Two Boxes Having The Same Number of Distinct Balls

## Enumerate split vectors, count with binomial coefficients

Every shuffle that lands the first `n` balls in box 1 corresponds to a
vector `(x1, ..., xk)` saying how many balls of each color went to box 1,
and the number of shuffles realizing one vector is the product of the
per-color choices `C(balls[i], xi)` — the colors are independent once
the split is fixed. The denominator is the total `C(2n, n)`.

The solution walks the colors recursively, tracking how many balls still
fit in box 1 and how many colors each box has so far; at the last color
it adds the product of binomials to the numerator whenever the two
distinct-color counts match. Pruning the branch when the remaining balls
cannot fill box 1 keeps the recursion inside the small search tree (at
most `7⁸` nodes, in practice far fewer because the counts must sum to
`n`).

Everything is computed with exact integer binomials — numerators and the
denominator are integers well within 64-bit range (`C(48, 24)` is about
`3.2 · 10¹³`) — and the single final division produces the double the
statement asks for, so no floating-point error accumulates through the
summation.

**Complexity:** `O(∏(balls[i] + 1))` split vectors enumerated, `O(k)`
recursion depth and table space.
