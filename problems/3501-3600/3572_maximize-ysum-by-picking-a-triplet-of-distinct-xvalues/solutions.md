# Solutions — Maximize Y-Sum by Picking a Triplet of Distinct X-Values

## Per-x maximum, then the top three

The three chosen indices must have pairwise distinct `x` values, so each
distinct `x` contributes at most one element to the triplet — and if an
`x` contributes, its contribution is obviously best served by its largest
`y`. Every other index sharing that `x` is therefore redundant no matter
how big its `y` is: taking it would only block the group. So the whole
array collapses into a map from each distinct `x` to the maximum `y`
seen at that `x`, built in a single pass (each entry updated in place
when a larger `y` arrives).

With fewer than three distinct `x` values no legal triplet exists and the
answer is -1. Otherwise the best triplet takes the three groups with the
largest maxima, because choosing any group outside the top three replaces
one of its members with a smaller-or-equal value while keeping the
distinctness constraints satisfied. A running top-3 scan over the map's
values picks those three sums without materializing a sorted list.

**Complexity:** `O(n)` time (one pass to build the map, one pass over its
distinct entries for the top three), `O(u)` space for the `u` distinct
`x` values.
