# Solutions — Minimum Area Rectangle

## Hash set over diagonal pairs

A rectangle with sides parallel to the axes is pinned by two opposite
corners: if the set contains `(x1, y1)` and `(x2, y2)` with `x1 != x2` and
`y1 != y2`, the other two corners are forced to be `(x1, y2)` and
`(x2, y1)`, and the area is `|x1 - x2| * |y1 - y2|`. The whole problem
therefore reduces to pairing: put every point into a hash set, treat every
pair of points as a candidate diagonal, and let two O(1) membership tests
decide whether the rectangle actually exists.

The scan enumerates each unordered pair once — the inner index runs past
the outer one. A pair sharing an x or a y is skipped on the spot, since it
would collapse the rectangle into a segment, which is no rectangle at all;
any pair whose two partner corners are both present contributes its area to
the running minimum, with the initial answer `0` doubling as the
"none found" sentinel. With at most 500 points that is 124,750 pairs, each
costing a couple of hash lookups.

Nothing is missed and nothing false is counted. Every axis-parallel
rectangle has exactly two diagonals, each a pair whose coordinates differ
in both components and whose partners are present, and conversely every
such pair closes exactly one genuine rectangle of positive area.
Coordinates lie in `[0, 4 * 10⁴]`, so every width, height, and area — at
most `1.6 * 10⁹` — still fits in a 32-bit integer.

**Complexity:** `O(n²)` time, `O(n)` space.
