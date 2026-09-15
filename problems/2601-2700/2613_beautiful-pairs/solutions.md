# Solutions — Beautiful Pairs

## Duplicate shortcut plus divide-and-conquer closest pair

Two identical points sit at distance 0, which is unbeatable, so a hash
pass over `x * (n + 1) + y` keys settles any input containing duplicates:
the answer is the earliest-occurring duplicate point's two indices, with
competing duplicates resolved lexicographically by index pair. Once every
point is distinct the global minimum distance is at least 1.

The minimum itself comes from the classic divide-and-conquer closest-pair
sweep under Manhattan distance: sort indices by x, solve both halves
recursively, then merge them by y so a strip of points within the running
bound of the dividing line stays contiguous. Every cross pair closer than
the current bound differs by less than that bound in y, so walking each
strip point forward while the y-gap remains small examines every candidate
that could improve the answer; recursion depth is logarithmic in n.

The final pair needs all edges at exactly that minimum distance, not just
one. Because every two distinct points are now known to be at least d
apart, a d-sided spatial hash grid can hold only a bounded handful of
points per cell, so probing the nine cells around each point while
inserting it enumerates every distance-d edge exactly once — constant work
per index — and keeping the smallest `(j, i)` across those edges yields
the lexicographically smallest beautiful pair.

**Complexity:** `O(n log n)` time, `O(n)` space.
