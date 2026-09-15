# Solutions — Valid Digit Number

Both validity conditions concern the ordinary decimal representation of the
number, so they can be tested directly from its digits.

## Decimal string scan

Convert `n` to a decimal string. The first character tells whether the number
starts with `x`, while a containment check tells whether `x` occurs anywhere.
The result is true only when the containment check succeeds and the first
character differs from the digit. This also handles `n = 0`: for `x = 0` the
only occurrence is leading, and every other digit is absent.

At most six characters are inspected because `n <= 10⁵`. Let `d` be the
number of decimal digits in `n`.

**Complexity:** `O(d)` time, `O(d)` space.
