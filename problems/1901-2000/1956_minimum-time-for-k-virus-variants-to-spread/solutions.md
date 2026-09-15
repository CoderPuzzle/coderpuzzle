# Solutions — Minimum Time For K Virus Variants to Spread

At day `t` a variant originating at `(xi, yi)` has infected exactly the cells
whose Manhattan distance from `(xi, yi)` is at most `t`, because it spreads one
cell per day in the four cardinal directions. A point `p` therefore contains at
least `k` variants on day `t` precisely when at least `k` of the origins lie
within L1 distance `t` of `p`, so the answer is the minimum, over every integer
grid point `p`, of the k-th smallest L1 distance from `p` to the `n` origins.

## Bounding-box enumeration

Searching all of the infinite grid is unnecessary: if a point lies outside the
axis-aligned bounding box of the origins, projecting it onto the box shrinks
every coordinate difference to every origin, which cannot increase any of the
`n` distances and therefore cannot increase the k-th smallest. So the point that
achieves the minimum lies inside `[min x, max x] x [min y, max y]`. The
constraints bound that box by `100 x 100` cells and `n` by `50`, which makes it
cheap to simply visit every box cell, compute the `n` L1 distances to the
origins, sort them, and look at position `k - 1`.

The enumeration computes the k-th smallest distance by a full sort of the `n`
distances at each candidate point; with `n <= 50` and at most `10^4` box cells
this stays well within the limits. Duplicate origins are handled naturally since
they contribute separate distances, and the case where several variants start
on the same cell yields the correct answer of `0`.

**Complexity:** `O(A * n log n)` time where `A = (max x - min x + 1) * (max y -
min y + 1) <= 10^4`, `O(n)` extra space.
