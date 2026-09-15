# Solutions — Maximum Sized Array

## Separable Closed-Form Sum

The triple sum factors cleanly. Every element is `i * (j OR k)`, so the
total is the sum of `i` over the first axis times the sum of `j OR k` over
all index pairs: `f(n) = M(n) * T(n)`, with `M(n) = n(n-1)/2` and `T(n)`
the pair sum. `T(n)` is counted per bit without visiting pairs: the OR of
a pair has bit `b` set unless both values clear it, so bit `b` contributes
`2^b * (n² - z_b²)` where `z_b` counts values below `n` whose bit `b` is
clear — and that count is closed-form from the repeating `01` pattern of
the bit across the range.

`f` is nondecreasing in `n`, so the solution doubles an upper bound until
the total exceeds `s`, then binary searches the largest `n` with
`f(n) <= s`. The comparison divides instead of multiplying — `M * T <= s`
iff `T <= s / M` — which keeps every intermediate small. The doubling
always stops by `n = 2^14`: the rows `j >= n/2` alone force
`T(n) >= 3n²/8 - n/4`, pushing the total at `2^14` past `10^15 >= s`. With
`n <= 2^14` every evaluated `T` is below `2n * M(n) < 4.4 * 10^12`, so the
fixed-width languages only need 64-bit integers, and in JavaScript both
`s <= 10^15` and every `T` stay under `2^53`, so plain `Number` arithmetic
is exact.

**Complexity:** `O(log² n)` time, `O(1)` space.
