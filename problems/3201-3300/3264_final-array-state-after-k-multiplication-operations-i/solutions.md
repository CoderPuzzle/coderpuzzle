# Solutions — Final Array State After K Multiplication Operations I

## Direct simulation of the operations

The process is fully deterministic and the bounds are tiny — at most
`100` entries and at most `10` operations — so the honest algorithm replays
the process literally: each operation scans `nums` and keeps the first
occurrence of the minimum (a strict `<` comparison never replaces an equal
earlier value, so ties resolve to the leftmost index automatically), then
multiplies that one slot by `multiplier`.

Nothing here needs acceleration. A priority queue would only reorder the
same ten short scans, and sorting would do even more work. The numbers also
stay native-width everywhere: every element starts at most `100` and
receives at most `k` multiplications, so no entry ever exceeds
`100 * 5^10 = 976562500 < 2^31 - 1` — comfortably inside 32-bit integers,
and far below JavaScript's exactness limit of `2^53`.

Each operation costs one linear pass over the array, so a full run compares
across `n * k` positions while updating `nums` in place.

**Complexity:** `O(n·k)` time, `O(1)` space beyond output.
