# Solutions — Mirror Distance of an Integer

`reverse(n)` is fully determined by `n`'s decimal digits, so the mirror
distance needs no search — just the two integers and their difference.

## Digit-peel reversal

Build the reversal directly: peel `n`'s digits least-significant first,
folding each into `reversed = 10 * reversed + digit` until `n` is
exhausted. Trailing zeros of `n` never materialize as leading zeros of
the reversal — `reverse(10)` is `1` — because they are consumed by the
peel without being emitted, which is exactly the arithmetic meaning of
reading the digits backwards as a number.

The answer is the absolute difference between the saved original and the
reversal. Both stay below `10⁹`: a nine-digit input reverses to at most
`999999999`, and the only ten-digit input allowed by the constraints,
`10⁹` itself, reverses to `1` — so every intermediate fits a 32-bit
integer, and the same bound keeps JavaScript `Number` arithmetic exact
far below `2⁵³`.

**Complexity:** `O(log n)` time, `O(1)` space.
