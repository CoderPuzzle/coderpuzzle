# Solutions — Block Placement Queries

## Free-run segment tree over start positions

A block of size `sz` laid down from start `i` spans `[i, i + sz]`, and the
statement's touch rule means an obstacle forbids it only when it falls
_strictly inside_ that span. So for each start `i` there is a single
decisive quantity: `d[i]`, the distance from `i` to the first obstacle
strictly after it (with no obstacle ahead, nothing interior can ever fire).
A placement is possible exactly when some start `s ≤ x - sz` satisfies
`d[s] >= sz`, which turns both query types into maintenance of the array
`d[0..span-1]`, where `span` is the largest `x` any type-2 query will use.

Placing an obstacle at `t` rewrites one contiguous gap: every start whose
nearest-after obstacle was beyond `t` now reads `d[i] = t - i`. Those starts
are precisely `(previous obstacle, t)`, where the previous obstacle is found
among already-placed ones via a Fenwick tree over the sorted distinct type-1
coordinates with order-statistic search. Because each rewritten value is an
affine run capped at the gap's left edge, a lazy assignment segment tree
stores per node just the assigned obstacle (`t`) and the subtree maximum
`t - leftmost`; child tags compose newest-wins, so pushes are trivial.
Untouched leaves read `d[i] = span - i`, a sentinel safely above any
achievable requirement since a legal start always satisfies
`sz <= x - s < span - s`.

Each type-2 query is then a range maximum over `[0, x - sz]` compared with
`sz` — placed blocks touch obstacles only at edges, matching Example 1's
`[2, 2, 2] -> true` and Example 2's exact-fit answers. Coordinates fit in
32 bits throughout: obstacles and gaps never exceed `5 * 10⁴ + 1`.

**Complexity:** `O((n + X) log X)` time, `O(X)` space, for `n` queries and
start domain `X ≤ min(5 * 10⁴, 3 * n)`.
