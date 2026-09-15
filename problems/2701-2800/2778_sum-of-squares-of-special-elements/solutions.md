# Solutions — Sum of Squares of Special Elements

## One pass over positions

An element is special exactly when its position divides the length: position
`i` qualifies precisely when `n % i == 0`, so the special elements of `nums`
are the ones sitting at the divisors of `n`, read in increasing order. That
makes the question a single scan — walk `i` from 1 through `n`, test
`n % i == 0`, and add the square of the element into a running total whenever
the test passes.

One indexing subtlety: positions are counted from 1 while most languages
subscript arrays from 0, so position `i` lives at subscript `i - 1`. Each
position is visited once and contributes at most one square, so nothing can
be double-counted — even when `n` is a perfect square and its root sits alone
in the middle of the divisor list.

The totals stay tiny. Every value is at most 50, whose square is 2500, and
even crediting all 50 positions — more than the ten divisors that `n = 48`,
the richest length in range, can actually field — caps the sum at 125000,
comfortably inside any 32-bit signed integer. Plain fixed-width accumulators
are safe in every language; no widening needed.

**Complexity:** `O(n)` time, `O(1)` space.
