# Solutions — Apply Discount to Prices

## Integer cents, one pass

Split on single spaces; a word is a price exactly when a `$` is followed by
one or more digits — bare `$`, `5$`, and `$1e5` fail that test and pass
through untouched.

The output-formatting question dissolves rather than gets decided. Every
price is a whole number of dollars, so `price * (100 - discount)` already
counts the discounted value **in exact cents**: `P` dollars discounted by
`d%` is `P * (100 - d) / 100` dollars, which is `P * (100 - d)` cents with no
fractional remainder. Truncation, round-half-up, and round-half-even agree on
every legal input because there is never anything to round — and both
examples pin exactly this reading (`$2` at 50% is precisely 100 cents, hence
`$1.00`). The code therefore computes cents in pure integer arithmetic — a
ten-digit price times 100 stays far inside 64-bit range — and emits
`cents / 100`, a dot, and a zero-padded `cents % 100`. Binary floating point,
whose decimal rendering at these magnitudes is the real hazard, is never
involved.

**Complexity:** `O(n)` time, `O(n)` space.
