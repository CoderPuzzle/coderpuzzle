# Solutions — Count Number of Trapezoids I

## Count Pairs per Horizontal Line

Two points form a horizontal side exactly when they share a
y-coordinate, and a horizontal trapezoid is nothing more than two points
picked from one horizontal line plus two picked from another: the two
line segments are the horizontal sides, and the four points are never
degenerate because the lines are distinct. So group the points by
y-coordinate — a hash map — and turn each group of `c` points into its
pair count `s = C(c, 2)`.

The answer is then the sum of `s_i · s_j` over all pairs of lines, which
the algebra of `Σsᵢ = S`, `Σsᵢ² = Q` collapses to `(S² − Q) / 2`. One
pass over the groups produces `S` and `Q`; the division by two becomes a
multiplication by the modular inverse of 2. Groups with fewer than two
points contribute `s = 0` and drop out on their own.

The widths force care: a single line can hold all `10⁵` points, so
`s ≈ 5 × 10⁹` already exceeds 32 bits, and with many populated lines the
true counts reach astronomically past 64 — so every value is reduced
modulo `10⁹ + 7` the moment it is produced, and only residues (below
`2³⁰`) are ever multiplied. The fixed-width languages hold those products
in 64 bits; JavaScript splits each multiplication into 15-bit halves so
every partial product stays far below `2⁵³`.

**Complexity:** `O(n)` time, `O(n)` space.
