# Solutions — Count Good Integers on a Grid Path

## Digit DP over the previous path digit

Convert `directions` into the seven row-major positions visited in the
`4 × 4` grid. Every move goes right or down, so these positions appear in
increasing order in the 16-digit representation. Define `f(bound)` as the
number of padded strings from zero through `bound` whose digits at those
positions are non-decreasing; the requested range count is
`f(r) - f(l - 1)`.

Process the 16 digit positions from left to right. A state stores whether the
chosen prefix is still equal to the bound and the previous digit selected by
the path, with a sentinel before the first path position. At an ordinary
position every digit allowed by tightness is accepted. At a path position,
discard digits smaller than the stored previous digit and replace it with the
new digit. Leading zeros are real padding digits, so no started flag is
needed.

All fixed-width implementations use 64-bit counts. The maximum possible
count is `9 × 10¹⁵ + 1`, below `2⁵³`, so JavaScript and TypeScript numbers
also represent every intermediate exactly.

**Complexity:** `O(D * 10²)` time, `O(10)` space, where `D = 16`.
