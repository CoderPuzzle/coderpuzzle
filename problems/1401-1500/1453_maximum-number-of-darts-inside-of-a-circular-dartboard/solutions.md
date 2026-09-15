# Solutions — Maximum Number of Darts Inside of a Circular Dartboard

## Enumerate the circles through every pair of points

An optimal circle can always slide until at least two darts sit on its
boundary (or it wraps a single dart), so the candidate centers are finite:
for every pair of darts at distance at most `2r` there are one or two
centers of radius-`r` circles through both. Together with the trivial
center-at-a-dart candidates, checking all of them covers every optimum.

For a pair `(x1, y1)`, `(x2, y2)` the center lies on the pair's
perpendicular bisector at distance `h = sqrt(r² - (d/2)²)` from the
midpoint, so the two centers are `mid ± (h/d) · (-dy, dx)` — the
perpendicular direction scaled by `h/d`. When the two darts coincide the
pair is skipped (identical candidates come from the single-dart case),
and when `h²` would be negative the pair is farther than `2r` apart and
no circle covers both.

Each candidate center is scored by counting darts with
`(x - cx)² + (y - cy)² <= r²`, using a `1e-7` slack on the squared
comparison so darts exactly on the boundary — which the statement counts
— are not lost to floating-point rounding. Coordinates up to `10⁴` and
`r` up to 5000 keep every squared distance far below the range where
doubles lose integer precision. The whole enumeration is `O(n³)` with
`n <= 100`.

**Complexity:** `O(n³)` time, `O(1)` extra space.
