# Solutions — Minimum Lines to Represent a Line Chart

## Sort by day and count exact slope changes

After sorting the points by day (days are distinct, so the order is total),
the chart is one line per maximal run of adjacent segments that share a
slope. A single point needs no line, two points need exactly one, and every
later segment extends the current line exactly when its slope equals the
previous segment's; otherwise a new line starts. Equality of the fractions
`(y2 - y1) / (x2 - x1)` and `(y3 - y2) / (x3 - x2)` is never tested by
dividing — distinct days keep both denominators nonzero, but floating point
cannot be trusted at the constraint bounds. Instead each adjacent pair of
segments is compared cross-multiplied, as
`(x2 - x1) * (y3 - y2) == (x3 - x2) * (y2 - y1)`.

The cross-products are where this problem lives. Every factor is a coordinate
difference, bounded by just under 10⁹ in absolute value, so a product
approaches 10¹⁸. That fits a signed 64-bit integer with room to spare
(below 2⁶³ − 1 ≈ 9.2·10¹⁸), so the C++, Go, Java, and Rust versions widen
the 32-bit inputs and multiply in `long long`, `int64`, `long`, and `i64`
respectively. Python integers are arbitrary precision, so its version needs
no widening at all. JavaScript and TypeScript cannot lean on their native
number: it is a 64-bit float that stays integral only up to 2⁵³ − 1 ≈
9·10¹⁵, far below these products, which silently round — two different
products can even collapse onto the same double. Those versions therefore
convert the already-exact differences to `BigInt` and do the two
multiplications there (reducing each difference pair by its gcd and
comparing the reduced fractions would be equally exact).

**Complexity:** `O(n log n)` time, `O(1)` space.
