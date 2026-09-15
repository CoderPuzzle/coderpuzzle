# Solutions — Count K-th Roots in a Range

Count perfect powers up to each endpoint with an overflow-safe integer root
search.

## Binary search the integer root

For a nonnegative bound `v`, the perfect `k`th powers at most `v` correspond
one-to-one with nonnegative bases from zero through `floor(v^(1/k))`. Binary
search for that largest base. To test a candidate, multiply at most `k` times
and stop as soon as the next multiplication would exceed `v`; this avoids
overflow in fixed-width languages.

The answer is the count through `r` minus the count through `l - 1`. Handle
`k == 1` directly because every integer in the range is a first power, and
return zero for negative counting bounds so that ranges beginning at zero
include `0 = 0ᵏ` exactly once.

**Complexity:** `O(k log r)` time, `O(1)` space.
