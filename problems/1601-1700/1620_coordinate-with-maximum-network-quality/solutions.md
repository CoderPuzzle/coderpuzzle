# Solutions — Coordinate With Maximum Network Quality

## Grid brute force

Every coordinate `xi` and `yi` is bounded to `[0, 50]`, so the candidate
grid is at most `51 * 51` points, and there are at most 50 towers. That
makes trying every candidate coordinate directly cheap: for each
`(x, y)` in the grid, sum the contribution of every tower whose
Euclidean distance to `(x, y)` is at most `radius`, using the exact
distance (not squared) so the `1 + d` denominator in the quality
formula is correct. A tower's contribution is `qi` integer-divided by
`1 + d` after flooring, and a tower strictly outside `radius`
contributes nothing at all.

The scan visits `x` from `0` to `50` and, within it, `y` from `0` to
`50`, in increasing order, so the first coordinate to strictly beat the
running best total is recorded and only a later strictly greater total
replaces it. Because ties never overwrite the incumbent, the coordinate
kept at the end is automatically the lexicographically smallest among
every coordinate achieving the maximum quality — no separate tie-break
step is needed.

**Complexity:** `O(51 * 51 * towers.length)` time, `O(1)` extra space.
