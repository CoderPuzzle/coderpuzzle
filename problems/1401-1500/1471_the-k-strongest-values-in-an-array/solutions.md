# Solutions

All approaches first need the midpoint: sort (or select) to find the
element at index `(n - 1) / 2` of the sorted order. After that, every
approach ranks values by the pair `(distance from midpoint, value)`,
both descending, and keeps `k` of them. The full custom sort pays a
second full sort for that ranking; the size-k min-heap streams the same
ranking through a bounded heap of keepers instead, so the ranking pass
costs `O(n log k)` rather than a second full sort — the heap is the one
we present.

## Sort by Strength Key

Find the centre by sorting once and reading position
`((n - 1) / 2)` — this pass is unavoidable in this approach. Then sort the
whole array again with a comparator that prefers larger `|v - m|`, and on
ties prefers the larger value, and return the first `k` elements. Each
comparison is constant time, so the total is dominated by two sorts. The
answer may be returned in any order, so no post-processing is needed.

**Complexity:** `O(n log n)` time, `O(n)` space (or `O(1)` extra beyond the
sort when sorting in place and copying only the result).

## Size-k Min-Heap

The midpoint pass is the same single sort; the difference is that the
ranking never orders the whole array. A min-heap holds at most `k`
keepers, keyed so the root is always the weakest of them. The key is
the might triple `(distance, value, index)`: longer distance first,
then the larger value on a distance tie — the statement's own ranking —
and the index closes the triple, earlier counting as the mightier, so
a later copy of a value can never displace an earlier one.

The first `k` entries are pushed outright. Every later entry is tested
against the root and pushed in only when it is strictly mightier,
popping the victim; a tie with the root leaves the keepers alone. When
the stream ends, the heap holds exactly the top `k`, and one final
ordering of the survivors by their original index produces the answer —
the statement accepts any order.

The heap trims the ranking pass from `O(n log n)` down to `O(n log k)`,
but the midpoint sort is unavoidable, so the total stays `O(n log n)`;
the win is the smaller logarithm on the ranking work and a heap of `k`
entries instead of a fully reordered array.

**Complexity:** `O(n log n)` time, `O(n)` space (the midpoint sort
dominates the total; the ranking pass itself is `O(n log k)`, and only
`O(k)` of that space is the heap).
