# Solutions — Sum of Number and Its Reverse

## Exhaustive Reverse Search

The candidate set is closed and small: if `num = x + rev(x)`, then `x`
cannot exceed `num` (the reverse is non-negative), so checking every `x`
in `[0, num]` is a complete search — at most `100001` trials at the
constraint maximum. Each trial computes the digit reversal of `x` and
compares the sum; the first hit returns `true`, and falling out of the
loop proves `false`.

Leading zeros — the subtlety in example 3, where `140 + 041 = 181` — need
no special handling. A reversal written arithmetically just accumulates
digits with `% 10` and `* 10`; a trailing zero of `x` becomes a leading
zero of the reversed value, which contributes nothing to the number. So
`140` reverses to `41` (not `041`) exactly as the statement intends.

Every intermediate stays tiny: `x <= 10⁵` and `rev(x) < 10⁶` only when x
has six digits — impossible here since `x <= num <= 10⁵`, so all values
sit comfortably inside 32-bit range in every language.

**Complexity:** `O(num · log₁₀ num)` time — at most about `6 × 10⁵` digit
operations — `O(1)` space.
