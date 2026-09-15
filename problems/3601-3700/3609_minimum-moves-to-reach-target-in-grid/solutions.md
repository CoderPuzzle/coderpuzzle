# Solutions — Minimum Moves to Reach Target in Grid

Every move strictly increases the maximum of the two coordinates, so to
decide how a point was reached we can look at the move backwards: with
`x > y` the last move must have raised `x` (raising `y` would have pushed
`y` to at least `x`, contradicting `x > y`). The backward predecessor is
therefore unique, and the minimum number of forward moves equals the length
of this forced backward chain.

## Work backwards, undoing one forced move at a time

From `(x, y)` with `x > y`, the last move either doubled `x` (predecessor
`x / 2`, valid only when `x` is even and `x >= 2y`) or added `y` to `x`
(predecessor `x - y`, valid only when `x < 2y`). The code checks which
regime holds and applies that single step, counting it. When the two
coordinates are equal and the source is not reached, the point can only
have been reached from an axis — `(0, x)` or `(x, 0)` — so the algorithm
steps onto the axis the source lies on and keeps undoing from there.

The chain is the only possible reverse of a valid path, so its length is
the answer; if the chain dips below the source, meets an odd coordinate it
must halve, or hits equal coordinates whose source lies on neither axis,
no path exists and the method returns `-1`. Example 2's chain runs
`(2, 3) → (2, 1) → (1, 1) → (0, 1)`: three steps matching the forward
route `(0, 1) → (1, 1) → (2, 1) → (2, 3)`.

**Complexity:** `O(log(max(tx, ty)))` time, `O(1)` space.
