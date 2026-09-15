# Solutions — Count Lattice Points Inside a Circle

## Enumerate each circle's bounding square

The answer is the size of the union of all circles' lattice points, so the
simplest correct shape is to mark every covered point and count the marks. A
circle centered at `(x, y)` with radius `r` can only contain points whose
coordinates lie between `x - r` and `x + r`, so scanning that bounding square
and keeping the points satisfying `(px - x)² + (py - y)² <= r²` visits no
point outside the circle. Points exactly on the circumference satisfy the
`<=` and are counted, matching the statement's note.

The constraints make the search space tiny: `xi, yi <= 100` and
`ri <= min(xi, yi)` force every covered point into the `0..200` square in
both coordinates. Languages with flat arrays use that fact directly — a
`201 × 201` boolean grid in Rust, Java, and C++ — while Python and
JavaScript hash the points into a set of pairs (or packed integers). The two
are the same algorithm; the grid just replaces the hash with an index.

Marking one circle visits `(2r + 1)²` candidates and the union discards
duplicates by construction, so points covered by several circles are counted
exactly once. For the crawl example `[[2,2,1]]` the bounding square is the
nine points around `(2, 2)` and exactly five survive the inequality, giving
the expected `5`.

**Complexity:** `O(Σ(2·rᵢ + 1)²)` time, `O(201²)` space for the grid
variants and `O(covered points)` space for the set variants.
