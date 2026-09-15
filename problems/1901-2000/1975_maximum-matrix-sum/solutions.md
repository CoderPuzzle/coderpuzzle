# Solutions — Maximum Matrix Sum

## Parity of negatives, one pass

Each operation flips two border-adjacent cells at once, so the number of
negative entries changes by `-2`, `0`, or `+2` — its parity never changes.
Every reachable configuration therefore has the same negative-count parity
as the original matrix, and because the grid is connected every
configuration with that parity is reachable: negatives can be moved cell by
cell through adjacent flips and opposite signs paired off. The best
achievable sum is then decided by parity alone.

If the negative count is even, flip pairs of negatives until every value is
positive, giving `sum(|v|)`. If it is odd, exactly one negative must remain,
and the optimal choice is the value with the smallest magnitude, so the sum
is `sum(|v|) - 2 * min(|v|)`. The solution makes a single pass over the
matrix, accumulating the absolute values in a 64-bit integer — the total can
reach `250 * 250 * 10⁵ = 6.25 × 10⁹`, beyond 32-bit range — while counting
negatives and tracking the smallest magnitude, then subtracts `2 * min`
exactly when the count is odd.

The sweep over every 2×2 matrix with entries in `{-2, ..., 2}` and every 3×3
matrix with entries in `{-1, 0, 1}` confirms the closed form against an
exhaustive search of reachable sign configurations.

**Complexity:** `O(n²)` time, `O(1)` space.
