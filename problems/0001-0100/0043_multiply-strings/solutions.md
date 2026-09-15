# Solutions — Multiply Strings

## Grade-school digit array with one carry pass

The product of an `m`-digit and an `n`-digit number has at most `m + n` digits, so the solution allocates exactly that many cells and multiplies the way pencil-and-paper multiplication does: every digit of `num1` against every digit of `num2`. With cells indexed most-significant-first, the product of digit `i` and digit `j` always lands in cell `i + j + 1`, so all `m · n` raw products can be added into the array before anything is carried. No cell ever holds more than `min(m, n) · 81` plus a carry — under 17,000 even at the 200-digit constraint limit — which ordinary machine integers absorb, so the statement's rule is satisfied: no `BigInteger`, and only single-digit values are ever converted or multiplied.

A single right-to-left pass then normalizes the array: each cell keeps `total % 10` and hands `total / 10` to the cell on its left, exactly the carrying done by hand. Because neither input has a leading zero (except `0` itself), the product occupies either `m + n` or `m + n - 1` cells, so stripping leading zeros removes at most one cell; the strip always keeps one digit, which is why `0` times anything falls out as `"0"` with no special case.

**Complexity:** `O(m · n)` time, `O(m + n)` space.
