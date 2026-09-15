# Solutions — Destination City

## Set difference over the endpoints

Every city in the list appears as the second element of some pair or as
the first, and exactly one city — the destination — appears only as an
endpoint. That turns the search into a set difference: collect all
sources (`paths[i][0]`) into a set, then scan the destinations
(`paths[i][1]`) for the one that is not a source.

The guarantee that the paths form a loopless line makes the answer
unique, so the scan can return on the first hit. Both steps are linear
in the number of pairs, and at most 100 pairs with short names means the
whole computation is a few hundred hash lookups.

Equivalently one could walk the chain from a city with no incoming edge,
following the map until stuck; the set-difference formulation reaches the
same vertex without needing to locate the head first.

**Complexity:** `O(n)` time, `O(n)` space for the source set.
