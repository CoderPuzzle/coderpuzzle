# Solutions — Best Reachable Tower

Every tower is judged independently: a tower matters only when its
Manhattan distance `abs(xi - cx) + abs(yi - cy)` from `center` is at most
`radius`, and among those that matter the answer is the maximum quality
factor, with coordinate-lexicographic order breaking ties. No tower
interaction exists, so nothing beyond one pass over `towers` is needed.

## Single Scan with Lexicographic Tie-Break

Walk the towers once, keeping the current best `[x, y]` and its quality
factor. A tower first pays the reachability test; if its distance exceeds
`radius` it is skipped before its quality is ever consulted, which is
what keeps an unreachable tower with a huge quality factor from stealing
the answer. A reachable tower takes over the lead only when it is
strictly better under the combined order: higher quality, or equal
quality with a lexicographically smaller coordinate — `x` first, then
`y` when `x` ties.

Because the scan compares each tower only against the running best, the
first leader among equal-quality towers holds the spot exactly until a
lexicographically smaller one appears, so the final `[x, y]` is the
lexicographic minimum over all towers of maximum reachable quality. When
no tower passes the reachability test the best stays unset and the
method returns `[-1, -1]`.

Coordinates and radius are non-negative and bounded by `10^5`, so
distances never exceed `2 * 10^5` — every value stays inside 32-bit
integers in every language, and far below the exact-integer range of a
JS `number`.

**Complexity:** `O(n)` time, `O(1)` space.
