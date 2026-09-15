# Solutions — Complex Number Multiplication

## Split at the last plus

Both operands travel as `"real+imaginaryi"` strings, so half the problem is
format plumbing. Parsing cannot simply split on `'+'`: the imaginary part may
itself be negative, as in `"1+-1i"`, and the real part never carries a `'+'` of
its own — so after dropping the trailing `'i'`, the last `'+'` in the string is
the one true seam between the parts. One split per operand yields four machine
integers.

The multiplication itself is the identity `(a + bi)(c + di) = (ac - bd) +
(ad + bc)i`. The subtracted `bd` is `i² = -1` landing on the real axis; the
cross terms `ad` and `bc` share the `i` factor and merge into one imaginary
part. Parts are bounded by 100 in magnitude, so every product fits in 20000
and plain integers carry the whole computation.

Rendering mirrors the input: the two parts are joined by a literal `'+'` with
the trailing `'i'`, and the imaginary part's minus sign travels inside its own
digits. That is why a negative result like `-2i` prints as `"0+-2i"`, exactly
as the second example demands — never folded into `"0-2i"`.

**Complexity:** `O(1)` time and `O(1)` space — both inputs are at most eight
characters, so parse, multiply, and render all touch bounded strings.
