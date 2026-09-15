# Solutions — Equal Rational Numbers

Two notations name the same number exactly when their exact rational values
coincide, so the whole task is reading each string as one fraction. The
repeating part is a geometric series, and the classic shift-and-subtract
identity collapses it into two small integers per string; equality is then a
cross-multiplication. The one trap is the trailing-9s carry: `0.9(9)` is
exactly `1`, not merely close to it.

## Exact fraction per string, cross-multiplied

Parse each string at the `.` and the `(` into an integer part, a
non-repeating part, and a repeating part. A repeating tail of length `b`
after a non-repeating prefix of length `a` contributes the fraction
`(int(nonrep + rep) - int(nonrep)) / (10^a * (10^b - 1))`: the infinite
expansion equals its own shift by `b` digits divided by `10^b`, and
subtracting the shifted value from the original cancels everything from the
second repetition onward, leaving exactly that numerator over that
denominator. Without parentheses the fractional part is just
`int(nonrep) / 10^a`, which the same formula degenerates into (an empty
repeating part only ever appears as `numerator == 0`). The value is then
`whole + numerator/denominator` with `numerator <= denominator` always,
since the fractional part is below `1`.

The equality `numerator == denominator` happens exactly when every digit
after the point is `9` — the `0.9(9) = 1` family — so it is folded into the
integer part as `whole + 1` with a zero fraction, which keeps every
remaining fraction strictly below `1`. Comparing two values is then
comparing whole parts, and, when those agree, cross-multiplying:
`num_s * den_t == num_t * den_s`. Parts are at most four digits long, so
numerator and denominator never exceed `99990000 < 10^8`, and every cross
product stays below `10^16` — two orders of magnitude inside a signed
64-bit integer, so no reduction is needed. The one port where that bound
is not free is JavaScript/TypeScript: `Number` is exact only to
`2^53 ≈ 9.0 * 10^15`, below the worst product `99989999 * 99990000`, so
those two compare the products with `BigInt`.

**Complexity:** `O(L)` time, `O(1)` space.
