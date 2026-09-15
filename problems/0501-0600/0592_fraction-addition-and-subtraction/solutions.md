# Solutions — Fraction Addition and Subtraction

## Cross-multiply integers, reduce once

The expression is a flat run of signed fractions, so one left-to-right scan
reads it whole: an optional `'+'`/`'-'`, the numerator's digits, the `'/'`, the
denominator's digits. Each fraction folds into a running `num/den` pair by
cross-multiplication — `num/den ± v/w = (num*w ± v*den)/(den*w)` — so the sum
never leaves integer arithmetic. Floating point is disqualified up front:
binary decimals cannot represent thirds or sevenths exactly, and the answer
must match the irreducible fraction to the last digit.

The accumulator is safe everywhere. At most ten fractions with both parts in
`[1, 10]` give an unreduced denominator of at most 10¹⁰ and a numerator below
10¹¹ — orders of magnitude inside a signed 64-bit integer, and below 2⁵³, so
even JavaScript's doubles carry every intermediate exactly. A single Euclidean
pass then reduces the pair, and the special renderings fall out of that pass
rather than out of special cases: `gcd(0, den)` is `den`, so a zero sum
collapses to `"0/1"`, and an integer result already sits on denominator 1,
keeping the `"/1"` tail the statement demands (`2` prints as `"2/1"`).

Signs live on the numerator alone. Every input denominator is positive, and a
product of positives stays positive, so `den` never carries a sign and the
`'+'` the format omits never appears: a negative result renders with the
leading minus, a positive or zero one without it.

**Complexity:** `O(n)` time in the expression's length — each character is
visited exactly once — and `O(1)` space.
