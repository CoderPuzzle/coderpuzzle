# Solutions — Minimum Area Rectangle II

Freeing the rectangle from the axes changes the search space completely: a
corner no longer pins its neighbors to the same rows and columns, so the
axis-parallel pairing trick from the sibling problem does not apply. The way
in is through the diagonals.

## Diagonals that share a midpoint and a length

A quadrilateral is a rectangle exactly when its two diagonals bisect each
other and have equal length — bisection makes it a parallelogram, and equal
diagonals make a parallelogram rectangular. So every unordered pair of points
is hashed as a candidate diagonal, keyed by its midpoint and squared length,
and a key collision hands over both diagonals of a rectangle whose four
corners are all present: the two pair endpoints on one diagonal, the stored
endpoint and its midpoint-reflection on the other. Midpoints are kept doubled
— `(x1 + x2, y1 + y2)` — so the key stays integral even when the true
midpoint is half-integral. With at most `C(50, 2) = 1,225` pairs, each doing
one hash lookup against a tiny bucket, the scan is instant.

The area needs no square roots along the way. For the current pair `(x1, y1)`
and a stored endpoint `(rx, ry)`, the sides at that corner run to `(rx, ry)`
and to the reflection, whose offset is `(x2 - rx, y2 - ry)`; the product of
the two squared side lengths is the squared area, tracked as a minimum in a
64-bit integer. A lattice rectangle's area is always an integer —
perpendicular integer side vectors force the product of squared lengths to be
a perfect square — and at most `(4 * 10⁴)² = 1.6 * 10⁹`, so the squared area
never exceeds `2.56 * 10¹⁸`, comfortably inside 64-bit range. A single
square root at the very end recovers the area exactly: even where a double
must round a value that large, it errs by at most a few hundred while the
root lands within `2 * 10⁻⁷` of the integer answer, and rounding snaps onto
it. Floating point never touches the search itself, so the returned minimum
is bit-exact.

Every rectangle is found and nothing else can be: each of its two diagonals
is enumerated exactly once as an unordered pair, they collide by
construction, and a collision between two pairs that share a midpoint and a
length is precisely the rectangle condition. Pairs whose buckets never meet
close nothing, so the answer stays `0` when no rectangle exists.

**Complexity:** `O(n²)` time, `O(n²)` space.
