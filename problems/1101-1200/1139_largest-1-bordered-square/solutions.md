# Solutions — Largest 1-Bordered Square

## 2-D prefix sums make each border test O(1)

A square is 1-bordered when each of its four edges is a solid run of 1s. An
edge of length `side` is solid exactly when the sum of its cells equals
`side`, so a 2-D prefix-sum table over the grid answers "what does the strip
from `(r, c1)` to `(r, c2)` sum to" with four table lookups — no scanning,
whatever the side length.

Building the prefix table is one `O(R·C)` pass. The search then enumerates
every top-left corner and every side length that fits, which is
`O(N³)` candidates for an `N×N` grid, each tested in constant time by four
strip queries (top row, bottom row, left column, right column). The answer
is the largest `side²` that passes, `0` if none does.

Iterating the side length from large to small per corner (or simply tracking
the maximum) keeps the loop simple; with `N <= 100` the cubic enumeration is
at most a million tests.

**Complexity:** `O(N³)` time for an `N×N` grid (`N <= 100`), after an
`O(N²)` prefix build — `O(N²)` space for the prefix table.
